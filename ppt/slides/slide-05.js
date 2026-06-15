// Data Flow & System Flow
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("04  /  DATA  FLOW  &  SYSTEM  FLOW", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("One traceable chain from sensor to engineer action.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // 5 horizontal flow steps
  const steps = [
    { n: "01", t: "Ingest",     d: "Sensors, alarms, historian, CMMS, SOPs are pulled on a continuous loop." },
    { n: "02", t: "Detect",     d: "Anomaly Agent flags vibration, thermal, lubrication, or flow drift against baselines." },
    { n: "03", t: "Retrieve",   d: "RAG Agent pulls matching SOPs, manuals, and prior work orders as evidence." },
    { n: "04", t: "Score",      d: "Risk Agent ranks safety, quality, downtime, and confidence impact for every alert." },
    { n: "05", t: "Recommend", d: "Planner Agent synthesises actions, spares, ETA, and a human-readable summary." }
  ];
  const startX = 0.5, y = 1.4;
  const cardW = 1.78, cardH = 1.95, gap = 0.05;
  steps.forEach((s, i) => {
    const x = startX + i * (cardW + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.08
    });
    // Top accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: 0.08,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
    });
    slide.addText(s.n, {
      x: x + 0.15, y: y + 0.2, w: 0.5, h: 0.35,
      fontSize: 12, fontFace: "Arial", bold: true, color: theme.accent,
      margin: 0
    });
    slide.addText(s.t, {
      x: x + 0.15, y: y + 0.55, w: cardW - 0.3, h: 0.4,
      fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
    });
    slide.addText(s.d, {
      x: x + 0.15, y: y + 1.0, w: cardW - 0.3, h: cardH - 1.1,
      fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0
    });
    // Connector
    if (i < steps.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: x + cardW, y: y + cardH / 2, w: gap, h: 0,
        line: { color: theme.accent, width: 1.5, endArrowType: "triangle" }
      });
    }
  });

  // Below: data inputs vs outputs
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 4.4, h: 1.4,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addText("DATA INPUTS", {
    x: 0.7, y: 3.7, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText([
    { text: "Vibration, temperature, pressure, flow transmitters", options: { bullet: true, breakLine: true } },
    { text: "PI historian snapshots + alarm bursts + PLC logs", options: { bullet: true, breakLine: true } },
    { text: "CMMS work orders + SOPs / manuals in plain text", options: { bullet: true } }
  ], {
    x: 0.85, y: 4.0, w: 4.0, h: 1.0,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 2, margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 3.6, w: 4.4, h: 1.4,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addText("DATA OUTPUTS", {
    x: 5.3, y: 3.7, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText([
    { text: "Ranked alert list with severity, location, time, owner", options: { bullet: true, breakLine: true } },
    { text: "Per-alert evidence chain + root cause hypotheses", options: { bullet: true, breakLine: true } },
    { text: "Recommended actions, spares, ETA, and risk score", options: { bullet: true } }
  ], {
    x: 5.45, y: 4.0, w: 4.0, h: 1.0,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 2, margin: 0
  });

  slide.addText("Every output traces back to a specific input + model signal + retrieved evidence.", {
    x: 0.5, y: 5.15, w: 9.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", italic: true, color: theme.accent, bold: true, margin: 0
  });
  slide.addText("05", {
    x: 9.3, y: 5.45, w: 0.5, h: 0.18,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
