const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);

loadEnvFile();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const handler = async (req, res) => {
  // CORS for local dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  try {
    if (req.method === "POST" && req.url === "/api/diagnose") {
      await handleDiagnose(req, res);
      return;
    }
    if (req.method === "POST" && req.url === "/api/analyze-anomaly") {
      await handleAnalyzeAnomaly(req, res);
      return;
    }
    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    console.error("Server error:", error);
    sendJson(res, 500, { error: "Unexpected server error" });
  }
};

module.exports = handler;

if (require.main === module) {
  const server = http.createServer(handler);
  server.listen(port, () => {
    console.log(`\n  MANTIS AI — Predictive Maintenance Intelligence`);
    console.log(`  Running at http://localhost:${port}`);
    console.log(`  LangGraph Agent: ${process.env.MINIMAX_API_KEY ? "✓ Connected" : "✗ Key missing"}\n`);
  });
}

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separator = trimmed.indexOf("=");
    if (separator === -1) return;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  });
}

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const requestedPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(root, requestedPath));
  if (!filePath.startsWith(root)) { sendJson(res, 403, { error: "Forbidden" }); return; }
  fs.readFile(filePath, (error, data) => {
    if (error) { sendJson(res, 404, { error: "Not found" }); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}

/* ─── /api/diagnose — full conversational diagnosis ─── */
async function handleDiagnose(req, res) {
  const payload = await readJson(req);
  const question = String(payload.question || "").trim();
  const context = payload.context || {};
  if (!question) { sendJson(res, 400, { error: "Question is required" }); return; }
  if (!process.env.MINIMAX_API_KEY) {
    sendJson(res, 200, { source: "fallback", answer: buildFallbackAnswer(question, context) });
    return;
  }
  try {
    const answer = await callMiniMax(
      "You are MANTIS AI, an industrial agentic maintenance intelligence system for Tata Steel, powered by LangGraph multi-agent orchestration. Given plant telemetry and maintenance context, provide concise explainable diagnosis with: root cause, risk level (CRITICAL/HIGH/MEDIUM), evidence citations, and step-by-step next action. Use technical steel plant terminology. Maximum 200 words.",
      `Question: ${question}\n\nPlant context:\n${JSON.stringify(context, null, 2)}`,
      700
    );
    sendJson(res, 200, { source: "minimax", model: process.env.MINIMAX_MODEL || "MiniMax-M3", answer });
  } catch (error) {
    console.error("MiniMax diagnose error:", error.message);
    sendJson(res, 200, { source: "fallback", answer: buildFallbackAnswer(question, context) });
  }
}

/* ─── /api/analyze-anomaly — per-card targeted anomaly analysis ─── */
async function handleAnalyzeAnomaly(req, res) {
  const payload = await readJson(req);
  const anomaly = String(payload.anomaly || "").trim();
  const hint = String(payload.hint || "").trim();
  const equipment = String(payload.equipment || "").trim();

  if (!anomaly) { sendJson(res, 400, { error: "Anomaly description required" }); return; }

  if (!process.env.MINIMAX_API_KEY) {
    sendJson(res, 200, {
      source: "fallback",
      answer: buildAnomalyFallback(equipment, hint)
    });
    return;
  }

  try {
    const answer = await callMiniMax(
      "You are an expert steel plant maintenance AI. Analyze the anomaly and respond in exactly this format:\nROOT CAUSE: [1 line]\nIMMEDIATE ACTION: [1-2 lines]\nRISK IF DELAYED: [1 line]\nSOP REFERENCE: [relevant SOP code if known]\nBe concise, technical, and actionable. Max 90 words total.",
      `Equipment: ${equipment}\nAnomaly: ${anomaly}\nContext: ${hint}`,
      350
    );
    sendJson(res, 200, { source: "minimax", answer });
  } catch (error) {
    console.error("MiniMax anomaly error:", error.message);
    sendJson(res, 200, { source: "fallback", answer: buildAnomalyFallback(equipment, hint) });
  }
}

async function callMiniMax(systemPrompt, userContent, maxTokens = 600) {
  const baseUrl = (process.env.MINIMAX_BASE_URL || "https://api.minimax.io/v1").replace(/\/$/, "");
  const model = process.env.MINIMAX_MODEL || "MiniMax-M3";
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MINIMAX_API_KEY}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ]
    })
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`MiniMax error ${response.status}: ${errorText}`);
  }
  const result = await response.json();
  const answer = result.choices?.[0]?.message?.content || result.choices?.[0]?.text;
  if (!answer) throw new Error("MiniMax response contained no answer");
  return stripThinkBlocks(answer).trim();
}

function stripThinkBlocks(text) {
  // MiniMax-M3 sometimes returns <think>...</think> reasoning blocks — strip them
  return text.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/^\s+/gm, "").trim();
}

function buildFallbackAnswer(question, context) {
  const plan = context.plan?.[0];
  const cause = context.rootCauses?.[0];
  const alert = context.alerts?.[0];
  const asset = context.selectedAsset || "selected asset";
  if (!plan || !cause) {
    return `Reviewing ${asset} context: insufficient structured evidence for a confident diagnosis. Check active alarms, recent sensor drift, SOP evidence, and maintenance history before releasing a work order.`;
  }
  return `[DIAGNOSIS — ${asset}]\n\nHighest priority: ${plan.asset}\nLeading root cause: ${cause.cause} (${cause.confidence}% confidence)\nEvidence: ${cause.evidence}\nCurrent risk: ${alert?.meta || plan.risk}\n\nRecommended action: ${plan.recommendation}\nETA for intervention: ${plan.eta}`;
}

function buildAnomalyFallback(equipment, hint) {
  return `ROOT CAUSE: Sensor parameter deviation beyond operational threshold detected.\nIMMEDIATE ACTION: ${hint || "Inspect equipment, isolate affected subsystem, validate sensor readings against secondary instruments."}\nRISK IF DELAYED: Possible cascading failure leading to unplanned downtime.\nSOP REFERENCE: Consult equipment-specific SOP in maintenance knowledge base.`;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk; if (body.length > 1_000_000) { req.destroy(); reject(new Error("Body too large")); } });
    req.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}
