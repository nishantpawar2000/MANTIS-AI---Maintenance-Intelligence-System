// Demo: Command Center + Architecture
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("DEMO  /  COMMAND  CENTER  +  ARCHITECTURE", {
    x: 0.5, y: 0.18, w: 9, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("One screen for the whole plant.  One diagram for the whole pipeline.", {
    x: 0.5, y: 0.46, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Left: Command Center
  slide.addImage({
    path: theme.img.cmdCenter,
    x: 0.3, y: 0.95, w: 4.85, h: 2.73
  });
  slide.addText("Command Center  -  KPIs, risk landscape, anomaly matrix", {
    x: 0.3, y: 3.72, w: 4.85, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  // Right: Architecture
  slide.addImage({
    path: theme.img.architecture,
    x: 5.2, y: 0.95, w: 4.5, h: 2.73
  });
  slide.addText("MANTIS Agentic Architecture  -  sources, agents, alerts", {
    x: 5.2, y: 3.72, w: 4.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  // Bottom: 3 callouts
  const callouts = [
    { x: 0.3,  text: "Live KPI bar: OEE, anomalies, predicted failures, confidence" },
    { x: 3.55, text: "5-agent pipeline visualised end-to-end with clickable alert zone" },
    { x: 6.8,  text: "Each card in the right zone opens full alert detail with AI diagnosis" }
  ];
  callouts.forEach(c => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 4.18, w: 0.04, h: 0.6,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
    });
    slide.addText(c.text, {
      x: c.x + 0.1, y: 4.16, w: 3.05, h: 0.65,
      fontSize: 9, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  slide.addText("08", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
