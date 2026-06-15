window.maintenanceData = {
  assets: {
    caster: {
      label: "Caster",
      line: "Caster | Roll & strand health",
      group: "Continuous casting asset group",
      healthTitle: "Caster Equipment Risk Landscape",
      healthSubtitle: "Predictive RUL, health scores, and 7-day trend for all casting subsystems.",
      strands: ["Strand 1", "Strand 2"],
      parameters: ["All parameters", "Temperature", "Vibration", "Lubrication", "Cooling Flow"],
      kpis: { oee: 74.2, anomalies: 9, predictions: 2, confidence: 91 },
      riskRows: [
        { name: "Roll Bearing Assembly", nodeId: "RB-AS-02", health: 62, rul: 42, status: "critical", trend: "down", sparkData: [80,78,75,72,68,65,62] },
        { name: "Secondary Cooling Zone", nodeId: "SC-Z2-05", health: 78, rul: 61, status: "warn", trend: "down", sparkData: [85,84,83,81,80,79,78] },
        { name: "Mold Oscillator", nodeId: "MO-S1-01", health: 84, rul: 88, status: "warn", trend: "flat", sparkData: [82,84,85,83,84,84,84] },
        { name: "Withdrawal Roll Drive", nodeId: "WR-D1-03", health: 91, rul: 112, status: "ok", trend: "up", sparkData: [88,89,90,90,91,91,91] }
      ],
      timeline: [
        { when: "In 4h", label: "Roll Bearing RUL entering critical zone", desc: "Bearing temp +11°C, vibration RMS above baseline", severity: "critical" },
        { when: "In 12h", label: "Lubrication cycle overdue — Strand 2", desc: "Schedule immediate lube inspection per SOP CASTER-LUBE-04", severity: "warn" },
        { when: "In 24h", label: "Secondary Cooling nozzle check required", desc: "Cooling flow drift persisting above SOP band", severity: "warn" },
        { when: "In 48h", label: "Mold Oscillator sensor audit", desc: "Thermal alarm burst recurring — 2× this shift", severity: "warn" },
        { when: "In 72h", label: "Planned roll replacement — Strand 1", desc: "Scheduled per preventive maintenance plan", severity: "ok" }
      ],
      alarms: [
        { label: "Mold", strand: "Strand 1", parameter: "Temperature", open: 11, closed: 1 },
        { label: "Drive", strand: "Strand 1", parameter: "Vibration", open: 9, closed: 1 },
        { label: "Cool", strand: "Strand 2", parameter: "Cooling Flow", open: 10, closed: 1 },
        { label: "Lube", strand: "Strand 2", parameter: "Lubrication", open: 6, closed: 1 },
        { label: "Bear", strand: "Strand 2", parameter: "Vibration", open: 7, closed: 1 },
        { label: "Nozzle", strand: "Strand 1", parameter: "Cooling Flow", open: 7, closed: 1 },
        { label: "Temp", strand: "Strand 1", parameter: "Temperature", open: 5, closed: 1 },
        { label: "Roll", strand: "Strand 2", parameter: "Vibration", open: 7, closed: 1 },
        { label: "PLC", strand: "Strand 1", parameter: "Temperature", open: 7, closed: 1 },
        { label: "Flow", strand: "Strand 2", parameter: "Cooling Flow", open: 7, closed: 1 }
      ],
      alerts: [
        { label: "OPEN", title: "Roll Bearing Assembly / Strand 2", meta: "Failure probability 50.9% | confidence 91%", risk: "P1",
          anomaly: "Vibration RMS 40% above baseline, bearing temperature +11°C, lubrication pressure -18%",
          hint: "Inspect bearing assembly, validate lube flow, prepare spare roll. Likely bearing cage wear." },
        { label: "OPEN", title: "Secondary Cooling Zone / Strand 2", meta: "Cooling flow drift above SOP band for 23 minutes", risk: "P2",
          anomaly: "Cooling flow deficit 12%, nozzle blockage suspected",
          hint: "Clean cooling nozzle array, recalibrate PLC threshold, verify flow transmitter." },
        { label: "WATCH", title: "Mold Oscillator / Strand 1", meta: "Thermal alarm burst repeated twice this shift", risk: "P3",
          anomaly: "Intermittent thermal spikes on oscillator drive motor",
          hint: "Check thermal sensor mounting, review oscillation frequency log for resonance." }
      ],
      rootCauses: [
        { cause: "Restricted lubrication flow to roll bearing", confidence: 91, evidence: "Lube pressure down 18%, bearing temperature up 11 C, vibration RMS above baseline." },
        { cause: "Bearing cage wear under high casting speed", confidence: 84, evidence: "Three historical work orders match the same vibration signature before roll jam." },
        { cause: "Coolant ingress into segment assembly", confidence: 68, evidence: "Manual notes this as a secondary cause when temperature and vibration breach together." }
      ],
      evidence: [
        { title: "SOP CASTER-LUBE-04", text: "Roll bearing inspection is required when vibration and temperature thresholds breach together for more than 15 minutes." },
        { title: "Manual: Roll Bearing Assembly", text: "Common root causes include blocked lubricant path, bearing cage wear, and coolant ingress." },
        { title: "Historical Work Order WO-21984", text: "A similar pattern caused a strand stoppage after 51 hours without intervention." }
      ],
      plan: [
        { priority: "P1", asset: "Roll Bearing Assembly / Strand 2", risk: "Critical failure likely in 42 hrs", recommendation: "Inspect bearing, validate lubrication flow, prepare spare roll.", eta: "Next shift" },
        { priority: "P2", asset: "Secondary Cooling Zone / Strand 2", risk: "Thermal trend rising", recommendation: "Clean cooling nozzle and confirm PLC threshold calibration.", eta: "24 hrs" },
        { priority: "P3", asset: "Mold Oscillator / Strand 1", risk: "Recurring warning alarms", recommendation: "Review thermal sensor mounting and close duplicate alarms.", eta: "72 hrs" }
      ],
      assistantQuestion: "Why is Roll Bearing Assembly Strand 2 at critical risk?",
      assistantSummary: "Roll Bearing Assembly / Strand 2 shows a critical health dip. I found rising vibration, high bearing temperature, and three similar failures in historical records. Recommended action: inspect lubrication and roll bearing assembly within the next shift."
    },
    bf: {
      label: "BF",
      line: "Blast Furnace | Utilities & burden flow",
      group: "Ironmaking asset group",
      healthTitle: "Blast Furnace Risk Landscape",
      healthSubtitle: "Predictive RUL and health monitoring for blowers, stoves, and cooling systems.",
      strands: ["Furnace A", "Furnace B"],
      parameters: ["All parameters", "Pressure", "Temperature", "Vibration", "Cooling Flow"],
      kpis: { oee: 71.8, anomalies: 11, predictions: 2, confidence: 88 },
      riskRows: [
        { name: "Hot Blast Blower B", nodeId: "HB-BLW-B", health: 76, rul: 36, status: "critical", trend: "down", sparkData: [88,86,84,81,79,77,76] },
        { name: "Cooling Water Header S", nodeId: "CW-HDR-S", health: 79, rul: 55, status: "warn", trend: "down", sparkData: [85,84,83,82,81,80,79] },
        { name: "Stove Combustion Sys", nodeId: "ST-COM-2", health: 81, rul: 78, status: "warn", trend: "flat", sparkData: [80,81,82,81,81,81,81] },
        { name: "Burden Charging Gearbox", nodeId: "BC-GBX-A", health: 86, rul: 104, status: "ok", trend: "up", sparkData: [83,84,85,85,86,86,86] }
      ],
      timeline: [
        { when: "In 6h", label: "Blower B bearing temperature nearing trip threshold", desc: "Vibration sidebands + high motor current — standby blower readiness required", severity: "critical" },
        { when: "In 18h", label: "Cooling header south flush required", desc: "Flow dropped 9% while supply pressure remains normal — likely scaling", severity: "warn" },
        { when: "In 36h", label: "Blower B planned bearing lubrication", desc: "SOP BF-BLOWER-02: Inspect and relubricate bearing assembly", severity: "warn" },
        { when: "In 48h", label: "Stove valve timing diagnostic", desc: "Combustion deviation aligns with delayed valve actuation logs", severity: "warn" },
        { when: "In 96h", label: "Scheduled stove air-ratio verification", desc: "Planned inspection per combustion efficiency SOP", severity: "ok" }
      ],
      alarms: [
        { label: "HB-A", strand: "Furnace A", parameter: "Pressure", open: 8, closed: 2 },
        { label: "HB-B", strand: "Furnace B", parameter: "Vibration", open: 12, closed: 1 },
        { label: "ST-1", strand: "Furnace A", parameter: "Temperature", open: 5, closed: 2 },
        { label: "ST-2", strand: "Furnace B", parameter: "Temperature", open: 7, closed: 1 },
        { label: "CH-A", strand: "Furnace A", parameter: "Vibration", open: 6, closed: 2 },
        { label: "CH-B", strand: "Furnace B", parameter: "Pressure", open: 4, closed: 1 },
        { label: "CW-N", strand: "Furnace A", parameter: "Cooling Flow", open: 6, closed: 3 },
        { label: "CW-S", strand: "Furnace B", parameter: "Cooling Flow", open: 9, closed: 1 }
      ],
      alerts: [
        { label: "OPEN", title: "Hot Blast Blower B vibration surge", meta: "Trip risk 47.2% | bearing temperature trending high", risk: "P1",
          anomaly: "Vibration sidebands growing, motor current elevated 14%, bearing temp +9°C above baseline",
          hint: "Inspect bearing lubrication and coupling alignment. Keep standby blower on hot standby." },
        { label: "OPEN", title: "Cooling Water Header South", meta: "Flow imbalance detected across tuyere cooling loop", risk: "P2",
          anomaly: "Flow deficit 9% with normal supply pressure — possible scaling or valve restriction",
          hint: "Flush strainer, validate flow transmitter calibration, check tuyere cooling isolation valves." },
        { label: "WATCH", title: "Stove 2 combustion temperature", meta: "Deviation from heating curve observed in last 3 cycles", risk: "P3",
          anomaly: "Combustion temperature deviating from expected heating curve pattern",
          hint: "Review stove valve timing logs and combustion air-to-fuel ratio settings." }
      ],
      rootCauses: [
        { cause: "Blower bearing lubrication degradation", confidence: 88, evidence: "Vibration sideband growth and high motor current match two prior bearing replacements." },
        { cause: "Cooling header partial blockage", confidence: 79, evidence: "South header flow dropped 9% while supply pressure remained normal." },
        { cause: "Stove valve timing drift", confidence: 67, evidence: "Combustion temperature deviation aligns with delayed valve actuation logs." }
      ],
      evidence: [
        { title: "SOP BF-BLOWER-02", text: "Inspect blower bearing lubrication and coupling alignment when vibration and motor current rise together." },
        { title: "Manual: Tuyere Cooling Header", text: "Flow imbalance can indicate scaling, valve restriction, or instrumentation drift." },
        { title: "Work Order BF-11842", text: "Blower vibration trend crossed warning threshold 38 hours before forced maintenance." }
      ],
      plan: [
        { priority: "P1", asset: "Hot Blast Blower B", risk: "Trip risk within 36 hrs", recommendation: "Inspect bearing lubrication, check coupling alignment, keep standby blower ready.", eta: "Next shift" },
        { priority: "P2", asset: "Cooling Water Header South", risk: "Cooling imbalance near tuyere loop", recommendation: "Flush strainer and validate flow transmitter calibration.", eta: "24 hrs" },
        { priority: "P3", asset: "Stove Combustion System", risk: "Heating cycle efficiency loss", recommendation: "Review stove valve timing and combustion air ratio.", eta: "72 hrs" }
      ],
      assistantQuestion: "Why is Hot Blast Blower B at critical risk?",
      assistantSummary: "Hot Blast Blower B is critical because vibration sidebands, motor current, and bearing temperature are rising together. Similar historical cases ended in forced maintenance, so the recommended action is lubrication inspection and standby blower readiness."
    },
    crm: {
      label: "CRM",
      line: "CRM | Mill stand & strip quality",
      group: "Cold rolling mill asset group",
      healthTitle: "CRM Equipment Risk Landscape",
      healthSubtitle: "Predictive RUL and risk monitoring for mill stands, hydraulics, and quality drives.",
      strands: ["Mill Line 1", "Mill Line 2"],
      parameters: ["All parameters", "Hydraulic Pressure", "Vibration", "Temperature", "Thickness"],
      kpis: { oee: 78.4, anomalies: 12, predictions: 3, confidence: 89 },
      riskRows: [
        { name: "Hydraulic AGC System", nodeId: "HY-AGC-01", health: 77, rul: 30, status: "critical", trend: "down", sparkData: [88,86,84,82,80,79,77] },
        { name: "Mill Stand F2", nodeId: "MS-F2-09", health: 87, rul: 68, status: "warn", trend: "flat", sparkData: [86,87,88,87,87,87,87] },
        { name: "Entry Tension Reel", nodeId: "TR-EN-04", health: 86, rul: 82, status: "warn", trend: "flat", sparkData: [87,87,86,86,86,86,86] },
        { name: "Thickness Gauge Scanner", nodeId: "TG-SC-01", health: 84, rul: 72, status: "warn", trend: "down", sparkData: [89,88,87,86,85,84,84] }
      ],
      timeline: [
        { when: "In 2h", label: "AGC pressure exceeding servo threshold", desc: "Hydraulic pressure ripple correlating with thickness deviation — INSPECT NOW", severity: "critical" },
        { when: "In 8h", label: "Servo valve response degrading", desc: "Filter contamination suspected after 2 high-load coils — schedule filter replacement", severity: "warn" },
        { when: "In 14h", label: "Thickness gauge calibration drift", desc: "Run calibration block check, compare with offline thickness sample", severity: "warn" },
        { when: "In 24h", label: "Entry reel bearing temperature check", desc: "Bearing cooling performance declining during coil head-end transitions", severity: "warn" },
        { when: "In 42h", label: "Hydraulic oil filter replacement due", desc: "Preventive maintenance scheduled per SOP CRM-AGC-07", severity: "ok" }
      ],
      alarms: [
        { label: "F2-1", strand: "Mill Line 1", parameter: "Vibration", open: 6, closed: 1 },
        { label: "F2-2", strand: "Mill Line 2", parameter: "Vibration", open: 4, closed: 2 },
        { label: "AGC1", strand: "Mill Line 1", parameter: "Hydraulic Pressure", open: 13, closed: 1 },
        { label: "AGC2", strand: "Mill Line 2", parameter: "Hydraulic Pressure", open: 7, closed: 1 },
        { label: "TR-1", strand: "Mill Line 1", parameter: "Temperature", open: 5, closed: 2 },
        { label: "TR-2", strand: "Mill Line 2", parameter: "Temperature", open: 8, closed: 1 },
        { label: "TG-1", strand: "Mill Line 1", parameter: "Thickness", open: 6, closed: 2 },
        { label: "TG-2", strand: "Mill Line 2", parameter: "Thickness", open: 9, closed: 1 }
      ],
      alerts: [
        { label: "OPEN", title: "Hydraulic AGC System / L1", meta: "Thickness deviation risk 53.4% | High ripple delta", risk: "P1",
          anomaly: "Hydraulic pressure ripple 180 bar → 198 bar, strip thickness deviation ±0.08mm, servo response lag detected",
          hint: "Check pressure valves and inspect main servo for fluid leakage. Isolate pump 2 immediately. Replace hydraulic filter." },
        { label: "OPEN", title: "Thickness Gauge Scanner / L2", meta: "Scanner drift propagating to downstream release", risk: "P2",
          anomaly: "Gauge drift 0.07mm vs offline sample, optical sensor temperature elevated",
          hint: "Recalibrate optical sensor array. Drift exceeds 0.05mm threshold. Run diagnostic sequence Alpha-3." },
        { label: "WATCH", title: "Entry Tension Reel / L2", meta: "Temp. velocity rising during head-end transition", risk: "P3",
          anomaly: "Temperature rising during coil head-end: 62°C → 74°C over 3 coils",
          hint: "Inspect tension controller logic. Possible friction build-up in primary bearing. Lubrication schedule overdue." }
      ],
      rootCauses: [
        { cause: "AGC servo valve response lag", confidence: 89, evidence: "Hydraulic pressure ripple and strip thickness variation rose together." },
        { cause: "Contaminated hydraulic oil filter", confidence: 76, evidence: "Filter differential pressure increased after two high-load coils." },
        { cause: "Scanner calibration drift", confidence: 71, evidence: "Gauge deviation matches manual quality check variance." }
      ],
      evidence: [
        { title: "SOP CRM-AGC-07", text: "Check servo valve response and hydraulic filter differential pressure when pressure ripple affects thickness stability." },
        { title: "Manual: Thickness Gauge Scanner", text: "Calibration drift should be verified after repeated deviations against offline quality samples." },
        { title: "Work Order CRM-33108", text: "AGC pressure ripple previously caused reject coils when maintenance was delayed beyond one shift." }
      ],
      plan: [
        { priority: "P1", asset: "Hydraulic AGC System / Line 1", risk: "Quality deviation likely within 30 hrs", recommendation: "Check servo valve response, replace clogged filter, validate pressure sensor.", eta: "Next shift" },
        { priority: "P2", asset: "Thickness Gauge Scanner / Line 2", risk: "Measurement drift affecting release confidence", recommendation: "Run calibration block check and compare with offline thickness sample.", eta: "24 hrs" },
        { priority: "P3", asset: "Entry Tension Reel / Line 2", risk: "Temperature trend rising", recommendation: "Inspect reel bearing cooling and check tension-control logs.", eta: "72 hrs" }
      ],
      assistantQuestion: "Why is Hydraulic AGC System Line 1 at critical risk?",
      assistantSummary: "Hydraulic AGC System / Line 1 is critical because pressure ripple is already correlating with thickness deviation. The most likely cause is servo valve response lag or filter contamination, so inspection should happen before the next production window."
    }
  },

  /* ── CRM PROCESS FLOW MONITOR ── */
  crmFlow: {
    leftParameters: [
      { name: "Strip Speed", value: "842 m/min", progress: 84, tone: "ok" },
      { name: "Rolling Force F2", value: "18.4 MN", progress: 72, tone: "ok" },
      { name: "Mill Gap L1", value: "0.82 mm", progress: 65, tone: "warn" },
      { name: "Entry Tension", value: "31.2 kN/m", progress: 78, tone: "ok" },
      { name: "Coolant Flow", value: "412 L/min", progress: 88, tone: "ok" }
    ],
    rightParameters: [
      { name: "Strip Thickness Out", value: "0.94 mm", progress: 94, tone: "ok" },
      { name: "Surface Quality Idx", value: "97.1%", progress: 97, tone: "ok" },
      { name: "Exit Tension", value: "28.9 kN/m", progress: 76, tone: "ok" },
      { name: "GB Oil Temperature", value: "68.4°C", progress: 68, tone: "warn" },
      { name: "Coil Weight", value: "18.2 T", progress: 91, tone: "ok" }
    ],
    flowNodes: [
      { id: "entry-coil", label: "ENTRY\nCOIL", short: "E-COIL", status: "ok", health: 96 },
      { id: "entry-reel", label: "ENTRY\nREEL", short: "E-REEL", status: "warn", health: 86 },
      { id: "stand-f1", label: "MILL\nF1", short: "F1", status: "ok", health: 91 },
      { id: "stand-f2", label: "MILL\nF2", short: "F2", status: "warn", health: 87 },
      { id: "stand-f3", label: "MILL\nF3", short: "F3", status: "ok", health: 93 },
      { id: "exit-reel", label: "EXIT\nREEL", short: "X-REEL", status: "ok", health: 90 },
      { id: "exit-coil", label: "EXIT\nCOIL", short: "X-COIL", status: "ok", health: 97 }
    ],
    agcNodes: [
      { stand: "F1", status: "ok", pressure: "171 bar" },
      { stand: "F2", status: "critical", pressure: "198 bar" },
      { stand: "F3", status: "warn", pressure: "183 bar" }
    ],
    stripMetrics: [
      { label: "Entry Thick.", value: "2.4mm", color: "ok" },
      { label: "Exit Thick.", value: "0.94mm", color: "ok" },
      { label: "Reduction", value: "60.8%", color: "warn" },
      { label: "Strip Speed", value: "842m/min", color: "ok" }
    ],
    status: {
      operation: [
        { label: "Strip Speed", value: "842 m/min", tone: "green" },
        { label: "Rolling Force", value: "18.4 MN", tone: "green" },
        { label: "Thickness Out", value: "0.94mm", tone: "green" },
        { label: "Entry Tension", value: "31.2 kN/m", tone: "amber" },
        { label: "Coolant Temp", value: "38°C", tone: "green" },
        { label: "Mill Power", value: "4.2 MW", tone: "green" }
      ],
      maintenance: [
        { label: "HYD Pressure", value: "198 bar", tone: "red" },
        { label: "GB Oil Temp", value: "68°C", tone: "amber" },
        { label: "F2 Vibration", value: "3.8 mm/s", tone: "amber" },
        { label: "Filter ΔP", value: "2.4 bar", tone: "red" },
        { label: "Pump Status", value: "P2 Fault", tone: "red" },
        { label: "Servo Resp.", value: "Lag +18ms", tone: "amber" }
      ]
    },
    health: [
      { label: "Mill Stands", value: 89, tone: "green" },
      { label: "Hydraulic AGC", value: 55, tone: "amber" },
      { label: "Tension Reels", value: 86, tone: "green" },
      { label: "Quality Gauges", value: 72, tone: "amber" }
    ],
    alerts: [
      { label: "AGC P2", count: 13,
        id: "ALR-CRM-001",
        title: "Hydraulic AGC System — Servo Valve Response Lag",
        severity: "critical",
        category: "P1-CRIT",
        location: "CRM | Mill Line 1 | F2 Stand | AGC Skid 02",
        nodeId: "HY-AGC-01",
        strand: "Mill Line 1",
        parameter: "Hydraulic Pressure",
        raisedAt: "2026-06-15 13:42 IST",
        detectedAt: "2026-06-15 13:38 IST",
        acknowledgedAt: "2026-06-15 13:51 IST",
        owner: "Mill Maintenance · Shift B",
        supervisor: "R. K. Singh",
        status: "OPEN",
        currentValue: "198 bar (ripple +18 bar)",
        baselineValue: "180 bar (ripple ±3 bar)",
        threshold: "Servo deviation > 8 bar",
        signature: "Pressure ripple 180→198 bar · thickness ±0.08 mm · servo lag +18 ms",
        relatedAlarms: ["ALM-AGC1-118","ALM-AGC1-119","ALM-AGC1-122"],
        sop: "SOP CRM-AGC-07",
        workOrder: "WO CRM-33108 (linked)"
      },
      { label: "F2 VIB", count: 6,
        id: "ALR-CRM-014",
        title: "Mill Stand F2 — Vibration RMS Elevated",
        severity: "high",
        category: "P2-HIGH",
        location: "CRM | Mill Line 1 | Stand F2 | Drive Side",
        nodeId: "MS-F2-09",
        strand: "Mill Line 1",
        parameter: "Vibration",
        raisedAt: "2026-06-15 12:15 IST",
        detectedAt: "2026-06-15 12:09 IST",
        acknowledgedAt: "2026-06-15 12:24 IST",
        owner: "Vibration Analyst · Shift B",
        supervisor: "A. Mehra",
        status: "OPEN",
        currentValue: "3.8 mm/s RMS",
        baselineValue: "1.6 mm/s RMS",
        threshold: "ISO 10816-3 Zone B boundary",
        signature: "1× and 2× run-speed sidebands growing, gear-mesh tone at 142 Hz",
        relatedAlarms: ["ALM-F2-441","ALM-F2-443"],
        sop: "SOP CRM-VIB-12",
        workOrder: "WO CRM-33241 (open)"
      },
      { label: "GB OIL", count: 4,
        id: "ALR-CRM-027",
        title: "Gearbox Oil Temperature Trending High",
        severity: "medium",
        category: "P3-WARN",
        location: "CRM | Mill Line 1 | Main Drive Gearbox | Bearing Hsg",
        nodeId: "GB-MD-01",
        strand: "Mill Line 1",
        parameter: "Temperature",
        raisedAt: "2026-06-15 11:48 IST",
        detectedAt: "2026-06-15 11:42 IST",
        acknowledgedAt: "—",
        owner: "Lubrication Crew · Day",
        supervisor: "P. N. Rao",
        status: "WATCH",
        currentValue: "68.4 °C",
        baselineValue: "≤ 60 °C",
        threshold: "Trip @ 78 °C",
        signature: "Steady rise of 0.4 °C/hr over last 6 hours; cooler flow nominal",
        relatedAlarms: ["ALM-GB-091"],
        sop: "SOP CRM-LUBE-03",
        workOrder: "WO CRM-33099 (scheduled)"
      },
      { label: "T.GAUGE", count: 9,
        id: "ALR-CRM-052",
        title: "Thickness Gauge Scanner — Calibration Drift",
        severity: "high",
        category: "P2-HIGH",
        location: "CRM | Mill Line 2 | Exit Section | Optical Scanner",
        nodeId: "TG-SC-01",
        strand: "Mill Line 2",
        parameter: "Thickness",
        raisedAt: "2026-06-15 10:22 IST",
        detectedAt: "2026-06-15 10:18 IST",
        acknowledgedAt: "2026-06-15 10:35 IST",
        owner: "Quality & Instrumentation",
        supervisor: "S. Iyer",
        status: "OPEN",
        currentValue: "Drift 0.07 mm vs offline sample",
        baselineValue: "± 0.02 mm tolerance",
        threshold: "Drift > 0.05 mm",
        signature: "Optical sensor temperature +6 °C, X-ray count stable, C-frame vibration nominal",
        relatedAlarms: ["ALM-TG-203","ALM-TG-205"],
        sop: "SOP CRM-QA-09",
        workOrder: "WO CRM-33077 (in-progress)"
      }
    ]
  },

  /* ── BF PROCESS FLOW MONITOR ── */
  bfFlow: {
    leftParameters: [
      { name: 'Blast Pressure', value: '3.8 bar', progress: 76, tone: 'ok' },
      { name: 'Blast Temperature', value: '1180°C', progress: 82, tone: 'ok' },
      { name: 'Burden Rate', value: '4.2 t/min', progress: 70, tone: 'warn' },
      { name: 'O₂ Enrichment', value: '4.8%', progress: 64, tone: 'ok' },
      { name: 'Moisture', value: '12 g/Nm³', progress: 55, tone: 'ok' }
    ],
    rightParameters: [
      { name: 'Hot Metal Temp', value: '1495°C', progress: 92, tone: 'ok' },
      { name: 'Hot Metal Si', value: '0.58%', progress: 72, tone: 'warn' },
      { name: 'Slag Basicity', value: '1.12', progress: 80, tone: 'ok' },
      { name: 'Top Gas CO₂', value: '22.1%', progress: 78, tone: 'ok' },
      { name: 'Coke Rate', value: '348 kg/t', progress: 68, tone: 'warn' }
    ],
    flowNodes: [
      { id: 'skip-hoist', label: 'SKIP\nHOIST', short: 'SKIP', status: 'ok', health: 94 },
      { id: 'charging', label: 'CHARGING\nSYSTEM', short: 'CHRG', status: 'ok', health: 91 },
      { id: 'shaft', label: 'FURNACE\nSHAFT', short: 'SHAFT', status: 'warn', health: 84 },
      { id: 'bosh', label: 'BOSH\nZONE', short: 'BOSH', status: 'ok', health: 89 },
      { id: 'hearth', label: 'HEARTH', short: 'HRTH', status: 'warn', health: 82 },
      { id: 'tap-hole', label: 'TAP\nHOLE', short: 'TAP', status: 'ok', health: 90 },
      { id: 'cast-house', label: 'CAST\nHOUSE', short: 'CAST', status: 'ok', health: 95 }
    ],
    agcNodes: [
      { stand: 'Stove 1', status: 'ok', pressure: '3.6 bar' },
      { stand: 'Stove 2', status: 'warn', pressure: '3.2 bar' },
      { stand: 'Stove 3', status: 'ok', pressure: '3.7 bar' }
    ],
    stripMetrics: [
      { label: 'Blast Vol.', value: '4800 Nm³/min', color: 'ok' },
      { label: 'HM Temp', value: '1495°C', color: 'ok' },
      { label: 'Prod. Rate', value: '7.2 t/hr', color: 'warn' },
      { label: 'Fuel Rate', value: '498 kg/t', color: 'ok' }
    ],
    status: {
      operation: [
        { label: 'Blast Volume', value: '4800 Nm³/min', tone: 'green' },
        { label: 'Blast Temp', value: '1180°C', tone: 'green' },
        { label: 'Hot Metal Temp', value: '1495°C', tone: 'green' },
        { label: 'Burden Rate', value: '4.2 t/min', tone: 'amber' },
        { label: 'Top Pressure', value: '2.4 bar', tone: 'green' },
        { label: 'Oxygen', value: '4.8%', tone: 'green' }
      ],
      maintenance: [
        { label: 'Blower B Vib.', value: '3.2 mm/s', tone: 'amber' },
        { label: 'Stove 2 Temp', value: '1120°C', tone: 'amber' },
        { label: 'CW Header', value: '91%', tone: 'green' },
        { label: 'Gearbox Oil', value: '72°C', tone: 'amber' },
        { label: 'Blower Status', value: 'B Fault', tone: 'red' },
        { label: 'Stove Cycle', value: 'Delay +4m', tone: 'amber' }
      ]
    },
    health: [
      { label: 'Hot Blast', value: 76, tone: 'amber' },
      { label: 'Cooling System', value: 79, tone: 'amber' },
      { label: 'Burden System', value: 91, tone: 'green' },
      { label: 'Cast House', value: 88, tone: 'green' }
    ],
    alerts: [
      { label: 'BLW-B', count: 12,
        id: "ALR-BF-001",
        title: "Hot Blast Blower B — Bearing Vibration Surge",
        severity: "critical",
        category: "P1-CRIT",
        location: "BF | Furnace B | Hot Blast Main | Blower B",
        nodeId: "HB-BLW-B",
        strand: "Furnace B",
        parameter: "Vibration",
        raisedAt: "2026-06-15 13:08 IST",
        detectedAt: "2026-06-15 13:01 IST",
        acknowledgedAt: "2026-06-15 13:14 IST",
        owner: "BF Maintenance · Shift B",
        supervisor: "M. Banerjee",
        status: "OPEN",
        currentValue: "Trip risk 47.2% · vibration sidebands growing",
        baselineValue: "Bearing temp 56 °C · motor current 312 A",
        threshold: "Trip @ 6.2 mm/s · temp @ 72 °C",
        signature: "1× and 2× sidebands growing, motor current +14%, bearing temp +9 °C",
        relatedAlarms: ["ALM-BLW-501","ALM-BLW-502","ALM-BLW-503"],
        sop: "SOP BF-BLOWER-02",
        workOrder: "WO BF-11842 (linked)"
      },
      { label: 'ST-2', count: 7,
        id: "ALR-BF-019",
        title: "Stove 2 — Combustion Heating Curve Deviation",
        severity: "medium",
        category: "P3-WARN",
        location: "BF | Stove 2 | Combustion Chamber | Dome",
        nodeId: "ST-COM-2",
        strand: "Furnace B",
        parameter: "Temperature",
        raisedAt: "2026-06-15 09:54 IST",
        detectedAt: "2026-06-15 09:48 IST",
        acknowledgedAt: "2026-06-15 10:02 IST",
        owner: "Combustion Engineer · Day",
        supervisor: "V. K. Pillai",
        status: "WATCH",
        currentValue: "1120 °C vs target 1180 °C",
        baselineValue: "Target 1180 °C ± 15 °C",
        threshold: "Deviation > 30 °C from heating curve",
        signature: "Deviation across last 3 cycles, valve actuation +4 min lag observed",
        relatedAlarms: ["ALM-ST2-217"],
        sop: "SOP BF-STOVE-04",
        workOrder: "WO BF-11901 (open)"
      },
      { label: 'CW-S', count: 9,
        id: "ALR-BF-033",
        title: "Cooling Water Header South — Flow Imbalance",
        severity: "high",
        category: "P2-HIGH",
        location: "BF | Cooling Water Network | Header S | Tuyere Loop",
        nodeId: "CW-HDR-S",
        strand: "Furnace B",
        parameter: "Cooling Flow",
        raisedAt: "2026-06-15 12:31 IST",
        detectedAt: "2026-06-15 12:24 IST",
        acknowledgedAt: "2026-06-15 12:40 IST",
        owner: "Utilities · Day",
        supervisor: "D. S. Negi",
        status: "OPEN",
        currentValue: "Flow deficit 9% with normal supply pressure",
        baselineValue: "Balanced within ±2%",
        threshold: "Header delta > 5%",
        signature: "South header flow 9% low, supply pressure nominal — scaling suspected",
        relatedAlarms: ["ALM-CW-704","ALM-CW-705"],
        sop: "SOP BF-CW-11",
        workOrder: "WO BF-11888 (open)"
      },
      { label: 'GBX', count: 4,
        id: "ALR-BF-048",
        title: "Burden Charging Gearbox — Oil Temperature High",
        severity: "low",
        category: "P4-INFO",
        location: "BF | Furnace A | Charging System | Gearbox A",
        nodeId: "BC-GBX-A",
        strand: "Furnace A",
        parameter: "Temperature",
        raisedAt: "2026-06-15 08:17 IST",
        detectedAt: "2026-06-15 08:11 IST",
        acknowledgedAt: "2026-06-15 08:25 IST",
        owner: "Mechanical Maintenance",
        supervisor: "K. P. Singh",
        status: "WATCH",
        currentValue: "72 °C · steady",
        baselineValue: "≤ 65 °C nominal",
        threshold: "Trip @ 82 °C",
        signature: "Ambient compensated temperature within band, oil cooler airflow reduced",
        relatedAlarms: ["ALM-GBX-019"],
        sop: "SOP BF-MECH-07",
        workOrder: "WO BF-11712 (scheduled)"
      }
    ]
  },

  /* ── CASTER PROCESS FLOW MONITOR ── */
  casterFlow: {
    leftParameters: [
      { name: 'Cast Speed', value: '1.2 m/min', progress: 78, tone: 'ok' },
      { name: 'Mold Level', value: '82%', progress: 82, tone: 'ok' },
      { name: 'Superheat', value: '28°C', progress: 65, tone: 'warn' },
      { name: 'Mold Width', value: '1250 mm', progress: 88, tone: 'ok' },
      { name: 'Tundish Weight', value: '24.5 t', progress: 72, tone: 'ok' }
    ],
    rightParameters: [
      { name: 'Surface Quality', value: '97.2%', progress: 97, tone: 'ok' },
      { name: 'Slab Width', value: '1248 mm', progress: 94, tone: 'ok' },
      { name: 'Slab Temp', value: '1050°C', progress: 78, tone: 'ok' },
      { name: 'Cut Length', value: '10.2 m', progress: 85, tone: 'ok' },
      { name: 'Strand Status', value: 'Active', progress: 100, tone: 'ok' }
    ],
    flowNodes: [
      { id: 'tundish', label: 'TUNDISH', short: 'TUND', status: 'ok', health: 92 },
      { id: 'mold', label: 'MOLD', short: 'MOLD', status: 'warn', health: 84 },
      { id: 'oscillator', label: 'MOLD\nOSCILL.', short: 'OSC', status: 'warn', health: 84 },
      { id: 'seg1', label: 'SEG 1', short: 'S1', status: 'ok', health: 91 },
      { id: 'seg2', label: 'SEG 2', short: 'S2', status: 'critical', health: 62 },
      { id: 'straightener', label: 'STRAIGHT-\nENER', short: 'STR', status: 'ok', health: 89 },
      { id: 'torch-cut', label: 'TORCH\nCUT', short: 'CUT', status: 'ok', health: 96 }
    ],
    agcNodes: [
      { stand: 'Cool Z1', status: 'ok', pressure: '412 L/min' },
      { stand: 'Cool Z2', status: 'critical', pressure: '318 L/min' },
      { stand: 'Cool Z3', status: 'warn', pressure: '385 L/min' }
    ],
    stripMetrics: [
      { label: 'Cast Speed', value: '1.2 m/min', color: 'ok' },
      { label: 'Mold Level', value: '82%', color: 'ok' },
      { label: 'Superheat', value: '28°C', color: 'warn' },
      { label: 'Strand 2', value: 'ALERT', color: 'warn' }
    ],
    status: {
      operation: [
        { label: 'Cast Speed', value: '1.2 m/min', tone: 'green' },
        { label: 'Mold Level', value: '82%', tone: 'green' },
        { label: 'Superheat', value: '28°C', tone: 'amber' },
        { label: 'Tundish Wt', value: '24.5 t', tone: 'green' },
        { label: 'Slab Temp', value: '1050°C', tone: 'green' },
        { label: 'Cut Length', value: '10.2 m', tone: 'green' }
      ],
      maintenance: [
        { label: 'Roll Bearing', value: '62% health', tone: 'red' },
        { label: 'Cool Z2 Flow', value: '318 L/min', tone: 'red' },
        { label: 'Mold Osc.', value: '84% health', tone: 'amber' },
        { label: 'Lube Press.', value: '-18%', tone: 'red' },
        { label: 'Seg 2 Temp', value: '+11°C', tone: 'amber' },
        { label: 'Nozzle Stat.', value: '3 Blocked', tone: 'red' }
      ]
    },
    health: [
      { label: 'Mold System', value: 84, tone: 'amber' },
      { label: 'Cooling', value: 62, tone: 'red' },
      { label: 'Roll Assembly', value: 62, tone: 'red' },
      { label: 'Withdrawal', value: 91, tone: 'green' }
    ],
    alerts: [
      { label: 'COOL', count: 10,
        id: "ALR-CST-001",
        title: "Secondary Cooling Zone 2 — Nozzle Blockage",
        severity: "high",
        category: "P2-HIGH",
        location: "Caster | Strand 2 | Seg 2 | Cooling Manifold",
        nodeId: "SC-Z2-05",
        strand: "Strand 2",
        parameter: "Cooling Flow",
        raisedAt: "2026-06-15 13:55 IST",
        detectedAt: "2026-06-15 13:48 IST",
        acknowledgedAt: "2026-06-15 14:02 IST",
        owner: "Caster Maintenance · Shift B",
        supervisor: "T. K. Das",
        status: "OPEN",
        currentValue: "Flow deficit 12% · 3 nozzles blocked",
        baselineValue: "Balanced within ±2%",
        threshold: "Header delta > 5%",
        signature: "Cooling flow drift above SOP band for 23 minutes, segment temp +11 °C",
        relatedAlarms: ["ALM-COOL-301","ALM-COOL-302","ALM-COOL-303"],
        sop: "SOP CASTER-LUBE-04",
        workOrder: "WO CST-21188 (open)"
      },
      { label: 'BEAR', count: 7,
        id: "ALR-CST-014",
        title: "Roll Bearing Assembly — Temperature & Vibration Breach",
        severity: "critical",
        category: "P1-CRIT",
        location: "Caster | Strand 2 | Withdrawal | Bearing RB-AS-02",
        nodeId: "RB-AS-02",
        strand: "Strand 2",
        parameter: "Vibration",
        raisedAt: "2026-06-15 13:18 IST",
        detectedAt: "2026-06-15 13:12 IST",
        acknowledgedAt: "2026-06-15 13:25 IST",
        owner: "Caster Maintenance · Shift B",
        supervisor: "T. K. Das",
        status: "OPEN",
        currentValue: "Vibration RMS +40% · bearing temp +11 °C · lube pressure -18%",
        baselineValue: "Vibration nominal, lube pressure within band",
        threshold: "Vibration ISO Zone C · temp trip @ 95 °C",
        signature: "Vibration 40% above baseline, bearing temperature +11 °C, lube pressure -18%",
        relatedAlarms: ["ALM-BR-901","ALM-BR-902"],
        sop: "SOP CASTER-LUBE-04",
        workOrder: "WO CST-21202 (linked)"
      },
      { label: 'MOLD', count: 5,
        id: "ALR-CST-027",
        title: "Mold Oscillator — Thermal Alarm Burst",
        severity: "medium",
        category: "P3-WARN",
        location: "Caster | Strand 1 | Mold Top | Oscillator Drive",
        nodeId: "MO-S1-01",
        strand: "Strand 1",
        parameter: "Temperature",
        raisedAt: "2026-06-15 11:24 IST",
        detectedAt: "2026-06-15 11:18 IST",
        acknowledgedAt: "2026-06-15 11:30 IST",
        owner: "Mold & Oscillator Crew",
        supervisor: "R. Bhattacharya",
        status: "WATCH",
        currentValue: "Thermal spikes 2× this shift",
        baselineValue: "Stable within ±3 °C",
        threshold: "Burst threshold 3 per shift",
        signature: "Intermittent thermal spikes on oscillator drive motor; possible resonance",
        relatedAlarms: ["ALM-MO-412"],
        sop: "SOP CASTER-OSC-02",
        workOrder: "WO CST-21190 (open)"
      },
      { label: 'LUBE', count: 6,
        id: "ALR-CST-041",
        title: "Lubrication System — Strand 2 Cycle Overdue",
        severity: "medium",
        category: "P3-WARN",
        location: "Caster | Strand 2 | Lube Skid | Primary Pump",
        nodeId: "LB-S2-01",
        strand: "Strand 2",
        parameter: "Lubrication",
        raisedAt: "2026-06-15 09:02 IST",
        detectedAt: "2026-06-15 08:55 IST",
        acknowledgedAt: "2026-06-15 09:08 IST",
        owner: "Lubrication Crew",
        supervisor: "P. N. Rao",
        status: "WATCH",
        currentValue: "Lubrication cycle overdue by 6h",
        baselineValue: "12h cycle interval",
        threshold: "Overdue > 4h",
        signature: "Schedule slip — pump pressure trending -3% per hour",
        relatedAlarms: ["ALM-LB-220"],
        sop: "SOP CASTER-LUBE-04",
        workOrder: "WO CST-21104 (scheduled)"
      }
    ]
  },

  /* ── HEATMAP DATA ── */
  heatmap: {
    zones: ["Z1","Z2","Z3","Z4","Z5","Z6","Z7","Z8"],
    cells: [
      "ok-low","ok","warn","critical","warn-high","ok","ok-low","warn",
      "ok","warn-high","warn","critical-med","warn","ok","ok-low","ok-low",
      "warn-low","ok","ok","warn","critical","warn-high","warn","ok"
    ],
    counts: { severe: 12, elevated: 34, nominal: 89 }
  },

  /* ── TELEMETRY STREAM SEED DATA ── */
  telemetrySeeds: [
    { id: "HY-AGC-01", val: 77.4, unit: "%VTL", status: "critical" },
    { id: "MS-F2-09", val: 87.2, unit: "%VTL", status: "warn" },
    { id: "TR-EN-04", val: 90.5, unit: "%VTL", status: "ok" },
    { id: "TG-SC-01", val: 84.0, unit: "%VTL", status: "warn" },
    { id: "HY-AGC-02", val: 85.1, unit: "%VTL", status: "warn" },
    { id: "MS-F3-10", val: 93.1, unit: "%VTL", status: "ok" },
    { id: "TR-EX-05", val: 91.8, unit: "%VTL", status: "ok" },
    { id: "HB-BLW-B", val: 76.0, unit: "%VTL", status: "critical" }
  ]
};
