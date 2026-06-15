// Sample Input and Output Demonstration
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("07  /  SAMPLE  INPUT  &  OUTPUT  DEMONSTRATION", {
    x: 0.5, y: 0.18, w: 9, h: 0.3,
    fontSize: 10, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Real question. Real evidence. Real action plan.", {
    x: 0.5, y: 0.46, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });

  // INPUT
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.95, w: 9.2, h: 1.4,
    fill: { color: "0F172A" }, line: { color: "0F172A", width: 0 },
    rectRadius: 0.08
  });
  slide.addText("INPUT  /  Engineer Query", {
    x: 0.6, y: 1.05, w: 4.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", bold: true, color: "FCD34D",
    charSpacing: 2, margin: 0
  });
  slide.addText("Why is Hydraulic AGC System Line 1 at critical risk?", {
    x: 0.6, y: 1.35, w: 8.8, h: 0.5,
    fontSize: 17, fontFace: "Arial", italic: true, color: "FFFFFF", margin: 0
  });
  slide.addText("Context: CRM asset, 30 h RUL, health 77%, status CRITICAL", {
    x: 0.6, y: 1.85, w: 8.8, h: 0.4,
    fontSize: 10, fontFace: "Arial", color: "94A3B8", margin: 0
  });

  // OUTPUT - 3 columns: Diagnosis, Evidence, Action
  const cols = [
    {
      title: "DIAGNOSIS",
      lines: [
        "Leading root cause:",
        "AGC servo valve response lag (89% confidence).",
        "",
        "Hypothesis 2:",
        "Contaminated hydraulic oil filter (76%).",
        "",
        "Hypothesis 3:",
        "Scanner calibration drift (71%)."
      ]
    },
    {
      title: "EVIDENCE  CHAIN",
      lines: [
        "SOP CRM-AGC-07:",
        "Check servo + filter when pressure ripple affects thickness.",
        "",
        "Manual - Thickness Gauge Scanner:",
        "Recalibrate after repeated deviation vs offline sample.",
        "",
        "Work Order CRM-33108:",
        "Pressure ripple caused reject coils when maintenance was delayed past 1 shift."
      ]
    },
    {
      title: "RECOMMENDED  ACTION",
      lines: [
        "P1 - Hydraulic AGC System / Line 1",
        "Check servo valve response, replace clogged filter, validate pressure sensor.",
        "ETA: Next shift",
        "",
        "P2 - Thickness Gauge Scanner / Line 2",
        "Run calibration block check, compare with offline sample.",
        "ETA: 24 hrs"
      ]
    }
  ];

  const startX = 0.4, y = 2.5;
  const colW = 3.0, colH = 2.7, gap = 0.1;
  cols.forEach((c, i) => {
    const x = startX + i * (colW + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: colW, h: colH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.08
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: colW, h: 0.4,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 },
      rectRadius: 0.08
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y + 0.32, w: colW, h: 0.08,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
    });
    slide.addText(c.title, {
      x: x + 0.15, y: y, w: colW - 0.3, h: 0.4,
      fontSize: 10, fontFace: "Arial", bold: true, color: "FFFFFF",
      valign: "middle", charSpacing: 2, margin: 0
    });
    slide.addText(c.lines.join("\n"), {
      x: x + 0.15, y: y + 0.5, w: colW - 0.3, h: colH - 0.6,
      fontSize: 9, fontFace: "Arial", color: theme.secondary, margin: 0,
      paraSpaceAfter: 1
    });
  });

  slide.addText("Confidence: 89%  |  Failure probability (24h): 47-54%  |  Time to action: Next shift", {
    x: 0.4, y: 5.25, w: 9.2, h: 0.3,
    fontSize: 10, fontFace: "Arial", italic: true, bold: true, color: theme.accent, margin: 0
  });
  slide.addText("12", {
    x: 9.3, y: 5.55, w: 0.5, h: 0.07,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
