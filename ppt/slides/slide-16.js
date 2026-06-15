// Real-World Deployment Path
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });

  slide.addText("07  /  DEPLOYMENT PATH", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });

  slide.addText("Advisory first, autonomy later.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText("Five phases designed to build engineer trust before any automated action.", {
    x: 0.5, y: 1.25, w: 9, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // 5 phases as horizontal timeline
  const phases = [
    { n: "01", t: "Advisory",        d: "Read-only recommendations, no work-order writes." },
    { n: "02", t: "Integrate",       d: "PI historian, CMMS, alarm systems, document repository." },
    { n: "03", t: "Validate",        d: "Engineer feedback loop on every recommendation." },
    { n: "04", t: "Automate",        d: "Approved actions become CMMS work orders." },
    { n: "05", t: "Scale",           d: "Add Caster, BF, Rolling Mill, utilities -- same agents." }
  ];

  const startX = 0.5, y = 1.85;
  const cardW = 1.78, cardH = 1.95, gap = 0.07;
  phases.forEach((p, i) => {
    const x = startX + i * (cardW + gap);
    // Number circle
    slide.addShape(pres.shapes.OVAL, {
      x: x + (cardW - 0.55) / 2, y: y, w: 0.55, h: 0.55,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
    });
    slide.addText(p.n, {
      x: x + (cardW - 0.55) / 2, y: y, w: 0.55, h: 0.55,
      fontSize: 13, fontFace: "Arial", bold: true, color: "FFFFFF",
      align: "center", valign: "middle", margin: 0
    });
    // Title
    slide.addText(p.t, {
      x: x, y: y + 0.65, w: cardW, h: 0.4,
      fontSize: 14, fontFace: "Arial", bold: true, color: theme.primary,
      align: "center", margin: 0
    });
    // Body
    slide.addText(p.d, {
      x: x + 0.1, y: y + 1.05, w: cardW - 0.2, h: 0.85,
      fontSize: 10, fontFace: "Arial", color: theme.secondary,
      align: "center", margin: 0
    });
    // Connector arrow
    if (i < phases.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: x + cardW, y: y + 0.275, w: gap, h: 0,
        line: { color: theme.accent, width: 2, endArrowType: "triangle" }
      });
    }
  });

  // Bottom callout
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.2, w: 9.0, h: 0.85,
    fill: { color: theme.light }, line: { color: theme.accent, width: 1 },
    rectRadius: 0.08
  });
  slide.addText("Every recommendation stays traceable to a model signal and an SOP -- at every phase.", {
    x: 0.7, y: 4.3, w: 8.6, h: 0.35,
    fontSize: 13, fontFace: "Arial", bold: true, color: theme.accent, margin: 0
  });
  slide.addText("Engineers stay in the loop until trust is proven. The same agent pattern ships to every new asset family.", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.35,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  slide.addText("16", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
