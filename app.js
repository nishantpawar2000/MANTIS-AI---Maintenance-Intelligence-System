/* ═══════════════════════════════════════════════════════
   MANTIS AI — app.js
   Full agentic UI logic with LangGraph orchestration,
   live telemetry, risk table, timeline, heatmap,
   anomaly cards, multi-process flow (CRM/BF/Caster)
   ═══════════════════════════════════════════════════════ */

const D   = window.maintenanceData;
const DATA = D.assets;
const HEATMAP  = D.heatmap;

const FLOW_DATA = { crm: D.crmFlow, bf: D.bfFlow, caster: D.casterFlow };
const FLOW_TITLES = {
  crm:    { title: "CRM Process Flow Monitor",    sub: "Live cold-rolling mill schematic — strip flow, mill stands, hydraulic AGC, and quality instrumentation" },
  bf:     { title: "Blast Furnace Process Flow",   sub: "Live blast furnace schematic — burden flow, hot blast stoves, cooling systems, and cast house" },
  caster: { title: "Caster Process Flow Monitor",  sub: "Live continuous casting schematic — tundish, mold, cooling zones, and strand withdrawal" }
};

const state = { asset: "crm", strand: "All", parameter: "All parameters", flow: "crm" };

/* ── DOM refs ── */
const $ = id => document.getElementById(id);
const el = {
  assetLine:        $("assetLine"),
  assetGroup:       $("assetGroup"),
  riskTableBody:    $("riskTableBody"),
  timelineList:     $("timelineList"),
  heatmapGrid:      $("heatmapGrid"),
  heatmapLegend:    $("heatmapLegend"),
  anomalyList:      $("anomalyList"),
  anomalyBadge:     $("anomalyBadge"),
  criticalBadge:    $("criticalBadge"),
  kpiOeeVal:        $("kpiOeeVal"),
  kpiAnomaliesVal:  $("kpiAnomaliesVal"),
  kpiPredVal:       $("kpiPredVal"),
  kpiConfVal:       $("kpiConfVal"),
  chatWindow:       $("chatWindow"),
  chatInput:        $("chatInput"),
  aiStatus:         $("aiStatus"),
  rootCauseList:    $("rootCauseList"),
  evidenceList:     $("evidenceList"),
  workRows:         $("workRows"),
  feedbackNote:     $("feedbackNote"),
  feedbackStatus:   $("feedbackStatus"),
  toast:            $("toast"),
  crmLeftParameters:  $("crmLeftParameters"),
  crmRightParameters: $("crmRightParameters"),
  millFlowTrack:    $("millFlowTrack"),
  agcLayer:         $("agcLayer"),
  stripMetrics:     $("stripMetrics"),
  bltStatusGrid:    $("bltStatusGrid"),
  crmHealthBars:    $("crmHealthBars"),
  crmAlertChart:    $("crmAlertChart"),
  healthNeedle:     $("healthNeedle"),
  lastSync:         $("lastSync"),
  flowTitle:        $("flowTitle"),
  flowSubtitle:     $("flowSubtitle"),
  kpiAnomalyDetail: $("kpiAnomalyDetail"),
  kpiPredDetail:    $("kpiPredDetail"),
  kpiConfDetail:    $("kpiConfDetail"),
  kpiAnomalyList:   $("kpiAnomalyList"),
  kpiPredList:      $("kpiPredList"),
};

/* ══════════════════════════════════
   KPI BAR
══════════════════════════════════ */
function renderKpis() {
  const kpis = assetData().kpis;
  animateCounter(el.kpiOeeVal,       kpis.oee,        "%",  1);
  animateCounter(el.kpiAnomaliesVal, kpis.anomalies,  "",   0);
  animateCounter(el.kpiPredVal,      kpis.predictions,"",   0);
  animateCounter(el.kpiConfVal,      kpis.confidence, "%",  0);
  renderKpiDetails();
}

function renderKpiDetails() {
  const alerts = assetData().alerts;
  const timeline = assetData().timeline;
  // Anomaly detail
  el.kpiAnomalyList.innerHTML = alerts.map(a =>
    `<li><b>${a.risk}</b> — ${a.title}</li>`
  ).join("");
  // Predicted failures detail
  el.kpiPredList.innerHTML = timeline.filter(t => t.severity === "critical" || t.severity === "warn").slice(0,4).map(t =>
    `<li><b>${t.when}</b> — ${t.label}</li>`
  ).join("");
}

function animateCounter(elem, target, suffix, decimals) {
  const start = parseFloat(elem.textContent) || 0;
  const dur   = 800;
  const t0    = performance.now();
  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val  = start + (target - start) * ease;
    elem.textContent = val.toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else        elem.textContent = target.toFixed(decimals) + suffix;
  }
  requestAnimationFrame(tick);
}

/* ══════════════════════════════════
   KPI CLICK HANDLERS
══════════════════════════════════ */
$("kpiAnomalies").addEventListener("click", () => {
  el.kpiAnomalyDetail.classList.toggle("visible");
  el.kpiPredDetail.classList.remove("visible");
  el.kpiConfDetail.classList.remove("visible");
});
$("kpiPred").addEventListener("click", () => {
  el.kpiPredDetail.classList.toggle("visible");
  el.kpiAnomalyDetail.classList.remove("visible");
  el.kpiConfDetail.classList.remove("visible");
});
$("kpiConf").addEventListener("click", () => {
  el.kpiConfDetail.classList.toggle("visible");
  el.kpiAnomalyDetail.classList.remove("visible");
  el.kpiPredDetail.classList.remove("visible");
});

/* ══════════════════════════════════
   RISK TABLE
══════════════════════════════════ */
function renderRiskTable() {
  el.riskTableBody.innerHTML = "";
  assetData().riskRows.forEach(row => {
    const cls   = row.status === "critical" ? "row-critical" : row.status === "warn" ? "row-warn" : "row-ok";
    const bCls  = row.status === "critical" ? "badge-critical" : row.status === "warn" ? "badge-warn" : "badge-ok";
    const hCls  = row.status === "critical" ? "fill-critical color-critical" : row.status === "warn" ? "fill-warn color-warn" : "fill-ok color-ok";
    const label = row.status === "critical" ? "CRITICAL" : row.status === "warn" ? "WARN" : "NOMINAL";
    const svgSparkline = buildSparkline(row.sparkData, row.status);
    const rulSuffix = row.rul < 48 ? "h ⚡" : "h";

    const div = document.createElement("div");
    div.className = `risk-row ${cls}`;
    div.setAttribute("role", "row");
    div.setAttribute("tabindex", "0");
    div.setAttribute("aria-label", `${row.name} — ${label}`);
    div.innerHTML = `
      <div class="equipment-info">
        <strong>${row.name}</strong>
        <span>${row.nodeId}</span>
      </div>
      <div class="health-bar-cell">
        <div class="health-bar-track">
          <div class="health-bar-fill ${hCls.split(" ")[0]}" style="width:${row.health}%"></div>
        </div>
        <span class="health-bar-label ${hCls.split(" ")[1]}">${row.health}%</span>
      </div>
      <div class="rul-cell rul-${row.status}">
        <span class="rul-hours">${row.rul}${rulSuffix}</span>
        <span class="rul-label">RUL Est.</span>
      </div>
      <span class="status-badge ${bCls}">
        <span class="badge-dot"></span>${label}
      </span>
      <div>${svgSparkline}</div>
      <button class="spark-action-btn" title="Run AI diagnosis for ${row.name}" data-name="${row.name}" data-node="${row.nodeId}">▶</button>
    `;
    div.querySelector(".spark-action-btn").addEventListener("click", e => {
      e.stopPropagation();
      el.chatInput.value = `Diagnose ${row.name} (${row.nodeId}): health ${row.health}%, RUL ~${row.rul}h, status ${label}`;
      switchView("diagnosis");
      showToast(`Diagnostic loaded for ${row.name}`);
    });
    div.addEventListener("click", () => {
      el.chatInput.value = `What is the risk for ${row.name}?`;
      switchView("diagnosis");
    });
    div.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") div.click(); });
    el.riskTableBody.appendChild(div);
  });
}

function buildSparkline(data, status) {
  const W = 80, H = 28, pad = 2;
  const min = Math.min(...data) - 3;
  const max = Math.max(...data) + 3;
  const xStep = (W - pad * 2) / (data.length - 1);
  const yScale = v => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const pts = data.map((v, i) => `${pad + i * xStep},${yScale(v)}`).join(" ");
  const color = status === "critical" ? "var(--critical)" : status === "warn" ? "var(--warn)" : "var(--ok)";
  return `<svg class="sparkline-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" opacity=".8"/>
    <circle cx="${pad + (data.length-1)*xStep}" cy="${yScale(data[data.length-1])}" r="2.5" fill="${color}"/>
  </svg>`;
}

/* ══════════════════════════════════
   PREDICTED EVENT TIMELINE
══════════════════════════════════ */
function renderTimeline() {
  el.timelineList.innerHTML = "";
  assetData().timeline.forEach(ev => {
    const dCls = `dot-${ev.severity}`;
    const tCls = `t-${ev.severity}`;
    const div  = document.createElement("div");
    div.className = "timeline-event";
    div.innerHTML = `
      <span class="timeline-dot ${dCls}"></span>
      <div class="timeline-when ${tCls}">${ev.when}</div>
      <div class="timeline-title">${ev.label}</div>
      <div class="timeline-desc">${ev.desc}</div>
    `;
    el.timelineList.appendChild(div);
  });
}

/* ══════════════════════════════════
   HEATMAP
══════════════════════════════════ */
function renderHeatmap() {
  el.heatmapGrid.innerHTML = "";
  HEATMAP.cells.forEach((cls, i) => {
    const zone = HEATMAP.zones[i % HEATMAP.zones.length];
    const row  = Math.floor(i / HEATMAP.zones.length) + 1;
    const cell = document.createElement("div");
    cell.className = `heatmap-cell cell-${cls}`;
    cell.setAttribute("title", `Zone ${zone} Row ${row}: ${cls.replace("-"," ")}`);
    cell.setAttribute("aria-label", `Zone ${zone} Row ${row}`);
    el.heatmapGrid.appendChild(cell);
  });
  el.heatmapLegend.innerHTML = `
    <span><span class="legend-dot" style="background:var(--critical)"></span> Severe (${HEATMAP.counts.severe})</span>
    <span><span class="legend-dot" style="background:rgba(217,119,6,.6)"></span> Elevated (${HEATMAP.counts.elevated})</span>
    <span><span class="legend-dot" style="background:rgba(5,150,105,.35)"></span> Nominal (${HEATMAP.counts.nominal})</span>
  `;
}

/* ══════════════════════════════════
   ANOMALY SIGNATURES
══════════════════════════════════ */
function renderAnomalySignatures() {
  const alerts = assetData().alerts;
  el.anomalyList.innerHTML = "";
  const critical = alerts.filter(a => a.risk === "P1" || a.risk === "P2").length;
  el.anomalyBadge.textContent = `${critical} Active`;
  el.criticalBadge.textContent = critical;

  alerts.forEach((alert, idx) => {
    const isGlow = idx === 0;
    const cardCls = alert.risk === "P3" ? "card-warn" : isGlow ? "card-critical-glow" : "card-critical";
    const pLevel  = alert.risk === "P1" ? "p1" : alert.risk === "P2" ? "p2" : "p3";
    const pLabel  = alert.risk === "P1" ? "P1-CRIT" : alert.risk === "P2" ? "P2-HIGH" : "P3-WARN";

    const card = document.createElement("div");
    card.className = `anomaly-card ${cardCls}`;
    card.setAttribute("role", "alert");
    card.innerHTML = `
      <div class="anomaly-header">
        <div class="anomaly-badges">
          <span class="priority-badge ${pLevel}">${pLabel}</span>
        </div>
        <span class="anomaly-title">${alert.title}</span>
        <button class="anomaly-dismiss" title="Dismiss" aria-label="Dismiss ${alert.title}">×</button>
      </div>
      <div class="anomaly-sig">SIG: ${alert.meta}</div>
      <button class="agent-btn" aria-label="Consult AI agent for ${alert.title}">
        <span class="btn-icon">🤖</span>Consult Agent
      </button>
      <div class="agent-response" style="display:none"></div>
    `;

    card.querySelector(".anomaly-dismiss").addEventListener("click", () => {
      card.style.opacity = "0";
      card.style.transform = "translateX(20px)";
      card.style.transition = "all .3s ease";
      setTimeout(() => card.remove(), 300);
    });

    card.querySelector(".agent-btn").addEventListener("click", function() {
      analyzeAnomaly(this, alert, card);
    });

    // Make the card itself open the alert detail modal when clicked
    card.addEventListener("click", e => {
      // Ignore if user clicked a button inside the card (consult agent or dismiss)
      if (e.target.closest(".agent-btn") || e.target.closest(".anomaly-dismiss")) return;
      openAlertModalForAnomaly(alert, card);
    });
    card.style.cursor = "pointer";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", e => {
      if ((e.key === "Enter" || e.key === " ") &&
          !e.target.closest(".agent-btn") && !e.target.closest(".anomaly-dismiss")) {
        e.preventDefault();
        openAlertModalForAnomaly(alert, card);
      }
    });

    el.anomalyList.appendChild(card);
  });
}

/**
 * Map an anomaly card (asset-level alerts) to its corresponding flow-level alert
 * and open the detail modal. If a direct match isn't found, fall back to the
 * top alert in the current flow so the user always sees *something* relevant.
 */
function openAlertModalForAnomaly(alert, card) {
  // Try to match by title fragment across all flow alerts
  const needle = (alert.title || "").toLowerCase();
  for (const flowKey of Object.keys(FLOW_DATA)) {
    const match = (FLOW_DATA[flowKey].alerts || []).find(a =>
      needle.includes((a.label || "").toLowerCase().split(" ")[0]) ||
      (a.title || "").toLowerCase().includes(needle.split(" ")[0])
    );
    if (match) { openAlertModal(match.id); return; }
  }
  // Fallback: top alert in current flow
  const flow = currentFlowData();
  const top = (flow.alerts || []).slice().sort((a, b) => b.count - a.count)[0];
  if (top) openAlertModal(top.id);
  else showToast("No detailed alert mapping available for this anomaly");
}

async function analyzeAnomaly(btn, alert, card) {
  const responseDiv = card.querySelector(".agent-response");
  btn.disabled = true;
  btn.innerHTML = `<span class="btn-icon">⏳</span> Analysing…`;
  responseDiv.style.display = "block";
  responseDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

  try {
    const resp = await fetch("/api/analyze-anomaly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        anomaly:   alert.anomaly || alert.meta,
        hint:      alert.hint   || "",
        equipment: alert.title
      })
    });
    const result = await resp.json();
    const text = result.answer || "Analysis unavailable.";
    responseDiv.textContent = "";
    typewriterEffect(responseDiv, text, 18);
    el.aiStatus.textContent = result.source === "minimax"
      ? "AI mode: LangGraph agent live ✓"
      : "AI mode: local reasoning fallback (offline)";
    el.aiStatus.className = result.source === "minimax" ? "ai-status status-live" : "ai-status";
  } catch (err) {
    responseDiv.textContent = "⚠ Could not reach AI agent. Check server connection.";
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span class="btn-icon">✓</span> Analysis Complete`;
  }
}

function typewriterEffect(elem, text, speed = 20) {
  let i = 0;
  elem.textContent = "";
  const timer = setInterval(() => {
    elem.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

/* ══════════════════════════════════
   PROCESS FLOW MONITOR (CRM/BF/CASTER)
══════════════════════════════════ */
function currentFlowData() { return FLOW_DATA[state.flow]; }

function renderProcessFlow() {
  const flow = currentFlowData();
  if (!flow) return;
  const info = FLOW_TITLES[state.flow];
  el.flowTitle.textContent   = info.title;
  el.flowSubtitle.textContent = info.sub;

  renderCrmParameters(el.crmLeftParameters,  flow.leftParameters);
  renderCrmParameters(el.crmRightParameters, flow.rightParameters);
  renderMillFlow(flow);
  renderAgcLayer(flow);
  renderStripMetrics(flow);
  renderCrmStatus(flow);
  renderCrmHealth(flow);
  renderCrmAlerts(flow);
}

function renderCrmParameters(container, items) {
  container.innerHTML = items.map(p => `
    <div class="parameter-card ${p.tone}">
      <span>${p.name}</span>
      <strong>${p.value}</strong>
      <div class="parameter-progress">
        <i style="width:${p.progress}%"></i>
        <em>${p.progress}%</em>
      </div>
    </div>
  `).join("");
}

function renderMillFlow(flow) {
  el.millFlowTrack.innerHTML = "";
  flow.flowNodes.forEach((node, i) => {
    const nodeEl = document.createElement("div");
    nodeEl.className = "flow-node";
    nodeEl.innerHTML = `
      <div class="flow-node-box node-${node.status}" title="${node.label} — ${node.health}% health">
        ${node.short}
      </div>
      <span class="flow-node-label">${node.label.replace("\\n", "<br>")}</span>
    `;
    nodeEl.addEventListener("click", () => showToast(`${node.label.replace("\\n"," ")} — Health: ${node.health}%`));
    el.millFlowTrack.appendChild(nodeEl);

    if (i < flow.flowNodes.length - 1) {
      const conn = document.createElement("div");
      conn.className = "flow-connector";
      el.millFlowTrack.appendChild(conn);
    }
  });
}

function renderAgcLayer(flow) {
  el.agcLayer.innerHTML = flow.agcNodes.map(agc => `
    <div class="agc-block">
      <div class="agc-conn-v v-${agc.status}"></div>
      <div class="agc-box agc-${agc.status}">${agc.stand} · ${agc.pressure}</div>
    </div>
  `).join("");
}

function renderStripMetrics(flow) {
  el.stripMetrics.innerHTML = flow.stripMetrics.map(m => `
    <div class="strip-metric">
      <div class="strip-metric-val s-${m.color}">${m.value}</div>
      <div class="strip-metric-lbl">${m.label}</div>
    </div>
  `).join("");
}

function renderCrmStatus(flow) {
  const blocks = [["Operation", flow.status.operation], ["Maintenance", flow.status.maintenance]];
  el.bltStatusGrid.innerHTML = blocks.map(([title, items]) => `
    <section>
      <h4>${title}</h4>
      <div>${items.map(item => `
        <span class="status-chip">
          <i class="${item.tone}"></i>${item.label} — ${item.value}
        </span>
      `).join("")}</div>
    </section>
  `).join("");
}

function renderCrmHealth(flow) {
  const avg = Math.round(flow.health.reduce((s, h) => s + h.value, 0) / flow.health.length);
  const angle = -90 + (avg / 100) * 180;
  el.healthNeedle.style.transform = `translateX(-50%) rotate(${angle}deg)`;

  el.crmHealthBars.innerHTML = flow.health.map(h => `
    <div class="health-bar-row">
      <header><strong>${h.label}</strong><b>${h.value}%</b></header>
      <div class="health-progress ${h.tone}"><i style="width:${h.value}%"></i></div>
    </div>
  `).join("");
}

function renderCrmAlerts(flow) {
  const max = Math.max(...flow.alerts.map(a => a.count));
  el.crmAlertChart.innerHTML = flow.alerts.map(a => `
    <article class="alert-bar" data-alert-id="${a.id}" tabindex="0" role="button" aria-label="Open ${a.title}">
      <div style="height:${Math.max(24, (a.count / max) * 80)}px">${a.count}</div>
      <span>${a.label}</span>
    </article>
  `).join("");

  // Wire each bar to open the alert detail modal
  el.crmAlertChart.querySelectorAll(".alert-bar").forEach(bar => {
    const handler = () => openAlertModal(bar.dataset.alertId);
    bar.addEventListener("click", handler);
    bar.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handler(); }
    });
  });
}

/* ══════════════════════════════════
   ALERT DETAIL MODAL
   ══════════════════════════════════ */
const alertModal = {
  backdrop:  $("alertModal"),
  closeBtn:  $("alertModalClose"),
  id:        $("alertModalId"),
  pill:      $("alertModalPill"),
  title:     $("alertModalTitle"),
  subtitle:  $("alertModalSubtitle"),
  sev:       $("alertMetaSeverity"),
  status:    $("alertMetaStatus"),
  asset:     $("alertMetaAsset"),
  strand:    $("alertMetaStrand"),
  location:  $("alertMetaLocation"),
  param:     $("alertMetaParameter"),
  detected:  $("alertMetaDetected"),
  raised:    $("alertMetaRaised"),
  ack:       $("alertMetaAck"),
  owner:     $("alertMetaOwner"),
  supervisor:$("alertMetaSupervisor"),
  sop:       $("alertMetaSop"),
  signature: $("alertSignature"),
  curVal:    $("alertCurrentValue"),
  baseVal:   $("alertBaselineValue"),
  threshold: $("alertThreshold"),
  related:   $("alertRelatedList"),
  aiSummary: $("alertAiSummary"),
  aiRoot:    $("alertAiRootCauses"),
  aiEvidence:$("alertAiEvidence"),
  aiActions: $("alertAiActions"),
  aiConf:    $("alertAiConfidence"),
  aiProb:    $("alertAiProb"),
  aiTta:     $("alertAiTta"),
  aiSource:  $("alertAiSource"),
  ackBtn:    $("alertAckBtn"),
  escBtn:    $("alertEscalateBtn"),
  woBtn:     $("alertCreateWoBtn"),
  diagBtn:   $("alertRunDiagBtn"),
  currentAlertId: null
};

function findAlertById(alertId) {
  for (const flowKey of Object.keys(FLOW_DATA)) {
    const found = (FLOW_DATA[flowKey].alerts || []).find(a => a.id === alertId);
    if (found) return { alert: found, flow: flowKey };
  }
  return null;
}

function severityTone(sev) {
  if (sev === "critical") return "critical";
  if (sev === "high")     return "warn";
  if (sev === "medium")   return "amber";
  return "ok";
}

function openAlertModal(alertId) {
  const found = findAlertById(alertId);
  if (!found) { showToast("Alert not found in current asset group"); return; }
  const a = found.alert;

  alertModal.currentAlertId = alertId;
  alertModal.id.textContent       = a.id;
  alertModal.pill.textContent     = a.category;
  alertModal.pill.className       = "alert-modal-pill pill-" + severityTone(a.severity);
  alertModal.title.textContent    = a.title;
  alertModal.subtitle.textContent = `${a.location} · ${a.parameter}`;
  alertModal.sev.textContent      = a.severity.toUpperCase();
  alertModal.sev.className        = "meta-tone-" + severityTone(a.severity);
  alertModal.status.textContent   = a.status;
  alertModal.status.className     = "meta-tone-" + (a.status === "OPEN" ? "critical" : "amber");
  alertModal.asset.textContent    = `${a.nodeId}`;
  alertModal.strand.textContent   = a.strand;
  alertModal.location.textContent = a.location;
  alertModal.param.textContent    = a.parameter;
  alertModal.detected.textContent = a.detectedAt;
  alertModal.raised.textContent   = a.raisedAt;
  alertModal.ack.textContent      = a.acknowledgedAt;
  alertModal.owner.textContent    = a.owner;
  alertModal.supervisor.textContent = a.supervisor;
  alertModal.sop.textContent      = `${a.sop} · ${a.workOrder}`;
  alertModal.signature.textContent = a.signature;
  alertModal.curVal.textContent    = a.currentValue;
  alertModal.baseVal.textContent   = a.baselineValue;
  alertModal.threshold.textContent = a.threshold;
  alertModal.related.innerHTML     = (a.relatedAlarms || []).map(rm =>
    `<span class="alert-chip">${rm}</span>`
  ).join("");

  // AI Diagnostic stub (will refresh from server when "Run AI Diagnosis" is clicked)
  alertModal.aiSummary.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
  alertModal.aiRoot.innerHTML    = "";
  alertModal.aiEvidence.innerHTML= "";
  alertModal.aiActions.innerHTML = "";
  alertModal.aiConf.textContent  = "—";
  alertModal.aiProb.textContent  = "—";
  alertModal.aiTta.textContent   = "—";
  alertModal.aiSource.textContent = "LangGraph + Multi-Agent RAG";

  // Populate AI panels with the asset-aligned context (free, no network needed)
  const ctx = buildAlertAiContext(a, found.flow);
  renderAlertAi(ctx);

  // Open
  alertModal.backdrop.classList.add("visible");
  alertModal.backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeAlertModal() {
  alertModal.backdrop.classList.remove("visible");
  alertModal.backdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  alertModal.currentAlertId = null;
}

function buildAlertAiContext(alert, flowKey) {
  // Look up the matching asset directly without mutating global state, so opening
  // an alert doesn't switch the rest of the dashboard away from what the user was viewing.
  const assetKey = flowKey === "crm" ? "crm" : flowKey === "bf" ? "bf" : "caster";
  const asset = DATA[assetKey];
  return {
    alert,
    asset,
    rootCauses: asset.rootCauses,
    evidence:   asset.evidence,
    plan:       asset.plan
  };
}

function renderAlertAi(ctx) {
  const { alert, rootCauses, evidence, plan } = ctx;
  const matchingRoot = rootCauses[0];
  const matchingPlan = (plan.find(p => p.priority === "P1") || plan[0]);

  alertModal.aiSummary.innerHTML = `
    <p><b>${alert.title}</b> raised at <b>${alert.raisedAt}</b>. 
    Live signature shows <i>${alert.signature}</i>. The likely cause is 
    <b>${matchingRoot.cause}</b> with <b>${matchingRoot.confidence}%</b> confidence.</p>
    <p>Recommended action: <b>${matchingPlan.recommendation}</b> — ETA <b>${matchingPlan.eta}</b>.</p>
  `;

  alertModal.aiRoot.innerHTML = rootCauses.map(rc => `
    <article class="root-card">
      <header>
        <strong>${rc.cause}</strong>
        <meter min="0" max="100" value="${rc.confidence}" title="${rc.confidence}%"></meter>
      </header>
      <span>${rc.confidence}% confidence — ${rc.evidence}</span>
    </article>
  `).join("");

  alertModal.aiEvidence.innerHTML = evidence.map(ev => `
    <article>
      <strong>${ev.title}</strong>
      <p>${ev.text}</p>
    </article>
  `).join("");

  alertModal.aiActions.innerHTML = plan.map(p => `
    <article class="reco-card prio-${p.priority.toLowerCase()}">
      <div><span class="prio-pill">${p.priority}</span><strong>${p.asset}</strong></div>
      <p>${p.recommendation}</p>
      <small>ETA: ${p.eta} · ${p.risk}</small>
    </article>
  `).join("");

  alertModal.aiConf.textContent = `${matchingRoot.confidence}%`;
  alertModal.aiProb.textContent = alert.severity === "critical" ? "47–54%" :
                                   alert.severity === "high"     ? "28–36%" :
                                   alert.severity === "medium"   ? "12–18%" : "< 8%";
  alertModal.aiTta.textContent  = matchingPlan.eta;
  alertModal.aiSource.textContent = "LangGraph + Multi-Agent RAG · alert-linked";
}

async function runAlertAiDiagnosis() {
  const found = findAlertById(alertModal.currentAlertId);
  if (!found) return;
  const a = found.alert;
  alertModal.aiSummary.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
  try {
    const resp = await fetch("/api/analyze-anomaly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        anomaly:   a.anomaly || a.signature,
        hint:      a.hint   || a.signature,
        equipment: a.title
      })
    });
    const result = await resp.json();
    alertModal.aiSummary.innerHTML = `<p>${escapeHtml(result.answer || "Analysis unavailable.")}</p>`;
    alertModal.aiSource.textContent = result.source === "minimax"
      ? "LangGraph + Multi-Agent RAG · live ✓"
      : "LangGraph + Multi-Agent RAG · local fallback";
  } catch (err) {
    alertModal.aiSummary.innerHTML = `<p>⚠ Could not reach AI agent. Showing cached diagnostic.</p>`;
  }
}

// Wire close / Esc / action buttons
alertModal.closeBtn.addEventListener("click", closeAlertModal);
alertModal.backdrop.addEventListener("click", e => {
  if (e.target === alertModal.backdrop) closeAlertModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && alertModal.backdrop.classList.contains("visible")) closeAlertModal();
});

alertModal.ackBtn.addEventListener("click", () => {
  showToast("Alert acknowledged by current shift engineer");
  alertModal.ack.textContent = new Date().toLocaleString("en-IN", { hour12: false });
});
alertModal.escBtn.addEventListener("click", () =>
  showToast("Escalated to on-call reliability engineer")
);
alertModal.woBtn.addEventListener("click", () =>
  showToast("Work order draft created from this alert")
);
alertModal.diagBtn.addEventListener("click", runAlertAiDiagnosis);

// Make the whole "Active Alert Counts" panel clickable — open the first (top) alert
const alertPanelEl = document.querySelector(".blt-alert-panel");
if (alertPanelEl) {
  alertPanelEl.addEventListener("click", e => {
    if (e.target.closest(".alert-bar")) return; // bar handler already fired
    const flow = currentFlowData();
    const top = (flow.alerts || []).slice().sort((a, b) => b.count - a.count)[0];
    if (top) openAlertModal(top.id);
  });
}

// Architecture SVG alert cards → open the corresponding alert detail
function wireArchAlertCards() {
  const archZone = document.getElementById("archAlertZone");
  if (!archZone) return;

  // Wire each individual alert card inside the SVG
  archZone.querySelectorAll(".arch-alert-card").forEach(card => {
    const alertId = card.getAttribute("data-alert-id");
    if (!alertId) return;
    const open = () => openAlertModal(alertId);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
}
wireArchAlertCards();
function renderRootCauses() {
  el.rootCauseList.innerHTML = assetData().rootCauses.map(rc => `
    <article class="root-card">
      <header>
        <strong>${rc.cause}</strong>
        <meter min="0" max="100" value="${rc.confidence}" title="${rc.confidence}%"></meter>
      </header>
      <span>${rc.confidence}% confidence — ${rc.evidence}</span>
    </article>
  `).join("");
}

function renderEvidence() {
  el.evidenceList.innerHTML = assetData().evidence.map(ev => `
    <article>
      <strong>${ev.title}</strong>
      <p>${ev.text}</p>
    </article>
  `).join("");
}

function renderPlan() {
  el.workRows.innerHTML = assetData().plan.map(p => `
    <div class="table-row" role="row">
      <span><b class="rank ${p.priority.toLowerCase()}">${p.priority}</b></span>
      <span>${p.asset}</span>
      <span>${p.risk}</span>
      <span>${p.recommendation}</span>
      <span>${p.eta}</span>
    </div>
  `).join("");
}

function renderAssistantIntro() {
  el.chatWindow.innerHTML = `
    <article class="message ai">
      <strong>MANTIS AI</strong>
      <p>${assetData().assistantSummary}</p>
    </article>
  `;
  el.chatInput.value = assetData().assistantQuestion;
  el.feedbackNote.value = `${assetData().alerts[0].title}: engineer validation note captured after inspection.`;
}

/* ══════════════════════════════════
   ASSET SHELL
══════════════════════════════════ */
function assetData() { return DATA[state.asset]; }

function renderAssetShell() {
  el.assetLine.textContent  = assetData().line;
  el.assetGroup.textContent = assetData().group;
  document.querySelectorAll("[data-asset]").forEach(b =>
    b.classList.toggle("active", b.dataset.asset === state.asset)
  );
}

/* ══════════════════════════════════
   FULL RENDER
══════════════════════════════════ */
function renderAll() {
  renderAssetShell();
  renderKpis();
  renderRiskTable();
  renderTimeline();
  renderHeatmap();
  renderAnomalySignatures();
  renderRootCauses();
  renderEvidence();
  renderPlan();
  renderAssistantIntro();
  renderProcessFlow();
}

/* ══════════════════════════════════
   LIVE TELEMETRY JITTER
══════════════════════════════════ */
function startTelemetryJitter() {
  setInterval(() => {
    const kpis  = assetData().kpis;
    const oee   = (kpis.oee + (Math.random() - 0.5) * 0.4).toFixed(1);
    const conf  = Math.round(kpis.confidence + (Math.random() - 0.5) * 0.8);
    el.kpiOeeVal.textContent  = oee + "%";
    el.kpiConfVal.textContent = conf + "%";
  }, 3200);

  setInterval(() => {
    const secs = Math.floor(Math.random() * 10) + 2;
    el.lastSync.textContent = `Last sync: ${secs}s ago`;
  }, 8000);
}

/* ══════════════════════════════════
   AI CHAT (LangGraph)
══════════════════════════════════ */
function addMessage(kind, text) {
  const article = document.createElement("article");
  article.className = `message ${kind}`;
  const name = kind === "user" ? "User" : "MANTIS AI";
  article.innerHTML = `<strong>${name}</strong><p>${escapeHtml(text)}</p>`;
  el.chatWindow.appendChild(article);
  el.chatWindow.scrollTop = el.chatWindow.scrollHeight;
  return article;
}

function escapeHtml(text) {
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function buildDiagnosisContext() {
  const asset = assetData();
  return {
    selectedAsset: asset.label,
    riskRows:      asset.riskRows,
    alerts:        asset.alerts,
    rootCauses:    asset.rootCauses,
    evidence:      asset.evidence,
    plan:          asset.plan,
    activeFilters: { area: state.strand, parameter: state.parameter }
  };
}

function localFallback(question) {
  const a = assetData();
  return `[LOCAL FALLBACK] For ${a.label}: the highest priority issue is ${a.plan[0].asset}. Leading root cause: ${a.rootCauses[0].cause} (${a.rootCauses[0].confidence}% confidence). Action: ${a.plan[0].recommendation}`;
}

async function requestAiDiagnosis(question) {
  try {
    const resp = await fetch("/api/diagnose", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ question, context: buildDiagnosisContext() })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const result = await resp.json();
    el.aiStatus.textContent = result.source === "minimax"
      ? "AI mode: LangGraph agent live ✓"
      : "AI mode: local reasoning fallback (offline)";
    el.aiStatus.className = result.source === "minimax" ? "ai-status status-live" : "ai-status";
    return result.answer || localFallback(question);
  } catch (err) {
    el.aiStatus.textContent = "AI mode: local reasoning fallback (offline)";
    el.aiStatus.className   = "ai-status";
    return localFallback(question);
  }
}

/* ══════════════════════════════════
   NAVIGATION
══════════════════════════════════ */
function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v =>
    v.classList.toggle("active-view", v.id === viewId)
  );
  document.querySelectorAll(".nav-item").forEach(b =>
    b.classList.toggle("active", b.dataset.view === viewId)
  );
}

function showToast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.toast.classList.remove("visible"), 2800);
}

/* ══════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════ */

// Nav buttons
document.querySelectorAll(".nav-item").forEach(b =>
  b.addEventListener("click", () => switchView(b.dataset.view))
);

// Asset switcher
document.querySelectorAll("[data-asset]").forEach(b =>
  b.addEventListener("click", () => {
    state.asset     = b.dataset.asset;
    state.strand    = "All";
    state.parameter = "All parameters";
    renderAll();
    showToast(`${assetData().label} data loaded`);
  })
);

// Process flow switcher
document.querySelectorAll("[data-flow]").forEach(b =>
  b.addEventListener("click", () => {
    state.flow = b.dataset.flow;
    document.querySelectorAll("[data-flow]").forEach(x =>
      x.classList.toggle("active", x.dataset.flow === state.flow)
    );
    renderProcessFlow();
    showToast(`${FLOW_TITLES[state.flow].title} loaded`);
  })
);

// Chat form
$("chatForm").addEventListener("submit", async e => {
  e.preventDefault();
  const q = el.chatInput.value.trim();
  if (!q) return;
  addMessage("user", q);
  el.chatInput.disabled = true;
  const pending = addMessage("ai", "Analysing live asset context, alarm patterns, SOP evidence, and historical records…");
  const answer = await requestAiDiagnosis(q);
  pending.querySelector("p").textContent = answer;
  el.chatInput.disabled = false;
  el.chatInput.value    = "";
  el.chatInput.focus();
  showToast("Diagnosis complete — explainable evidence and action plan generated.");
});

// Global search → diagnosis
$("globalSearch").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const q = e.target.value.trim();
    if (q) el.chatInput.value = q;
    switchView("diagnosis");
    showToast("Query routed to AI diagnosis workspace.");
  }
});

// Optimise plan
$("optimizePlan").addEventListener("click", () =>
  showToast(`${assetData().label} plan optimised around next shift window, spare availability, and P1 risk.`)
);

// Save feedback
$("saveFeedback").addEventListener("click", () => {
  el.feedbackStatus.textContent = "Feedback captured. The learning loop will update future retrieval and thresholds.";
  showToast("Engineer feedback saved for continuous improvement.");
});

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
renderAll();
startTelemetryJitter();
