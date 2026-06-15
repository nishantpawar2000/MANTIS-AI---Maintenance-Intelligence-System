// System Architecture
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("02  /  SYSTEM ARCHITECTURE", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Five specialist agents on top of a thin Node proxy.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText("Each agent is narrow, evidence-driven, and traceable. The Planner synthesizes the final action.", {
    x: 0.5, y: 1.25, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // Telemetry sources row
  slide.addText("TELEMETRY  SOURCES", {
    x: 0.5, y: 1.7, w: 9, h: 0.25,
    fontSize: 9, fontFace: "Arial", bold: true, color: theme.secondary,
    charSpacing: 3, margin: 0
  });
  const sources = ["Sensors", "Historian", "CMMS", "SOP / KB", "Alarms"];
  sources.forEach((s, i) => {
    const x = 0.5 + i * 1.85;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.0, w: 1.65, h: 0.45,
      fill: { color: "FFFFFF" }, line: { color: "CBD5E1", width: 1 },
      rectRadius: 0.06
    });
    slide.addText(s, {
      x: x, y: 2.0, w: 1.65, h: 0.45,
      fontSize: 11, fontFace: "Arial", color: theme.primary, bold: true,
      align: "center", valign: "middle", margin: 0
    });
  });

  // Arrows down
  for (let i = 0; i < 5; i++) {
    const x = 0.5 + i * 1.85 + 0.825;
    slide.addShape(pres.shapes.LINE, {
      x: x, y: 2.45, w: 0, h: 0.4,
      line: { color: "94A3B8", width: 1.2, dashType: "dash", endArrowType: "triangle" }
    });
  }

  // AI Agents row
  slide.addText("SPECIALIST  AI  AGENTS", {
    x: 0.5, y: 2.95, w: 9, h: 0.25,
    fontSize: 9, fontFace: "Arial", bold: true, color: theme.secondary,
    charSpacing: 3, margin: 0
  });
  const agents = [
    { name: "Ingestion",  desc: "Normalize · tag" },
    { name: "Anomaly",    desc: "Detect · classify" },
    { name: "RAG",        desc: "SOPs · history" },
    { name: "Risk",       desc: "Score · prioritize" },
    { name: "Planner",    desc: "Actions · spares" }
  ];
  agents.forEach((a, i) => {
    const x = 0.5 + i * 1.85;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.25, w: 1.65, h: 0.85,
      fill: { color: "EFF6FF" }, line: { color: theme.accent, width: 1.2 },
      rectRadius: 0.08
    });
    slide.addText(a.name, {
      x: x, y: 3.3, w: 1.65, h: 0.35,
      fontSize: 13, fontFace: "Arial", bold: true, color: "1E3A8A",
      align: "center", margin: 0
    });
    slide.addText(a.desc, {
      x: x, y: 3.65, w: 1.65, h: 0.4,
      fontSize: 9, fontFace: "Arial", color: theme.secondary,
      align: "center", margin: 0
    });
  });
  // Arrows right
  for (let i = 0; i < 4; i++) {
    const x = 0.5 + i * 1.85 + 1.65;
    slide.addShape(pres.shapes.RIGHT_TRIANGLE, {
      x: x + 0.04, y: 3.6, w: 0.12, h: 0.16,
      fill: { color: theme.secondary }, line: { color: theme.secondary, width: 0 },
      rotate: 90
    });
  }

  // Output: Active Alert Surface
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.4, y: 4.4, w: 3.1, h: 0.9,
    fill: { color: "FEF2F2" }, line: { color: theme.critical, width: 1.5, dashType: "dash" },
    rectRadius: 0.08
  });
  slide.addText("ACTIVE ALERT SURFACE", {
    x: 6.4, y: 4.45, w: 3.1, h: 0.3,
    fontSize: 11, fontFace: "Arial", bold: true, color: theme.critical,
    align: "center", charSpacing: 2, margin: 0
  });
  slide.addText("Engineer-facing alerts with full evidence chain and AI diagnosis.", {
    x: 6.5, y: 4.75, w: 2.9, h: 0.5,
    fontSize: 9, fontFace: "Arial", color: "7F1D1D",
    align: "center", margin: 0
  });
  slide.addShape(pres.shapes.LINE, {
    x: 9.0, y: 4.1, w: -0.2, h: 0.3,
    line: { color: theme.critical, width: 1.5, dashType: "dash", endArrowType: "triangle" }
  });

  // Frontend callout (bottom-left)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.4, w: 5.5, h: 0.9,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addText("FRONTEND  DASHBOARD", {
    x: 0.7, y: 4.5, w: 5.1, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText("Command Center  /  Process Flow  /  AI Diagnosis  /  Maintenance Plan  /  Knowledge Base", {
    x: 0.7, y: 4.8, w: 5.1, h: 0.5,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // Legend
  const legendY = 5.42;
  const items = [
    { color: "FFFFFF", border: "CBD5E1", label: "Telemetry" },
    { color: "EFF6FF", border: theme.accent, label: "AI Agent" },
    { color: "FEF2F2", border: theme.critical, label: "Alert" }
  ];
  let lx = 0.5;
  items.forEach(it => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: lx, y: legendY, w: 0.15, h: 0.15,
      fill: { color: it.color }, line: { color: it.border, width: 1 },
      rectRadius: 0.02
    });
    slide.addText(it.label, {
      x: lx + 0.2, y: legendY - 0.04, w: 1.0, h: 0.25,
      fontSize: 9, fontFace: "Arial", color: theme.secondary, margin: 0
    });
    lx += 1.2;
  });

  slide.addText("03", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
