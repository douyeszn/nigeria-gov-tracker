// ─────────────────────────────────────────────────────────────────────────────
// ALL SHARED DATA — Bayelsa State Accountability Tracker
// ─────────────────────────────────────────────────────────────────────────────

export const GOVERNOR = {
  name: 'Sen. Douye Diri', title: 'Executive Governor',
  state: 'Bayelsa State', party: 'PDP',
  inauguration: 'February 14, 2020', termEnds: 'February 2028',
  capital: 'Yenagoa', population: '2,278,663', area: '10,773 km²',
  lgas: 8, overallScore: 39, yearsInOffice: 5,
  promisesTracked: 24, promisesKept: 6, promisesPartial: 8, promisesBroken: 10,
}

// ── SECTORS ──────────────────────────────────────────────────────────────────

export const SECTORS = [
  {
    id: 'education', name: 'Education', icon: '📚', score: 51,
    status: 'POOR', severity: 'amber',
    budgetAllocated: 62.4, budgetSpent: 47.8,
    metrics: [
      { label: 'Adult Literacy Rate',    value: '86.83%', target: '95%',   progress: 91 },
      { label: 'Net Enrollment Rate',    value: '72%',    target: '95%',   progress: 76 },
      { label: 'Schools Rehabilitated', value: '214',    target: '500',   progress: 43 },
      { label: 'WAEC Pass Rate',         value: '41%',    target: '65%',   progress: 63 },
    ],
    headline: '86.83%', headlineLabel: 'Adult literacy — 11th highest in Nigeria',
    keyFailure: 'Despite strong literacy, 85,000 children out of school. WAEC pass rate 11 pts below national average.',
    source: 'NBS / Zikoko 2024; UBEC 2023; WAEC 2024',
  },
  {
    id: 'roads', name: 'Roads & Infrastructure', icon: '🛣️', score: 29,
    status: 'CRITICAL', severity: 'red',
    budgetAllocated: 95.2, budgetSpent: 52.1,
    metrics: [
      { label: 'Roads Completed',                value: '147 km', target: '500 km',     progress: 29 },
      { label: 'Riverine Communities Connected', value: '23%',    target: '60%',        progress: 38 },
      { label: 'Major Projects On Schedule',     value: '1 of 6', target: '6 projects', progress: 17 },
    ],
    headline: '₦43.1B', headlineLabel: 'Roads budget unspent in FY2024',
    keyFailure: 'Yenagoa–Oporoma road 60% done — 2 years overdue. Annual flooding destroys roads within 18 months.',
    source: 'BudgIT Bayelsa FY2024',
  },
  {
    id: 'economy', name: 'Economy & Jobs', icon: '📊', score: 35,
    status: 'POOR', severity: 'red',
    budgetAllocated: 35.6, budgetSpent: 18.2,
    metrics: [
      { label: 'Youth Unemployment',   value: '40.3%', target: '≤30%',  progress: 22 },
      { label: 'IGR vs ₦28B Target',  value: '₦15.3B',target: '₦28B',  progress: 55 },
      { label: 'New SMEs Registered', value: '3,240', target: '10,000', progress: 32 },
    ],
    headline: '96.2%', headlineLabel: 'Revenue from oil — not internally generated',
    keyFailure: 'IGR ₦15.3B vs ₦28B target — 45.4% shortfall. Zero economic diversification after 5 years.',
    source: 'NBS Q2 2024; Bayelsa State Revenue Service',
  },
  {
    id: 'flood', name: 'Flood & Disaster', icon: '🌊', score: 18,
    status: 'CRITICAL', severity: 'red',
    budgetAllocated: 8.4, budgetSpent: 6.1,
    metrics: [
      { label: 'Permanent Flood Structures', value: '0',   target: '12',    progress: 0  },
      { label: 'Early Warning Systems',      value: '2',   target: '8 LGAs',progress: 25 },
      { label: 'Displaced Persons Re-housed',value: '14%', target: '100%',  progress: 14 },
    ],
    headline: '1.3M+', headlineLabel: 'People displaced in 2022 floods alone',
    keyFailure: 'No permanent flood infrastructure in 5 years. Two-thirds of Bayelsa floods 3+ months annually.',
    source: 'NEMA 2022; World Bank Nigeria Floods',
  },
  {
    id: 'health', name: 'Health & WASH', icon: '🏥', score: 33,
    status: 'CRITICAL', severity: 'red',
    budgetAllocated: 28.3, budgetSpent: 19.6,
    metrics: [
      { label: 'Basic WASH Access',           value: '9%', target: '60%', progress: 15 },
      { label: 'Health Facilities Functional', value: '38%',target: '80%', progress: 48 },
      { label: 'Skilled Birth Attendance',    value: '52%',target: '85%', progress: 61 },
    ],
    headline: '91%', headlineLabel: 'Residents lack basic water or sanitation',
    keyFailure: 'Only 9% WASH access vs 39% national average. Maternal mortality among Nigeria\'s highest.',
    source: 'UNICEF WASHNORM 2021; NBS MPI 2022',
  },
  {
    id: 'environment', name: 'Environment & Oil Spills', icon: '🌿', score: 12,
    status: 'CRITICAL', severity: 'red',
    budgetAllocated: 4.2, budgetSpent: 1.1,
    metrics: [
      { label: 'Active Oil Spill Sites',      value: '47', target: '0',   progress: 0  },
      { label: 'Remediation Sites Completed', value: '0',  target: '47',  progress: 0  },
      { label: 'Legal Actions vs Oil Cos.',   value: '1',  target: '10+', progress: 10 },
    ],
    headline: '47', headlineLabel: 'Active oil spill sites — zero remediated',
    keyFailure: 'Fishing economy collapsed in 6 LGAs. No Remediation Agency. 73% of pipelines past lifespan.',
    source: 'Amnesty International 2023; NOSDRA',
  },
  {
    id: 'industry', name: 'Industry & Energy', icon: '⚙️', score: 48,
    status: 'POOR', severity: 'amber',
    budgetAllocated: 22.6, budgetSpent: 14.8,
    metrics: [
      { label: 'Share of Nigeria Oil Output', value: '23.4%', target: 'maintain', progress: 78 },
      { label: 'Gas Reserves Monetised',      value: '~8%',   target: '30%',      progress: 27 },
      { label: 'Non-Oil Industry Growth',     value: '3.1%',  target: '12% pa',   progress: 26 },
    ],
    headline: '₦4.63T', headlineLabel: 'State GDP — 11th richest state in Nigeria',
    keyFailure: '18 trillion cubic feet gas reserve — Nigeria\'s largest — largely unmonetised.',
    source: 'NBS GDP Rankings 2024; NNPC 2024',
  },
  {
    id: 'electricity', name: 'Electricity', icon: '⚡', score: 28,
    status: 'CRITICAL', severity: 'red',
    budgetAllocated: 18.5, budgetSpent: 11.2,
    metrics: [
      { label: 'Avg. Daily Power Supply',   value: '4.2 hrs',target: '16 hrs', progress: 26 },
      { label: 'Rural Electrification Rate',value: '12%',    target: '35%',   progress: 34 },
      { label: 'Solar/Renewable Share',     value: '8%',     target: '25%',   progress: 32 },
      { label: 'Projects Completed',        value: '1 of 8', target: '8',     progress: 13 },
    ],
    headline: '4.2 hrs/day', headlineLabel: 'Average power supply — 74% below target',
    keyFailure: 'Bayelsa Power Company (300MW, ₦8B spent) stalled since August 2022. Contractor dispute unresolved 2+ years.',
    source: 'NERC Q3 2024; Bayelsa State Power Authority',
  },
]

// ── PROJECTS ─────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'gas-turbine', name: '60MW Gas Turbine Power Plant',
    location: 'Elebele, Ogbia LGA', sector: 'Electricity', icon: '⚡',
    status: 'ongoing', completion: 99,
    budget: '₦45B', contractor: 'GE Power / Oando Gas',
    startDate: 'Oct 2024', targetDate: 'Dec 2024', revisedDate: 'Q2 2025',
    description: '8 units of 60MW gas turbines installed at Elebele, fed by Oando gas manifold. Governor Diri expressed disappointment at missing the December deadline. President Tinubu expected to inaugurate.',
    source: 'Mangrove Pen; Leadership Newspaper; Bayelsa Govt 2025',
    milestones: [
      { date: 'Oct 2024', label: 'Construction begins at Elebele',     done: true  },
      { date: 'Dec 2024', label: 'Target completion (missed — delay)', done: false },
      { date: 'Mar 2025', label: 'Tinubu inauguration announced',      done: true  },
      { date: 'Q2 2025',  label: 'Grid connection & commissioning',    done: false },
    ],
  },
  {
    id: 'yenagoa-oporoma', name: 'Yenagoa–Oporoma Road',
    location: 'Southern Ijaw LGA', sector: 'Roads', icon: '🛣️',
    status: 'ongoing', completion: 60,
    budget: '₦28B', contractor: 'Dantata & Sawoe',
    startDate: 'Mar 2021', targetDate: 'Mar 2024', revisedDate: 'TBD',
    description: 'Critical road connecting Yenagoa to Oporoma in Southern Ijaw. 2+ years behind schedule. Annual flooding has damaged completed sections twice.',
    source: 'BudgIT; Bayelsa Ministry of Public Works',
    milestones: [
      { date: 'Mar 2021', label: 'Groundbreaking ceremony',       done: true  },
      { date: 'Dec 2022', label: '40% completion reached',        done: true  },
      { date: 'Mar 2024', label: 'Original deadline (missed)',     done: false },
      { date: 'Dec 2024', label: '60% completion',                done: true  },
      { date: 'TBD',      label: 'Full completion',               done: false },
    ],
  },
  {
    id: 'angiama-bridge', name: 'Angiama–Oporoma Bridge',
    location: 'Southern Ijaw LGA', sector: 'Roads', icon: '🌉',
    status: 'ongoing', completion: 85,
    budget: '₦15B', contractor: 'CPCC Construction',
    startDate: 'Jan 2022', targetDate: 'Dec 2023', revisedDate: 'Q1 2025',
    description: 'Bridge connecting isolated Southern Ijaw communities year-round. Near completion — one of the administration\'s most credible infrastructure wins.',
    source: 'Bayelsa State Govt; The Will Nigeria',
    milestones: [
      { date: 'Jan 2022', label: 'Construction begins',           done: true  },
      { date: 'Dec 2023', label: 'Target completion (missed)',     done: false },
      { date: 'Dec 2024', label: '85% completion',                done: true  },
      { date: 'Q1 2025',  label: 'Projected full completion',     done: false },
    ],
  },
  {
    id: 'nembe-brass-road', name: 'Nembe–Brass Senatorial Road',
    location: 'Nembe / Brass LGAs', sector: 'Roads', icon: '🛣️',
    status: 'ongoing', completion: 40,
    budget: '₦32B', contractor: 'CCECC Nigeria',
    startDate: 'Jun 2023', targetDate: 'Jun 2026', revisedDate: 'TBD',
    description: 'One of three senatorial roads. Connects Nembe and Brass — two of the most historically neglected LGAs. Currently 40% complete.',
    source: 'Bayelsa State Govt; Sahara Reporters',
    milestones: [
      { date: 'Jun 2023', label: 'Construction begins',           done: true  },
      { date: 'Dec 2024', label: '40% completion',                done: true  },
      { date: 'Jun 2026', label: 'Target completion',             done: false },
    ],
  },
  {
    id: 'stadium', name: '25,000-Seat International Stadium',
    location: 'Yenagoa', sector: 'Sports', icon: '🏟️',
    status: 'ongoing', completion: 45,
    budget: '₦35B', contractor: 'CGC Nigeria',
    startDate: 'Mar 2022', targetDate: 'Dec 2025', revisedDate: 'TBD',
    description: 'International-standard stadium to host regional and continental sporting events. Will anchor Bayelsa\'s sports tourism ambitions.',
    source: 'Bayelsa State Sports Council',
    milestones: [
      { date: 'Mar 2022', label: 'Groundbreaking',                done: true  },
      { date: 'Dec 2023', label: '30% completion',                done: true  },
      { date: 'Dec 2024', label: '45% completion',                done: true  },
      { date: 'Dec 2025', label: 'Target completion',             done: false },
    ],
  },
  {
    id: 'secretariat', name: '9-Storey State Secretariat',
    location: 'Yenagoa', sector: 'Administration', icon: '🏢',
    status: 'ongoing', completion: 65,
    budget: '₦18B', contractor: 'Julius Berger',
    startDate: 'Sep 2021', targetDate: 'Sep 2023', revisedDate: 'TBD',
    description: 'Modern government complex to centralise civil service. 65% complete and running behind schedule.',
    source: 'Bayelsa State Govt',
    milestones: [
      { date: 'Sep 2021', label: 'Groundbreaking',                done: true  },
      { date: 'Sep 2023', label: 'Target completion (missed)',     done: false },
      { date: 'Dec 2024', label: '65% complete',                  done: true  },
      { date: 'TBD',      label: 'Full completion',               done: false },
    ],
  },
  {
    id: 'bayelsa-power-company', name: 'Bayelsa Power Company (300MW)',
    location: 'Yenagoa', sector: 'Electricity', icon: '⚡',
    status: 'stalled', completion: 35,
    budget: '₦60B (est.)', contractor: 'DISPUTED',
    startDate: 'Nov 2020', targetDate: 'Nov 2025', revisedDate: 'STALLED',
    description: 'Flagship 300MW independent power project. ₦8B consumed. Contractor dispute halted work August 2022. No resolution in 2+ years. Governor has expressed no clear timeline for restart.',
    source: 'NERC; Bayelsa State Power Authority; Punch 2022',
    milestones: [
      { date: 'Nov 2020', label: 'MOU signed — 5-year target',    done: true  },
      { date: 'Jun 2021', label: 'Site preparation begins',       done: true  },
      { date: 'Aug 2022', label: '⚠ STALLED — contractor dispute',done: false },
      { date: 'Dec 2024', label: 'Still unresolved — 2 years on', done: false },
    ],
  },
  {
    id: '1000-schools', name: '"1000 Schools" Emergency Education Plan',
    location: 'All 8 LGAs', sector: 'Education', icon: '📚',
    status: 'stalled', completion: 43,
    budget: '₦22B', contractor: 'Multiple',
    startDate: 'Jan 2022', targetDate: 'Dec 2024', revisedDate: 'Unknown',
    description: 'Promised rehabilitation of 1,000 schools across Bayelsa. Only 214 schools completed as of December 2023 — 57% short of target. No updated timeline published.',
    source: 'UBEC; BudgIT; Bayelsa Govt',
    milestones: [
      { date: 'Jan 2022', label: 'Plan announced publicly',       done: true  },
      { date: 'Jun 2023', label: '150 schools completed',         done: true  },
      { date: 'Dec 2023', label: '214/500 target reached',        done: true  },
      { date: 'Dec 2024', label: 'Final 500 deadline (missed)',   done: false },
    ],
  },
  {
    id: 'glory-drive', name: 'Glory Drive Expansion (Phase 2 & 3)',
    location: 'Yenagoa', sector: 'Roads', icon: '🛣️',
    status: 'completed', completion: 100,
    budget: '₦4.8B', contractor: 'RCC Nigeria',
    startDate: 'Apr 2021', targetDate: 'Dec 2022', revisedDate: 'Mar 2023',
    description: 'Expansion of the main commercial corridor in Yenagoa. Completed March 2023 — slightly behind original target but ultimately delivered. Improved traffic flow and commercial activity.',
    source: 'Bayelsa State Ministry of Public Works',
    milestones: [
      { date: 'Apr 2021', label: 'Construction begins',           done: true },
      { date: 'Dec 2022', label: 'Target slightly missed',        done: true },
      { date: 'Mar 2023', label: '✓ Completed & commissioned',    done: true },
    ],
  },
  {
    id: 'imiringi-turbine', name: 'Imiringi Gas Turbine Refurbishment',
    location: 'Imiringi, Ogbia LGA', sector: 'Electricity', icon: '⚡',
    status: 'completed', completion: 100,
    budget: '₦2.1B', contractor: 'GE Nigeria',
    startDate: 'Jan 2021', targetDate: 'Jun 2021', revisedDate: 'Aug 2021',
    description: 'Refurbishment of existing Imiringi gas turbine to restore partial power generation. Completed August 2021. Added limited capacity to state grid.',
    source: 'Bayelsa State Govt; NERC',
    milestones: [
      { date: 'Jan 2021', label: 'Works begin',                   done: true },
      { date: 'Aug 2021', label: '✓ Completed & commissioned',    done: true },
    ],
  },
  {
    id: 'health-insurance', name: 'Bayelsa Health Insurance Scheme',
    location: 'State-wide', sector: 'Health', icon: '🏥',
    status: 'completed', completion: 100,
    budget: '₦8B', contractor: 'NHIA Scheme',
    startDate: 'Mar 2021', targetDate: 'Dec 2022', revisedDate: 'Feb 2023',
    description: 'State health insurance scheme expanded to cover more Bayelsa residents. Reduces out-of-pocket healthcare costs. One of the administration\'s genuine social welfare wins.',
    source: 'Bayelsa State Govt; NHIA',
    milestones: [
      { date: 'Mar 2021', label: 'Scheme design begins',          done: true },
      { date: 'Jun 2022', label: 'Pilot in 3 LGAs',              done: true },
      { date: 'Feb 2023', label: '✓ State-wide rollout complete', done: true },
    ],
  },
]

// ── REVENUE ──────────────────────────────────────────────────────────────────

export const REVENUE_SOURCES = [
  { name: 'FAAC Statutory Allocation',  value: 180, pct: 47.4, color: '#1B4FC4', description: 'Federal Account Allocation Committee — Bayelsa\'s share of the federation account based on population, land mass, equality of states, and social development factors.' },
  { name: '13% Oil Derivation Fund',    value: 165, pct: 43.4, color: '#C97400', description: 'Constitutional 13% of on-shore oil revenue returned to oil-producing states. Bayelsa is 2nd highest recipient after Delta State. Received ₦320.45B in 2025 (significant YoY jump).' },
  { name: 'IGR (Internally Generated)', value: 15.3,pct: 4.0,  color: '#008751', description: 'Revenue generated within Bayelsa from taxes, fees, levies, and fines. Critically low at 4% of total revenue — dangerously oil-dependent.' },
  { name: 'Federal Grants & Aids',      value: 12,  pct: 3.2,  color: '#6B3FA0', description: 'Grants from federal government ministries, NDDC allocations, and international development partners (World Bank, USAID, UNICEF).' },
  { name: 'Other / Capital Receipts',   value: 7.7, pct: 2.0,  color: '#0D132D', description: 'Loan repayments, asset disposals, miscellaneous receipts.' },
]

export const IGR_BREAKDOWN = [
  { name: 'Personal Income Tax',  value: 6.2, pct: 41, color: '#0D132D' },
  { name: 'Fees & Levies',        value: 3.8, pct: 25, color: '#1B4FC4' },
  { name: 'Mineral/Natural Res.', value: 2.1, pct: 14, color: '#C97400' },
  { name: 'Fines & Penalties',    value: 1.4, pct: 9,  color: '#008751' },
  { name: 'Land Use Charge',      value: 1.1, pct: 7,  color: '#6B3FA0' },
  { name: 'Others',               value: 0.7, pct: 4,  color: '#7A8799' },
]

export const REVENUE_TREND = [
  { year: '2020', faac: 148, derivation: 62,  igr: 9.1,  total: 225 },
  { year: '2021', faac: 158, derivation: 78,  igr: 10.4, total: 254 },
  { year: '2022', faac: 162, derivation: 112, igr: 11.8, total: 294 },
  { year: '2023', faac: 170, derivation: 140, igr: 13.2, total: 332 },
  { year: '2024', faac: 180, derivation: 165, igr: 15.3, total: 380 },
]

export const IGR_POTENTIAL = [
  { source: 'Digital Tax Collection (Lagos model)',  currentMonthly: 1.3, potentialMonthly: 5.2, gap: 3.9 },
  { source: 'Property & Land Use Tax',               currentMonthly: 0.09, potentialMonthly: 1.5, gap: 1.41 },
  { source: 'Tourism & Hospitality Levies',          currentMonthly: 0.08, potentialMonthly: 0.8, gap: 0.72 },
  { source: 'Fisheries & Aquaculture Licensing',     currentMonthly: 0.05, potentialMonthly: 0.6, gap: 0.55 },
  { source: 'Gas Royalties & Domestic Monetisation', currentMonthly: 0.15, potentialMonthly: 2.1, gap: 1.95 },
]

export const EXPENDITURE_BREAKDOWN = [
  { name: 'Recurrent (Salaries & Admin)', value: 228, pct: 60 },
  { name: 'Capital (Infrastructure)',     value: 114, pct: 30 },
  { name: 'Debt Servicing',               value: 28,  pct: 7  },
  { name: 'Social Transfers',             value: 10,  pct: 3  },
]

// ── OIL MONEY ────────────────────────────────────────────────────────────────

export const OIL_REVENUE_FLOW = [
  { stage: 'Oil extracted from Bayelsa land', value: 100, label: '~$6–8B/yr est.', note: 'Bayelsa produces 23.4% of Nigeria\'s 2.2M bpd' },
  { stage: 'NNPC Opex & Joint Venture costs', value: 82,  label: '~18% deducted', note: 'Operating costs deducted before federation account' },
  { stage: 'Enters Federation Account',        value: 74,  label: '74% of gross',  note: 'FAAC distributes from here' },
  { stage: 'Federal Govt takes (52.68%)',      value: 39,  label: '52.68%',         note: 'Largest single share — federal programmes, Abuja overhead' },
  { stage: 'All 36 States share (26.72%)',     value: 20,  label: '26.72%',         note: 'Bayelsa gets ~1.8% of this (based on formula)' },
  { stage: 'All 774 LGAs share (20.60%)',      value: 15,  label: '20.60%',         note: 'Bayelsa\'s 8 LGAs get a fraction' },
  { stage: '13% Derivation to oil states',     value: 10,  label: '~13%',           note: 'Bayelsa gets ~25% of this pool' },
  { stage: 'Total returning to Bayelsa State', value: 8,   label: '~8% of gross',   note: 'Only ~8 cents of every ₦1 extracted returns to Bayelsa' },
]

export const NNPC_BOARD = [
  { name: 'Bashir Bayo Ojulari', role: 'Group CEO', zone: 'South-West', state: 'Ondo', ethnic: 'Yoruba', type: 'executive' },
  { name: 'Ahmadu Musa Kida',    role: 'Non-Exec. Chairman', zone: 'North-East', state: 'Adamawa', ethnic: 'Fulani', type: 'non-exec' },
  { name: 'Bello Rabiu',         role: 'Non-Exec. Director', zone: 'North-West', state: 'Kano', ethnic: 'Hausa', type: 'non-exec' },
  { name: 'Yusuf Usman',         role: 'Non-Exec. Director', zone: 'North-East', state: 'Borno', ethnic: 'Kanuri', type: 'non-exec' },
  { name: 'Babs Omotowa',        role: 'Non-Exec. Director', zone: 'North-Central', state: 'Kwara', ethnic: 'N/A', type: 'non-exec' },
  { name: 'Austin Avuru',        role: 'Non-Exec. Director', zone: 'South-South', state: 'Rivers', ethnic: 'Ijaw (Kalabari)', type: 'non-exec', note: 'Only South-South rep — covers 6 states, 90% of Nigeria\'s oil' },
  { name: 'David Ige',           role: 'Non-Exec. Director', zone: 'South-West', state: 'Lagos', ethnic: 'Yoruba', type: 'non-exec' },
  { name: 'Henry Obih',          role: 'Non-Exec. Director', zone: 'South-East', state: 'Imo', ethnic: 'Igbo', type: 'non-exec' },
  { name: 'Lydia Shehu Jafiya',  role: 'Perm. Sec., Finance', zone: 'North', state: 'Taraba', ethnic: 'N/A', type: 'ministry' },
  { name: 'Aminu Said Ahmed',    role: 'Ministry of Petroleum Rep.', zone: 'North', state: 'N/A', ethnic: 'N/A', type: 'ministry' },
]

export const OIL_COMPANIES = [
  {
    name: 'SPDC (Shell)', fullName: 'Shell Petroleum Development Company',
    ownership: [
      { entity: 'NNPC',  pct: 55, color: '#0D132D' },
      { entity: 'Shell', pct: 30, color: '#D4A000' },
      { entity: 'Total', pct: 10, color: '#E63946' },
      { entity: 'Agip',  pct: 5,  color: '#008751' },
    ],
    nigeriaPct: '~38% of Bayelsa production',
    annualRevEstimate: '$3–4B from Bayelsa assets',
    communitySpend: '~$36M (1997 figure — not updated)',
    keyIssue: 'SPDC responsible for the majority of Bayelsa\'s 47 active oil spill sites. Claimed sale of onshore assets to Renaisance in 2024 — communities fear abandonment without remediation.',
  },
  {
    name: 'NAOC (Agip)', fullName: 'Nigerian Agip Oil Company (Eni)',
    ownership: [
      { entity: 'NNPC',  pct: 60, color: '#0D132D' },
      { entity: 'Agip',  pct: 20, color: '#008751' },
      { entity: 'ConocoPhillips', pct: 20, color: '#1B4FC4' },
    ],
    nigeriaPct: '~25% of Bayelsa production',
    annualRevEstimate: '$1.5–2B from Bayelsa assets',
    communitySpend: 'Not publicly disclosed',
    keyIssue: 'Responsible for multiple spills in Nembe and Ogbia LGAs. NOSDRA has documented several unreported spills. JV partner with NNPC means government directly profits while communities suffer.',
  },
]

// ── CORRUPTION ───────────────────────────────────────────────────────────────

export const CORRUPTION_CASES = [
  {
    id: 1, governor: 'Diepreye Alamieyeseigha', term: '1999–2005',
    amount: '$55M+ embezzled / £1M cash seized', status: 'convicted',
    severity: 'red', agency: 'EFCC + London Metropolitan Police',
    charge: 'Money laundering, embezzlement of public funds',
    outcome: 'Pleaded guilty 2007. Assets seized. Controversially pardoned by President Jonathan in 2013.',
    detail: 'British police found £1M in cash at his London home in 2005. EFCC charged him with embezzling ~$55M in public funds and approving ₦1.7B in dubious contracts to eight fictitious companies.',
    source: 'HRW; EFCC; BBC; Amnesty International',
  },
  {
    id: 2, governor: 'Timipre Sylva', term: '2008–2012',
    amount: '₦6.46B alleged', status: 'prosecution',
    severity: 'amber', agency: 'EFCC',
    charge: 'Alleged misappropriation of state funds',
    outcome: '48+ properties seized by EFCC. Case ongoing as of last reports. Sylva went on to become Federal Minister of State for Petroleum (2019–2023).',
    detail: 'EFCC is prosecuting former Governor Sylva for alleged misappropriation of ₦6.46 billion in Bayelsa State funds during his tenure.',
    source: 'EFCC; Vanguard; Premium Times',
  },
  {
    id: 3, governor: 'Henry Seriake Dickson (aide)', term: '2012–2020',
    amount: '₦864M', status: 'prosecution',
    severity: 'amber', agency: 'EFCC Port Harcourt Zone',
    charge: 'Procurement fraud via shell company',
    outcome: 'Former SSA Embelekpo Apere arraigned on 10 counts before Federal High Court Yenagoa. Case pending.',
    detail: 'Former SSA on MDGs to Gov. Dickson charged alongside three others with ₦864M procurement fraud through shell company Oriazy Global Link Limited.',
    source: 'EFCC; Premium Times 2021',
  },
  {
    id: 4, governor: 'Douye Diri administration', term: '2020–present',
    amount: 'Undisclosed — under investigation', status: 'investigation',
    severity: 'amber', agency: 'ICPC',
    charge: 'Alleged corrupt practices by state public functionaries',
    outcome: 'Bayelsa State govt went to Federal High Court in 2022 to BLOCK ICPC from accessing financial records. Court dismissed the challenge — ICPC investigation continues.',
    detail: 'ICPC is investigating corruption allegations against current and former public functionaries in Bayelsa. Critically, the Diri administration attempted to legally obstruct ICPC access to government financial records in 2022 — the court sided with ICPC. The attempted obstruction itself raises serious accountability concerns.',
    source: 'ICPC; Premium Times April 2022; PRNigeria',
  },
  {
    id: 5, governor: 'All administrations (systemic)', term: 'Ongoing',
    amount: '₦45B+ unspent FY2024 alone', status: 'systemic',
    severity: 'red', agency: 'BudgIT / Civil Society',
    charge: 'Budget execution failure — possible misappropriation',
    outcome: 'No public accountability mechanism for unspent budgets exists. Funds allocated to roads, electricity, and environment consistently go "missing" from execution.',
    detail: '₦45B+ was allocated in FY2024 but never reached the projects it was budgeted for. Under Nigerian fiscal law, unspent capital allocations that are not returned to the Consolidated Revenue Fund must be accounted for. No public explanation has been provided for the Roads sector\'s ₦43.1B execution gap.',
    source: 'BudgIT FY2024 Budget Implementation Report; IPSAS Nigeria',
  },
  {
    id: 6, governor: 'NDDC (Niger Delta Dev. Commission)', term: '2000–present',
    amount: '₦1.5T+ unaccounted (national)', status: 'investigation',
    severity: 'red', agency: 'National Assembly; EFCC; Forensic Audit',
    charge: 'Systemic fraud and non-execution of Niger Delta projects',
    outcome: 'Forensic audit ordered by Buhari in 2019 uncovered staggering fraud. NDDC meant to develop Bayelsa but has largely failed. Projects ghost-billed for decades.',
    detail: 'The NDDC was created specifically to develop the Niger Delta, including Bayelsa. A 2019 forensic audit found over ₦1.5T in unaccounted expenditure nationwide. Bayelsa communities meant to benefit from NDDC roads, waterways, and electricity projects have seen little delivery.',
    source: 'National Assembly NDDC Probe 2020; Sahara Reporters; Vanguard',
  },
]

// ── RESEARCH PAPERS ──────────────────────────────────────────────────────────

export const RESEARCH_PAPERS = [
  {
    id: 1, year: 2006, type: 'Government Commission Report',
    title: 'An Environmental Genocide: Report of the Bayelsa State Oil and Environmental Commission',
    authors: 'Bayelsa State Oil and Environmental Commission',
    url: 'https://report.bayelsacommission.org/',
    summary: 'Comprehensive government commission documenting the environmental devastation caused by oil companies in Bayelsa. Covers health impacts, economic losses to fishing communities, and the systematic failure of the Nigerian state to protect its citizens from oil exploitation.',
    keyFinding: '47+ active spill sites. Bayelsa communities receive less than 1% of the economic value extracted from their land.',
    tags: ['Environment', 'Oil', 'Human Rights', 'Government'],
    relevance: 'critical',
  },
  {
    id: 2, year: 2019, type: 'Academic Thesis',
    title: 'Corruption in Oil Revenue Distribution and Conflict in Bayelsa State, Nigeria',
    authors: 'Kennesaw State University — International Conflict Management',
    url: 'https://digitalcommons.kennesaw.edu/incmdoc_etd/1/',
    summary: 'Academic study examining how corruption in the oil revenue distribution system — at both federal and state levels — directly fuels armed conflict and community unrest in Bayelsa. Examines the FAAC formula, derivation fund, and how misappropriation compounds resource injustice.',
    keyFinding: 'Corruption in revenue distribution is a primary driver of armed conflict in Bayelsa. The 13% derivation fund does not reach communities.',
    tags: ['Corruption', 'Revenue', 'Conflict', 'Governance'],
    relevance: 'critical',
  },
  {
    id: 3, year: 2022, type: 'Peer-Reviewed Journal Article',
    title: 'Oil Pollution and Conflicts in the Niger Delta: A Study of SPDC in Bayelsa and Rivers State',
    authors: 'ResearchGate (peer reviewed)',
    url: 'https://www.researchgate.net/publication/359932196',
    summary: 'Examines how Shell Petroleum Development Company operations in Bayelsa and Rivers States have caused systematic environmental degradation and triggered community conflicts through oil spills, gas flaring, and hazardous waste discharge.',
    keyFinding: 'SPDC is the primary driver of environmental conflicts in Bayelsa. Communities receive no meaningful compensation relative to extraction value.',
    tags: ['Oil Spills', 'Shell', 'Environment', 'Conflict'],
    relevance: 'high',
  },
  {
    id: 4, year: 2023, type: 'Peer-Reviewed Journal Article',
    title: 'Maladaptation to Environmental Pollution: The Livelihood Dysfunction Trap in Nigeria\'s Niger Delta',
    authors: 'Cambridge Core — Africa Journal',
    url: 'https://www.cambridge.org/core/journals/africa/article/maladaptation-to-environmental-pollution',
    summary: 'Examines how Niger Delta communities — including in Bayelsa — have been forced to adapt to oil pollution rather than remediate it, creating a "livelihood dysfunction trap" where communities normalise devastation.',
    keyFinding: 'State inaction on oil spills forces communities into maladaptive coping strategies that permanently entrench poverty.',
    tags: ['Environment', 'Poverty', 'Livelihoods', 'Fisheries'],
    relevance: 'high',
  },
  {
    id: 5, year: 2025, type: 'Peer-Reviewed Journal Article',
    title: 'Socio-Economic and One-Health Impacts of Pollution-Induced Land Dispossession in the Niger Delta',
    authors: 'ScienceDirect — One Health journal',
    url: 'https://www.sciencedirect.com/science/article/pii/S2949823625001400',
    summary: 'The most recent study (2025) documenting ongoing oil spill devastation in the Niger Delta, covering Bayelsa specifically. Documents extensive degradation of aquatic ecosystems, collapse of fisheries-based livelihoods, and direct health impacts from contamination.',
    keyFinding: 'Oil pollution in Bayelsa is functionally equivalent to forced displacement. Fishing communities face an existential threat with no government response.',
    tags: ['Health', 'Environment', 'Land Rights', '2025'],
    relevance: 'critical',
  },
  {
    id: 6, year: 2025, type: 'Peer-Reviewed Journal Article',
    title: 'The Framing of the Informal Oil Economy in Nigeria: Toward Epistemic Justice',
    authors: 'Nature — Humanities and Social Sciences Communications',
    url: 'https://www.nature.com/articles/s41599-025-05718-7',
    summary: 'Examines how government neglect of Niger Delta communities has driven the rise of artisanal and illegal oil refining as a survival strategy. Argues for a justice-based lens rather than pure criminalisation.',
    keyFinding: 'Artisanal oil refining in Bayelsa is a direct consequence of government neglect and the failure of oil wealth to reach communities.',
    tags: ['Informal Economy', 'Youth', 'Justice', '2025'],
    relevance: 'medium',
  },
  {
    id: 7, year: 2021, type: 'Academic Paper',
    title: 'Insecurity in Bayelsa State: The Issues, Actors and Solutions',
    authors: 'Academia.edu',
    url: 'https://www.academia.edu/62070191/Insecurity_in_Bayelsa_State_The_Issues_Actors_and_Solutions',
    summary: 'Comprehensive analysis of security challenges in Bayelsa — linking oil pollution, political marginalisation, and youth unemployment to armed conflict. Identifies state failure to address root causes as the core problem.',
    keyFinding: 'Environmental degradation and political marginalisation are the root causes of Bayelsa\'s security challenges — not inherent community violence.',
    tags: ['Security', 'Governance', 'Youth', 'Marginalisation'],
    relevance: 'high',
  },
]

// ── TIMELINE ─────────────────────────────────────────────────────────────────

export const TIMELINE = [
  { date: 'Feb 2020', label: 'Gov. Diri inaugurated — first term begins', type: 'milestone' },
  { date: 'Jun 2020', label: '₦500M flood relief fund promised for 2020 victims', type: 'promise' },
  { date: 'Nov 2020', label: 'Bayelsa Power Company MOU signed — 300MW, 5-year target', type: 'promise' },
  { date: 'Mar 2021', label: 'Yenagoa–Oporoma Road begins (3-year deadline given)', type: 'milestone' },
  { date: 'Oct 2021', label: 'Flood relief funds not fully disbursed — legislative inquiry opened', type: 'failure' },
  { date: 'Jan 2022', label: '"1000 Schools" Emergency Education Plan announced', type: 'promise' },
  { date: 'Apr 2022', label: 'Diri govt goes to court to block ICPC investigation — court rules against state', type: 'failure' },
  { date: 'Aug 2022', label: 'Bayelsa Power Company stalled — contractor dispute unresolved', type: 'failure' },
  { date: 'Oct 2022', label: 'Worst flooding in a decade — 1.3M+ residents displaced', type: 'event' },
  { date: 'Feb 2023', label: 'Re-elected for second term (2023–2028)', type: 'milestone' },
  { date: 'Jun 2023', label: 'New IGR target of ₦28B by 2025 announced publicly', type: 'promise' },
  { date: 'Sep 2023', label: 'Promise: "Zero active oil spill sites by 2025" at press conference', type: 'promise' },
  { date: 'Dec 2023', label: 'Only 214 of 500 targeted schools rehabilitated — 57% short', type: 'failure' },
  { date: 'Mar 2024', label: 'Yenagoa–Oporoma Road: 60% complete, 2 years behind schedule', type: 'failure' },
  { date: 'Sep 2024', label: 'IGR ₦15.3B — 45% below ₦28B target with 4 months remaining', type: 'failure' },
  { date: 'Oct 2024', label: '60MW gas turbine construction begins at Elebele', type: 'milestone' },
  { date: 'Dec 2024', label: 'Gas turbine misses December deadline — Diri expresses disappointment', type: 'failure' },
  { date: 'Mar 2025', label: 'Tinubu inauguration of gas turbine announced', type: 'milestone' },
]

// ── BRIGHT SPOTS ─────────────────────────────────────────────────────────────

export const BRIGHT_SPOTS = [
  { icon: '🏆', label: 'NWFL Champions 2024/25',     detail: 'Bayelsa Queens FC — 6th national title, CAF Women\'s Champions League qualification', color: '#008751' },
  { icon: '🥇', label: 'NSF 2025 Medals Table #1',   detail: 'Team Bayelsa topped the National Sports Festival medals table 2025',                  color: '#008751' },
  { icon: '🏖️', label: 'Brass Beach — W. Africa class',detail: 'One of the longest sand beaches in West Africa. Eco-tourism potential unrealised.',   color: '#1B4FC4' },
  { icon: '⛽', label: '23.4% of Nigeria\'s Oil',    detail: 'Bayelsa produces nearly a quarter of Nigeria\'s total oil output — foundational wealth', color: '#C97400' },
  { icon: '🔥', label: '18 TCF Gas Reserve',          detail: 'Nigeria\'s largest gas reservoir — largely unmonetised but a massive asset',           color: '#C97400' },
  { icon: '📖', label: '86.83% Literacy Rate',         detail: '11th highest in Nigeria — above the national average',                                 color: '#0D132D' },
]

export const GOVERNOR_WINS = [
  { label: 'Vanguard Good Governance Award 2024', detail: 'Recognised for infrastructure, healthcare, education, and sports development.', icon: '🏅' },
  { label: 'Salary Arrears Cleared', detail: 'Cleared all inherited salary and pension arrears from the previous administration.', icon: '✅' },
  { label: 'Angiama Bridge (85% complete)', detail: 'Near-completion connectivity breakthrough for isolated Southern Ijaw communities.', icon: '🌉' },
  { label: '60MW Gas Turbine (99%)', detail: 'Near-complete power plant at Elebele — Tinubu set to inaugurate. Tangible electricity milestone.', icon: '⚡' },
  { label: 'Bayelsa Health Insurance', detail: 'Expanded state health insurance scheme — reducing out-of-pocket costs for residents.', icon: '🏥' },
  { label: '2025 Budget: ₦690B', detail: '"Assured Prosperity" budget — largest in state history. 2026 approaching ₦1 trillion.', icon: '📈' },
  { label: 'Tech Colleges in Every LGA', detail: 'Vocational colleges under construction in all 8 LGAs — skills-first education approach.', icon: '🎓' },
  { label: 'Sports Dominance', detail: 'Bayelsa Queens NWFL champions. Team Bayelsa tops NSF 2025. Cash rewards for athletes.', icon: '🥇' },
]
