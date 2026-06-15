// Problem + Solution
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("01  /  PROBLEM  &  SOLUTION", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("From reactive firefighting to explainable, agent-driven decisions.", {
    x: 0.5, y: 0.7, w: 9, h: 0.55,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Left: Problem
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 4.4, h: 3.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.1
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 0.08, h: 3.6,
    fill: { color: theme.critical }, line: { color: theme.critical, width: 0 }
  });
  slide.addText("THE PROBLEM", {
    x: 0.75, y: 1.55, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.critical,
    charSpacing: 3, margin: 0
  });
  slide.addText("Steel plants lose hours to unplanned downtime.", {
    x: 0.75, y: 1.85, w: 4.0, h: 0.4,
    fontSize: 15, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText([
    { text: "Engineers spend hours correlating vibration, temperature, and alarm logs across SCADA, PI historian, and CMMS -- by hand.", options: { bullet: true, breakLine: true } },
    { text: "Failures are caught AFTER something trips. SOPs and manuals are searched manually long after the first warning fired.", options: { bullet: true, breakLine: true } },
    { text: "Senior engineers retire with the context behind cryptic alarm codes. New joiners cannot reconstruct it from raw data alone.", options: { bullet: true, breakLine: true } },
    { text: "SOPs, manuals, work orders, and telemetry live in silos. Cross-referencing them in real time is effectively impossible today.", options: { bullet: true } }
  ], {
    x: 0.85, y: 2.35, w: 3.95, h: 2.55,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 4, margin: 0
  });

  // Right: Solution
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.4, w: 4.4, h: 3.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.1
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.4, w: 0.08, h: 3.6,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("THE SOLUTION", {
    x: 5.35, y: 1.55, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 3, margin: 0
  });
  slide.addText("MANTIS -- a 5-agent pipeline that always explains itself.", {
    x: 5.35, y: 1.85, w: 4.0, h: 0.4,
    fontSize: 15, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText([
    { text: "Diagnose. Pinpoint the root cause in minutes, not shifts. Evidence chain included.", options: { bullet: true, breakLine: true } },
    { text: "Predict. 42-hour horizon for vibration, thermal, lubrication, and flow drift.", options: { bullet: true, breakLine: true } },
    { text: "Prioritise. Risk matrix combines safety, quality, downtime, and confidence impact.", options: { bullet: true, breakLine: true } },
    { text: "Explain. Every recommendation traces to a model signal, an SOP, or a prior work order.", options: { bullet: true, breakLine: true } },
    { text: "Learn. Engineer feedback loop updates retrieval and thresholds every shift.", options: { bullet: true } }
  ], {
    x: 5.45, y: 2.35, w: 3.95, h: 2.55,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 4, margin: 0
  });

  // Bottom impact line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.15, w: 9.0, h: 0.4,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 },
    rectRadius: 0.04
  });
  slide.addText("Real impact: 35 MTPA capacity x hours lost = crores in avoidable cost per plant per year.", {
    x: 0.7, y: 5.18, w: 8.6, h: 0.35,
    fontSize: 11, fontFace: "Arial", italic: true, color: "FFFFFF", margin: 0
  });

  slide.addText("02", {
    x: 9.3, y: 5.55, w: 0.5, h: 0.07,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
