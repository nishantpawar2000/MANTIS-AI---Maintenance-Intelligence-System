// Demo: Process Flow + Anomaly Signatures
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("DEMO  /  PROCESS  FLOW  +  ANOMALY  SIGNATURES", {
    x: 0.5, y: 0.18, w: 9, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Live process schematic, clickable alert bar chart, and explainable anomaly cards.", {
    x: 0.5, y: 0.46, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Left: Process flow
  slide.addImage({
    path: theme.img.crmFlow,
    x: 0.3, y: 0.95, w: 4.85, h: 2.73
  });
  slide.addText("CRM Process Flow  -  schematic, parameters, Active Alert Counts", {
    x: 0.3, y: 3.72, w: 4.85, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  // Right: Anomaly signatures
  slide.addImage({
    path: theme.img.anomaly,
    x: 5.2, y: 0.95, w: 4.5, h: 2.73
  });
  slide.addText("Critical Anomaly Signatures  -  clickable cards, severity badges", {
    x: 5.2, y: 3.72, w: 4.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  // Bottom: 3 callouts
  const callouts = [
    { x: 0.3,  text: "Active Alert Counts bars are clickable - open alert detail" },
    { x: 3.55, text: "P1 / P2 / P3 priority is shown on every anomaly card" },
    { x: 6.8,  text: "Consult Agent button runs LLM diagnosis per anomaly" }
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

  slide.addText("09", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
