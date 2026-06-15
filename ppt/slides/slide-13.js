// Install, configure, and run
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("08  /  INSTALL  /  CONFIGURE  /  RUN", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Three commands and one optional env var.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText("Standard Node.js install. No database, no build step, no external runtime deps.", {
    x: 0.5, y: 1.25, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // Steps as numbered cards
  const steps = [
    { n: "01", title: "Install",     cmd: "npm install",          desc: "Installs only pptxgenjs (dev). Frontend ships as plain HTML/CSS/JS with no build step." },
    { n: "02", title: "Configure",   cmd: "MINIMAX_API_KEY=...",   desc: "Optional. Set in .env or your shell. Without it, the assistant falls back to local reasoning so the demo still works." },
    { n: "03", title: "Run",         cmd: "node server.js",        desc: "Starts the Node proxy on port 3000 and serves the dashboard. Open http://localhost:3000/." }
  ];
  const startX = 0.5, y = 1.7;
  const cardW = 9.0, cardH = 0.95, gap = 0.1;
  steps.forEach((s, i) => {
    const cy = y + i * (cardH + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: cy, w: cardW, h: cardH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.08
    });
    slide.addShape(pres.shapes.OVAL, {
      x: startX + 0.2, y: cy + 0.2, w: 0.55, h: 0.55,
      fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
    });
    slide.addText(s.n, {
      x: startX + 0.2, y: cy + 0.2, w: 0.55, h: 0.55,
      fontSize: 13, fontFace: "Arial", bold: true, color: "FFFFFF",
      align: "center", valign: "middle", margin: 0
    });
    slide.addText(s.title, {
      x: startX + 0.9, y: cy + 0.1, w: 2.0, h: 0.35,
      fontSize: 14, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
    });
    // Command in monospace pill
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX + 0.9, y: cy + 0.45, w: 2.4, h: 0.32,
      fill: { color: "0F172A" }, line: { color: "0F172A", width: 0 },
      rectRadius: 0.04
    });
    slide.addText(s.cmd, {
      x: startX + 0.9, y: cy + 0.45, w: 2.4, h: 0.32,
      fontSize: 10, fontFace: "Consolas", color: "10B981",
      align: "center", valign: "middle", margin: 0
    });
    slide.addText(s.desc, {
      x: startX + 3.5, y: cy + 0.15, w: cardW - 3.7, h: cardH - 0.3,
      fontSize: 10, fontFace: "Arial", color: theme.secondary, margin: 0
    });
  });

  // Bottom: file structure
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.7, w: 9.0, h: 0.55,
    fill: { color: theme.light }, line: { color: theme.accent, width: 1 },
    rectRadius: 0.04
  });
  slide.addText("Files: server.js  -  app.js  -  styles.css  -  index.html  -  data/app-data.js  -  .env", {
    x: 0.7, y: 4.74, w: 8.6, h: 0.5,
    fontSize: 10, fontFace: "Consolas", color: theme.accent, valign: "middle", margin: 0
  });
  slide.addText("13", {
    x: 9.3, y: 5.35, w: 0.5, h: 0.25,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
