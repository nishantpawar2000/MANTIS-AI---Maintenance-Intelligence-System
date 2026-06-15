// Cover slide
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Left dark panel
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 4.0, h: 5.625,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  // Accent strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.critical }, line: { color: theme.critical, width: 0 }
  });

  // Logo mark
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 0.5, w: 0.6, h: 0.6,
    fill: { color: "FFFFFF" }, line: { color: "FFFFFF", width: 0 },
    rectRadius: 0.08
  });
  slide.addText("M", {
    x: 0.6, y: 0.5, w: 0.6, h: 0.6,
    fontSize: 24, fontFace: "Arial", bold: true, color: theme.accent,
    align: "center", valign: "middle", margin: 0
  });
  slide.addText("MANTIS AI", {
    x: 1.35, y: 0.5, w: 2.5, h: 0.6,
    fontSize: 22, fontFace: "Arial", bold: true, color: "FFFFFF",
    valign: "middle", margin: 0
  });

  // Eyebrow
  slide.addText("TATA STEEL AI HACKATHON  /  JUNE 2026", {
    x: 0.6, y: 1.7, w: 3.2, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: "FCD34D", bold: true,
    charSpacing: 3, margin: 0
  });
  // Title
  slide.addText("Maintenance Wizard", {
    x: 0.6, y: 2.05, w: 3.3, h: 0.7,
    fontSize: 34, fontFace: "Arial", bold: true, color: "FFFFFF", margin: 0
  });
  slide.addText("for Industrial Equipment", {
    x: 0.6, y: 2.75, w: 3.3, h: 0.5,
    fontSize: 20, fontFace: "Arial", color: "BFDBFE", italic: true, margin: 0
  });
  slide.addText("Agentic AI decision support for steel manufacturing maintenance.", {
    x: 0.6, y: 3.35, w: 3.3, h: 0.65,
    fontSize: 12, fontFace: "Arial", color: "DBEAFE", margin: 0
  });

  // Footer
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.85, w: 3.2, h: 0.04,
    fill: { color: "FCD34D" }, line: { color: "FCD34D", width: 0 }
  });
  slide.addText("Individual submission  |  HackerEarth x Tata Steel", {
    x: 0.6, y: 4.93, w: 3.2, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: "DBEAFE", margin: 0
  });
  slide.addText("MANTIS = Multi-Agent Network for Telemetry, Inspection & Service", {
    x: 0.6, y: 5.20, w: 3.2, h: 0.3,
    fontSize: 9, fontFace: "Arial", color: "93C5FD", italic: true, margin: 0
  });

  // Right side stat card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.7, y: 0.7, w: 4.8, h: 4.2,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.12
  });
  slide.addText("The 18%", {
    x: 4.9, y: 0.95, w: 4.4, h: 0.7,
    fontSize: 56, fontFace: "Arial", bold: true, color: theme.accent, margin: 0
  });
  slide.addText("of unplanned downtime", {
    x: 4.9, y: 1.75, w: 4.4, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: theme.secondary, margin: 0
  });
  slide.addText("we can help Tata Steel avoid.", {
    x: 4.9, y: 2.1, w: 4.4, h: 0.4,
    fontSize: 16, fontFace: "Arial", color: theme.secondary, margin: 0
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.9, y: 2.7, w: 4.4, h: 0.02,
    fill: { color: "E2E8F0" }, line: { color: "E2E8F0", width: 0 }
  });
  const stats = [
    { num: "42h",   label: "Predictive Horizon" },
    { num: "91%",   label: "Model Confidence" },
    { num: "5 AI",  label: "Specialist Agents" }
  ];
  stats.forEach((s, i) => {
    const xPos = 4.9 + i * 1.5;
    slide.addText(s.num, {
      x: xPos, y: 2.9, w: 1.4, h: 0.55,
      fontSize: 28, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
    });
    slide.addText(s.label, {
      x: xPos, y: 3.5, w: 1.4, h: 0.5,
      fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0,
      charSpacing: 1
    });
  });
  slide.addText("MANTIS = Multi-Agent Network for Telemetry, Inspection & Service", {
    x: 4.9, y: 4.2, w: 4.4, h: 0.35,
    fontSize: 11, fontFace: "Arial", italic: true, color: theme.accent, margin: 0
  });
  slide.addText("Built for Caster, Blast Furnace, and Cold Rolling Mill operations.", {
    x: 4.9, y: 4.5, w: 4.4, h: 0.35,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });
}

module.exports = { createSlide };
