// Demo: AI Assistant + Maintenance Plan + Knowledge Base
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("DEMO  /  AI  ASSISTANT  +  PLAN  +  KNOWLEDGE  BASE", {
    x: 0.5, y: 0.18, w: 9, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Ask in plain English.  Rank the work.  Capture the evidence.  Close the loop.", {
    x: 0.5, y: 0.46, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Three screenshots side by side
  slide.addImage({
    path: theme.img.diagnosis,
    x: 0.3, y: 0.95, w: 3.13, h: 2.95
  });
  slide.addText("AI Diagnosis  -  chat + root cause", {
    x: 0.3, y: 3.92, w: 3.13, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  slide.addImage({
    path: theme.img.plan,
    x: 3.53, y: 0.95, w: 3.13, h: 2.95
  });
  slide.addText("Maintenance Plan  -  ranked queue", {
    x: 3.53, y: 3.92, w: 3.13, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  slide.addImage({
    path: theme.img.knowledge,
    x: 6.76, y: 0.95, w: 2.94, h: 2.95
  });
  slide.addText("Knowledge Base  -  evidence + feedback", {
    x: 6.76, y: 3.92, w: 2.94, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    align: "center", margin: 0
  });

  // Bottom: 3 callouts
  const callouts = [
    { x: 0.3,  text: "Natural-language queries on live asset context" },
    { x: 3.53, text: "Optimise Plan button - reorder by risk + ETA" },
    { x: 6.76, text: "Engineer feedback updates retrieval + thresholds" }
  ];
  callouts.forEach(c => {
    slide.addText(c.text, {
      x: c.x, y: 4.4, w: 3.0, h: 0.55,
      fontSize: 9, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  slide.addText("11", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
