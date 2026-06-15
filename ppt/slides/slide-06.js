// Model Design & Reasoning Pipeline
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("05  /  MODEL  DESIGN  &  REASONING  PIPELINE", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Specialised models plus a reasoning LLM that always cites evidence.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText("A bimodal design: narrow ML signals for detection, an LLM for explanation and synthesis.", {
    x: 0.5, y: 1.25, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // Left: detection models
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.7, w: 4.4, h: 3.4,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.7, w: 0.08, h: 3.4,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("NARROW MODELS  /  DETECTION", {
    x: 0.7, y: 1.85, w: 4.1, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText("Per-parameter ML detectors trained on asset-specific baselines.", {
    x: 0.7, y: 2.15, w: 4.1, h: 0.4,
    fontSize: 12, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText([
    { text: "Vibration RMS, sidebands, and bearing-tone analysis (FFT + envelope).", options: { bullet: true, breakLine: true } },
    { text: "Thermal drift detection using rolling mean + 3-sigma envelopes.", options: { bullet: true, breakLine: true } },
    { text: "Lubrication pressure and coolant flow imbalance classifiers.", options: { bullet: true, breakLine: true } },
    { text: "Alarm-burst frequency detector for noise / chattering suppression.", options: { bullet: true, breakLine: true } },
    { text: "Output: anomaly signature + confidence score per asset.", options: { bullet: true } }
  ], {
    x: 0.85, y: 2.55, w: 4.0, h: 2.45,
    fontSize: 10.5, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  // Right: reasoning
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.7, w: 4.4, h: 3.4,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.7, w: 0.08, h: 3.4,
    fill: { color: theme.critical }, line: { color: theme.critical, width: 0 }
  });
  slide.addText("REASONING  LLM  /  EXPLANATION", {
    x: 5.3, y: 1.85, w: 4.1, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.critical,
    charSpacing: 2, margin: 0
  });
  slide.addText("LLM reads anomalies + retrieved evidence and writes a justification.", {
    x: 5.3, y: 2.15, w: 4.1, h: 0.4,
    fontSize: 12, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText([
    { text: "MiniMax M3 endpoint for natural-language reasoning.", options: { bullet: true, breakLine: true } },
    { text: "Prompt is grounded in: live signature, asset, SOP, work order.", options: { bullet: true, breakLine: true } },
    { text: "Returns ranked hypotheses with confidence and cited evidence.", options: { bullet: true, breakLine: true } },
    { text: "Planner step composes the action plan and ETA.", options: { bullet: true, breakLine: true } },
    { text: "Falls back to local reasoning if the LLM is unreachable.", options: { bullet: true } }
  ], {
    x: 5.45, y: 2.55, w: 4.0, h: 2.45,
    fontSize: 10.5, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  // Bottom callout
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.18, w: 9.0, h: 0.4,
    fill: { color: theme.light }, line: { color: theme.accent, width: 1 },
    rectRadius: 0.04
  });
  slide.addText("Confidence = sensor quality (30%) + history match (25%) + evidence (20%) + model agreement (15%) + temporal stability (10%).", {
    x: 0.7, y: 5.22, w: 8.6, h: 0.35,
    fontSize: 10, fontFace: "Arial", italic: true, color: theme.accent, margin: 0
  });
  slide.addText("06", {
    x: 9.3, y: 5.6, w: 0.5, h: 0.05,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
