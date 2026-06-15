const pptxgen = require('pptxgenjs');
const path = require('path');

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'MANTIS AI Team';
pres.title = 'MANTIS AI - Maintenance Wizard for Industrial Equipment';
pres.subject = 'Tata Steel AI Hackathon 2026';
pres.company = 'Tata Steel AI Hackathon';

// Theme — industrial / steel / safety palette
const theme = {
  primary:   '0F172A',
  secondary: '475569',
  accent:    '1E40AF',
  light:     'EFF6FF',
  bg:        'F8FAFC',
  critical:  'DC2626',
  warn:      'D97706',
  ok:        '059669'
};

// Pre-resolve absolute paths to demo screenshots so addImage finds them
// regardless of where PptxGenJS resolves relative paths from.
const projectRoot = path.resolve(__dirname, '..', '..');
theme.img = {
  cmdCenter:    path.join(projectRoot, 'demo-screenshots', '01-command-center-top.png'),
  architecture: path.join(projectRoot, 'demo-screenshots', '02-architecture-svg.png'),
  alertModal:   path.join(projectRoot, 'demo-screenshots', '03-alert-modal.png'),
  alertAi:      path.join(projectRoot, 'demo-screenshots', '04-alert-ai-diagnosis.png'),
  crmFlow:      path.join(projectRoot, 'demo-screenshots', '05-crm-process-flow.png'),
  diagnosis:    path.join(projectRoot, 'demo-screenshots', '06-ai-diagnosis.png'),
  plan:         path.join(projectRoot, 'demo-screenshots', '07-maintenance-plan.png'),
  knowledge:    path.join(projectRoot, 'demo-screenshots', '08-knowledge-base.png'),
  anomaly:      path.join(projectRoot, 'demo-screenshots', '09-anomaly-signatures.png'),
  flowModal:    path.join(projectRoot, 'demo-screenshots', '10-flow-alert-modal.png')
};

// Load slide modules in order
for (let i = 1; i <= 15; i++) {
  const num = i.toString().padStart(2, '0');
  const mod = require(`./slide-${num}.js`);
  mod.createSlide(pres, theme);
}

const outPath = path.join(__dirname, 'output', 'MANTIS-AI-Maintenance-Wizard-Hackathon.pptx');
pres.writeFile({ fileName: outPath }).then(name => {
  console.log('Wrote: ' + name);
});
