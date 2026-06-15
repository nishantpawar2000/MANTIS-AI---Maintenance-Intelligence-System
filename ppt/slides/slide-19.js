// Future Roadmap
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });

  slide.addText("10  /  FUTURE ROADMAP", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });

  slide.addText("Where MANTIS goes next.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // 4 timeline milestones
  const milestones = [
    { q: "Q3 2026",  t: "Advisory deployment",   d: "PI historian, CMMS, and alarm-system integrations. Read-only recommendations on 5 critical assets at Jamshedpur." },
    { q: "Q4 2026",  t: "Asset-specific models",  d: "Specialised predictive models for Caster, Blast Furnace, Rolling Mill, blowers, pumps, and gearboxes." },
    { q: "Q1 2027",  t: "Approval workflows",     d: "Engineer-in-the-loop approval gates before any automated work-order creation." },
    { q: "Q2 2027",  t: "Cross-plant scale-out",  d: "Reusable agent pattern rolled to Kalinganakar, IJmuiden, and downstream utilities." }
  ];

  const startX = 0.5, y = 1.6;
  const cardW = 2.25, cardH = 3.0, gap = 0.1;
  milestones.forEach((m, i) => {
    const x = startX + i * (cardW + gap);
    // Card
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.1
    });
    // Quarter chip
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.2, y: y + 0.2, w: 1.3, h: 0.35,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 },
      rectRadius: 0.04
    });
    slide.addText(m.q, {
      x: x + 0.2, y: y + 0.2, w: 1.3, h: 0.35,
      fontSize: 10, fontFace: "Arial", bold: true, color: "FFFFFF",
      align: "center", valign: "middle", margin: 0
    });
    // Title
    slide.addText(m.t, {
      x: x + 0.2, y: y + 0.7, w: cardW - 0.4, h: 0.6,
      fontSize: 15, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
    });
    // Body
    slide.addText(m.d, {
      x: x + 0.2, y: y + 1.45, w: cardW - 0.4, h: cardH - 1.55,
      fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  // Closing line
  slide.addText("Every step preserves the traceable evidence chain and the engineer-in-the-loop guarantee.", {
    x: 0.5, y: 4.85, w: 9.0, h: 0.3,
    fontSize: 11, fontFace: "Arial", italic: true, color: theme.accent, bold: true, margin: 0
  });

  slide.addText("19", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
