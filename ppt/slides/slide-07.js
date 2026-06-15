// Alerting & Prediction Logic
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.critical }, line: { color: theme.critical, width: 0 }
  });
  slide.addText("06  /  ALERTING  &  PREDICTION  LOGIC", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.critical, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Three priority bands, one consistent evidence requirement.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // 3 priority cards
  const prio = [
    { tag: "P1", label: "CRITICAL",  window: "ETA  =  next shift",   d: "Imminent failure likely within 30-42 hours. Vibration / thermal breach. Action required immediately.", color: theme.critical },
    { tag: "P2", label: "HIGH",      window: "ETA  =  24 hrs",        d: "Degradation trend rising. Quality deviation possible. Plan and execute within a day.",                  color: "D97706" },
    { tag: "P3", label: "WATCH",     window: "ETA  =  72 hrs",        d: "Recurring warning alarms or threshold drift. Inspect during normal maintenance window.",              color: "0EA5E9" }
  ];
  const startX = 0.5, y = 1.4;
  const cardW = 3.0, cardH = 1.95, gap = 0.1;
  prio.forEach((p, i) => {
    const x = startX + i * (cardW + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.1
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: 0.5,
      fill: { color: p.color }, line: { color: p.color, width: 0 },
      rectRadius: 0.1
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y + 0.42, w: cardW, h: 0.08,
      fill: { color: p.color }, line: { color: p.color, width: 0 }
    });
    slide.addText(p.tag + "  " + p.label, {
      x: x + 0.2, y: y, w: cardW - 0.4, h: 0.5,
      fontSize: 13, fontFace: "Arial", bold: true, color: "FFFFFF",
      valign: "middle", charSpacing: 2, margin: 0
    });
    slide.addText(p.window, {
      x: x + 0.2, y: y + 0.6, w: cardW - 0.4, h: 0.3,
      fontSize: 10, fontFace: "Arial", bold: true, color: p.color, margin: 0
    });
    slide.addText(p.d, {
      x: x + 0.2, y: y + 0.95, w: cardW - 0.4, h: cardH - 1.05,
      fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  // Prediction logic - left
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.5, w: 4.4, h: 1.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addText("PREDICTION  TRIGGERS", {
    x: 0.7, y: 3.6, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText([
    { text: "Predictive horizon: 42 hours for vibration + thermal + lube drift.", options: { bullet: true, breakLine: true } },
    { text: "Rolling 6-hour trend crossing +3 sigma on two correlated parameters.", options: { bullet: true, breakLine: true } },
    { text: "Three matching historical work orders within the same signature.", options: { bullet: true } }
  ], {
    x: 0.85, y: 3.95, w: 4.0, h: 1.15,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  // Suppression - right
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 3.5, w: 4.4, h: 1.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
    rectRadius: 0.08
  });
  slide.addText("DE-NOISING  &  ESCALATION", {
    x: 5.3, y: 3.6, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: theme.accent,
    charSpacing: 2, margin: 0
  });
  slide.addText([
    { text: "Alarm-burst detector groups duplicate alarms into one alert.", options: { bullet: true, breakLine: true } },
    { text: "Confidence below threshold -> downgrade to P3 / suppress.", options: { bullet: true, breakLine: true } },
    { text: "Engineer feedback updates thresholds and dedup rules in real time.", options: { bullet: true } }
  ], {
    x: 5.45, y: 3.95, w: 4.0, h: 1.15,
    fontSize: 10, fontFace: "Arial", color: theme.secondary, paraSpaceAfter: 3, margin: 0
  });

  slide.addText("07", {
    x: 9.3, y: 5.45, w: 0.5, h: 0.18,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
