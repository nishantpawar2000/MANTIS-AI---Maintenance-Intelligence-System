// Demo: Alert Detail + AI Diagnosis
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.critical }, line: { color: theme.critical, width: 0 }
  });
  slide.addText("DEMO  /  ALERT  DETAIL  +  AI  DIAGNOSIS", {
    x: 0.5, y: 0.18, w: 9, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.critical, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Click any alert - see the full evidence chain in one view.", {
    x: 0.5, y: 0.46, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  slide.addImage({
    path: theme.img.alertAi,
    x: 0.5, y: 0.95, w: 9.0, h: 3.5
  });

  // Bottom bar with key data fields
  const fields = [
    { x: 0.5,  label: "Detected: 13:38 IST" },
    { x: 2.35, label: "Raised: 13:42 IST" },
    { x: 4.2,  label: "Location: F2 Stand" },
    { x: 6.05, label: "Confidence: 89%" },
    { x: 7.9,  label: "ETA: Next shift" }
  ];
  fields.forEach(f => {
    slide.addText(f.label, {
      x: f.x, y: 4.6, w: 1.85, h: 0.3,
      fontSize: 9, fontFace: "Arial", color: theme.accent, bold: true, margin: 0
    });
  });

  // Bottom callouts
  const callouts = [
    { x: 0.5, text: "Root cause hypotheses with confidence meters" },
    { x: 3.55, text: "Evidence: SOPs, manuals, prior work orders" },
    { x: 6.8, text: "Action plan with P1 / P2 / P3 priority" }
  ];
  callouts.forEach(c => {
    slide.addText(c.text, {
      x: c.x, y: 4.95, w: 3.0, h: 0.3,
      fontSize: 9, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  slide.addText("10", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
