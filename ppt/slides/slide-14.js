// Assumptions and Limitations
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.warn }, line: { color: theme.warn, width: 0 }
  });
  slide.addText("09  /  ASSUMPTIONS  &  LIMITATIONS", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.warn, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("What the prototype assumes, and what it does not yet do.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Two columns
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 4.4, h: 3.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.1
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 0.08, h: 3.6,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("ASSUMPTIONS", {
    x: 0.75, y: 1.55, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 3, margin: 0
  });
  slide.addText([
    { text: "Telemetry is sampled and delivered in near-real-time (PI historian / OPC-UA).", options: { bullet: true, breakLine: true } },
    { text: "Plant asset registry is known; equipment IDs are stable across systems.", options: { bullet: true, breakLine: true } },
    { text: "SOPs, manuals, and prior work orders are available as plain text or PDF.", options: { bullet: true, breakLine: true } },
    { text: "Engineers validate at least a fraction of recommendations to seed the feedback loop.", options: { bullet: true, breakLine: true } },
    { text: "Network access to the LLM endpoint is available; offline mode uses a local fallback.", options: { bullet: true } }
  ], {
    x: 0.85, y: 1.9, w: 4.0, h: 3.0,
    fontSize: 10.5, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.4, w: 4.4, h: 3.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.1
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.4, w: 0.08, h: 3.6,
    fill: { color: theme.warn }, line: { color: theme.warn, width: 0 }
  });
  slide.addText("LIMITATIONS", {
    x: 5.35, y: 1.55, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.warn,
    charSpacing: 3, margin: 0
  });
  slide.addText([
    { text: "Demo data is mocked. The narrow ML detectors shown are design intent, not trained weights.", options: { bullet: true, breakLine: true } },
    { text: "LLM cost / latency apply at production scale. Caching and per-asset scopes mitigate this.", options: { bullet: true, breakLine: true } },
    { text: "Model drift will need scheduled retraining and ground-truth feedback.", options: { bullet: true, breakLine: true } },
    { text: "Single Node process. For plant-scale load, run behind a load balancer with shared session state.", options: { bullet: true, breakLine: true } },
    { text: "No active write-back to CMMS yet. Advisory mode only.", options: { bullet: true } }
  ], {
    x: 5.45, y: 1.9, w: 4.0, h: 3.0,
    fontSize: 10.5, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.15, w: 9.0, h: 0.4,
    fill: { color: theme.light }, line: { color: theme.warn, width: 1 },
    rectRadius: 0.04
  });
  slide.addText("Honest scope. The architecture is production-ready; the demo models are scaffolding.", {
    x: 0.7, y: 5.18, w: 8.6, h: 0.35,
    fontSize: 11, fontFace: "Arial", italic: true, color: theme.warn, bold: true, margin: 0
  });
  slide.addText("14", {
    x: 9.3, y: 5.55, w: 0.5, h: 0.07,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
