// Technology Stack
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }, line: { color: theme.accent, width: 0 }
  });
  slide.addText("03  /  TECHNOLOGY  STACK", {
    x: 0.5, y: 0.35, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.accent, bold: true,
    charSpacing: 4, margin: 0
  });
  slide.addText("Lean, dependency-light, runs anywhere in your network.", {
    x: 0.5, y: 0.7, w: 9, h: 0.5,
    fontSize: 22, fontFace: "Arial", bold: true, color: theme.primary, margin: 0
  });
  slide.addText("Zero external runtime dependencies for the demo. Single Node process. No database. No vendor lock-in.", {
    x: 0.5, y: 1.25, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Arial", color: theme.secondary, margin: 0
  });

  // 4 layers
  const layers = [
    { name: "Frontend",            items: "Vanilla HTML / CSS / JS  -  dependency-free dashboard  -  Inline SVG architecture diagram",  color: theme.accent },
    { name: "Orchestration",       items: "Node.js proxy  -  LangGraph-style agent graph  -  Multi-Agent RAG retrieval",      color: "1E40AF" },
    { name: "AI / Models",         items: "MiniMax M3 LLM endpoint (env var)  -  Local fallback reasoning for offline demo",  color: "0EA5E9" },
    { name: "Plant systems",       items: "PI Historian  -  SCADA alarms  -  CMMS  -  SOPs / manuals  -  Work orders",     color: "475569" }
  ];
  const startX = 0.5, y = 1.75;
  const layerW = 9.0, layerH = 0.78, gap = 0.08;
  layers.forEach((l, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: y + i * (layerH + gap), w: layerW, h: layerH,
      fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.06
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX, y: y + i * (layerH + gap), w: 2.0, h: layerH,
      fill: { color: l.color }, line: { color: l.color, width: 0 },
      rectRadius: 0.06
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX + 1.95, y: y + i * (layerH + gap), w: 0.05, h: layerH,
      fill: { color: l.color }, line: { color: l.color, width: 0 }
    });
    slide.addText(l.name, {
      x: startX, y: y + i * (layerH + gap), w: 2.0, h: layerH,
      fontSize: 12, fontFace: "Arial", bold: true, color: "FFFFFF",
      align: "center", valign: "middle", margin: 0
    });
    slide.addText(l.items, {
      x: startX + 2.2, y: y + i * (layerH + gap), w: layerW - 2.4, h: layerH,
      fontSize: 11, fontFace: "Arial", color: theme.secondary,
      valign: "middle", margin: 0
    });
  });
  slide.addText("All five AI agents run in a single process. The frontend remains responsive even when the LLM is unreachable.", {
    x: 0.5, y: 5.18, w: 9.0, h: 0.3,
    fontSize: 10, fontFace: "Arial", italic: true, color: theme.accent, margin: 0
  });
  slide.addText("04", {
    x: 9.3, y: 5.45, w: 0.5, h: 0.18,
    fontSize: 9, fontFace: "Arial", color: theme.secondary, align: "right", margin: 0
  });
}

module.exports = { createSlide };
