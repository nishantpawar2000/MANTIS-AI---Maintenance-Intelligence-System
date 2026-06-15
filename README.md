# Maintenance Wizard for Industrial Equipment

> **AI-powered maintenance copilot for steel plants — diagnose, predict, and act in one screen.**

A multi-agent decision-support prototype built for the hackathon brief. MANTIS AI fuses live telemetry, equipment knowledge, and engineer feedback into explainable, traceable maintenance actions for **Caster**, **Blast Furnace**, and **CRM** assets.

---

## Why It Stands Out

- **7 specialized agents** working in concert — not a single chatbot
- **Every recommendation is traceable** to a sensor signal, SOP, manual, or historical work order
- **Predicts failures 4h → 96h ahead** with RUL, health scores, and ranked action plans
- **Engineer feedback loop** built in — the system gets sharper with every shift
- **Runs offline too** — local-reasoning fallback means the demo never breaks

---

## Hackathon Requirement Coverage

| # | Requirement | Implementation |
|---|---|---|
| 1 | Contextual Reasoning with LLMs / SLMs | `server.js` → `/api/diagnose` + `/api/analyze-anomaly` call **MiniMax-M3** with a steel-plant-tuned system prompt. Offline fallback keeps the demo working without a key. |
| 2 | Knowledge Integration (manuals, SOPs, history, failure logs) | `data/app-data.js` → `evidence[]` (SOPs + manuals), `rootCauses[].evidence` (historical work orders), `alerts[].meta` + `signature` (failure patterns). |
| 3 | Natural-Language Multi-Turn Interaction | `app.js` → `addMessage`, `chatForm` submit, `requestAiDiagnosis`. Chat history with typing indicators and context-aware follow-ups. |
| 4 | Explainable Recommendations | `app.js` → `renderAlertAi` / `renderRootCauses` / `renderEvidence`. Every output carries a `<meter>` confidence score, cited evidence, and a ranked plan with priority + ETA + risk. |
| 5 | Abnormality Detection & Failure Prediction | `data/app-data.js` → `riskRows[].health` & `rul`, `timeline[]` predicted events (4h → 96h), anomalies ranked **P1 / P2 / P3**. |
| 6 | Feedback-Driven Improvement | `index.html` → `feedbackPanel` (select + textarea + Save). `app.js` → `saveFeedback` updates the learning loop live. |
| 7 | Real-Time Alerting | Animated SVG alert cards, full alert detail modal (Acknowledge / Escalate / Create-Work-Order), critical-alert counter, toast notifications, simulated live telemetry. |

---

## The Agentic Stack

| Agent | Job |
|---|---|
| **Ingestion** | Collects logs, sensor alerts, manuals, SOPs, and maintenance records |
| **Anomaly** | Detects vibration, temperature, lube-pressure, alarm-burst, and drift anomalies |
| **Retrieval** | RAG over SOPs, manuals, and similar historical work orders |
| **Root Cause** | Compares live anomalies with historical patterns and equipment knowledge |
| **Risk** | Scores safety, production, quality, downtime, and confidence impact |
| **Planner** | Recommends actions, spares, inspection windows, and CMMS work orders |
| **Feedback** | Captures engineer validation to improve retrieval and model thresholds |

---

## What's On Screen

- Equipment health gauges & alarm status for **Caster**, **BF**, **CRM**
- Critical alert feed ranked by failure probability × business risk
- BLT monitor with parameter cards, operation/maintenance chips, schematic, health needle, alert bars
- **Risk table** with RUL, sparkline trends, and one-click AI diagnosis
- **Predicted-event timeline** (4h → 96h) with severity dots
- **Heatmap** of asset-zone health across the plant
- Maintenance **action queue** with priority, ETA, and recommended actions
- **Knowledge evidence panel** — SOPs, manuals, historical work orders
- **Alert detail modal** with root cause, confidence, evidence, and Ack/Escalate/WO actions
- **Feedback loop** for engineer confirmations and corrections

---

## Business Impact

- **Cut unplanned downtime** with earlier, prioritized failure warnings
- **Faster troubleshooting** by fusing sensor evidence with SOPs and history
- **Smarter prioritization** across risk, production impact, and spare availability
- **One agent pattern, many assets** — reusable across Caster, BF, CRM, utilities, and beyond

---

## How to Run

### 1. Install (one-time)
No npm dependencies. Just Node.js ≥ 16.

### 2. (Optional) Enable live AI
Copy `.env.example` → `.env` and add your MiniMax API key:
```env
MINIMAX_API_KEY=your-key-here
MINIMAX_MODEL=MiniMax-M3
MINIMAX_BASE_URL=https://api.minimax.io/v1
```

### 3. Start
```bash
node server.js
```

### 4. Open
👉 **http://localhost:3000**

> **No key? No problem.** The frontend runs offline with dummy data, and the assistant auto-falls back to local reasoning — the demo always works.
