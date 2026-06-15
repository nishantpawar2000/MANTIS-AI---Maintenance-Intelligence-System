// Closing / Thank You
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.accent };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.2, h: 5.625,
    fill: { color: "FCD34D" }, line: { color: "FCD34D", width: 0 }
  });

  slide.addText("THANK  YOU", {
    x: 0.7, y: 1.0, w: 8.6, h: 0.4,
    fontSize: 12, fontFace: "Arial", color: "FCD34D", bold: true,
    charSpacing: 6, margin: 0
  });
  slide.addText("MANTIS AI", {
    x: 0.7, y: 1.4, w: 8.6, h: 1.1,
    fontSize: 64, fontFace: "Arial", bold: true, color: "FFFFFF", margin: 0
  });
  slide.addText("From sensor signal to engineer action in one traceable chain.", {
    x: 0.7, y: 2.55, w: 8.6, h: 0.5,
    fontSize: 18, fontFace: "Arial", italic: true, color: "BFDBFE", margin: 0
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.3, w: 1.5, h: 0.04,
    fill: { color: "FCD34D" }, line: { color: "FCD34D", width: 0 }
  });

  slide.addText([
    { text: "An agentic pipeline, not a single LLM shortcut.", options: { bullet: true, breakLine: true, color: "FFFFFF", fontSize: 13 } },
    { text: "Every recommendation traceable to a model signal and an SOP.", options: { bullet: true, breakLine: true, color: "FFFFFF", fontSize: 13 } },
    { text: "Built lean: single Node process, zero external dependencies for the demo.", options: { bullet: true, color: "FFFFFF", fontSize: 13 } }
  ], {
    x: 0.7, y: 3.5, w: 8.6, h: 1.3,
    fontFace: "Arial", margin: 0, paraSpaceAfter: 4
  });

  slide.addText("Tata Steel AI Hackathon  |  Individual Submission  |  June 2026", {
    x: 0.7, y: 5.05, w: 6.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: "93C5FD", charSpacing: 2, margin: 0
  });
  slide.addText("15", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: "BFDBFE", align: "right", margin: 0
  });
}

module.exports = { createSlide };
