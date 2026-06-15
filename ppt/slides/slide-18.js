// Why MANTIS Wins -- differentiators
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });

  slide.addText("09  /  DIFFERENTIATORS", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });

  slide.addText("Why MANTIS wins over a single-LLM chatbot.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // Comparison: 4 rows
  const rows = [
    { dim: "Reasoning",  them: "Single LLM shortcut",          us: "Specialised agents collaborate" },
    { dim: "Evidence",   them: "No source citations",          us: "SOPs, work orders, model signals cited" },
    { dim: "Action",     them: "Chat reply, no follow-through", us: "Risk-scored action plan with ETA" },
    { dim: "Trust",      them: "Hallucinations possible",       us: "Engineer feedback loop, model retraining" }
  ];

  const startX = 0.5, y = 1.55;
  const rowW = 9.0, rowH = 0.78, gap = 0.1;
  // Header row
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: y - 0.55, w: rowW, h: 0.4,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 },
    rectRadius: 0.05
  });
  slide.addText("Dimension", {
    x: startX + 0.2, y: y - 0.55, w: 2.0, h: 0.4,
    fontSize: 11, fontFace: "Arial", bold: true, color: "FFFFFF",
    valign: "middle", margin: 0, charSpacing: 1
  });
  slide.addText("Generic AI approach", {
    x: startX + 2.4, y: y - 0.55, w: 3.2, h: 0.4,
    fontSize: 11, fontFace: "Arial", bold: true, color: "FFFFFF",
    valign: "middle", margin: 0, charSpacing: 1
  });
  slide.addText("MANTIS AI", {
    x: startX + 5.8, y: y - 0.55, w: 3.0, h: 0.4,
    fontSize: 11, fontFace: "Arial", bold: true, color: "FFFFFF",
    valign: "middle", margin: 0, charSpacing: 1
  });

  rows.forEach((r, i) => {
    const ry = y + i * (rowH + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: ry, w: rowW, h: rowH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.05
    });
    // Dim
    slide.addText(r.dim, {
      x: startX + 0.2, y: ry, w: 2.0, h: rowH,
      fontSize: 12, fontFace: "Arial", bold: true, color: theme.primary,
      valign: "middle", margin: 0
    });
    // Them
    slide.addShape(pres.shapes.LINE, {
      x: startX + 2.4, y: ry + 0.15, w: 0, h: rowH - 0.3,
      line: { color: "E2E8F0", width: 1 }
    });
    slide.addText(r.them, {
      x: startX + 2.55, y: ry, w: 3.1, h: rowH,
      fontSize: 11, fontFace: "Arial", color: "94A3B8",
      valign: "middle", margin: 0
    });
    // Us
    slide.addShape(pres.shapes.LINE, {
      x: startX + 5.8, y: ry + 0.15, w: 0, h: rowH - 0.3,
      line: { color: "E2E8F0", width: 1 }
    });
    slide.addText(r.us, {
      x: startX + 5.95, y: ry, w: 2.95, h: rowH,
      fontSize: 11, fontFace: "Arial", bold: true, color: theme.accent,
      valign: "middle", margin: 0
    });
  });

  slide.addText("18", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
