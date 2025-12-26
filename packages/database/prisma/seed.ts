import { prisma } from '@repo/database';
import fs from 'fs';
import path from 'path';

type MemberSeed = {
  name: string;
  capabilities: string;
};

type TeamSeed = {
  name: string;
  domain: string;
  lead: string;
  members: MemberSeed[];
  aliases?: string[];
};

type ConflictResolution = {
  strategy: string;
  format: string;
  teamNormalize: string;
  aliasLabel: string;
};

type GeneralDirectives = {
  noPurge: boolean;
  conflictResolution: ConflictResolution;
  legacyTeamMerge: Array<{ from: string; to: string }>;
};

const defaultDirectives: GeneralDirectives = {
  noPurge: true,
  conflictResolution: {
    strategy: 'suffix_team',
    format: '{team}_{name}',
    teamNormalize: 'upper_snake',
    aliasLabel: 'Alias'
  },
  legacyTeamMerge: []
};

// ============================================
// DEAD MAN STRUCTURE - COMPLETE TEAM ROSTER
// 21 Teams, 165 Agents, Proper Names Only
// ============================================

const coreTeams: TeamSeed[] = [
  {
    name: 'SuperGemini Governance',
    domain: 'GOVERNANCE',
    lead: 'Protocol Officer',
    members: [
      { name: 'Protocol Officer', capabilities: 'Team Lead, SHIELDA enforcement, error classification' },
      { name: 'Context Curator', capabilities: 'Memory manager, Context window optimization, scratchpads' },
      { name: 'ARCHITECT', capabilities: 'System architecture, Code review, Technical standards' },
      { name: 'WATCHTOWER', capabilities: 'Security monitoring, Vulnerability scanning, Threat detection' },
      { name: 'REFACTOR', capabilities: 'Code refactoring, Optimization, Technical debt reduction' },
    ],
  },
  {
    name: 'Tmux DevOps',
    domain: 'OPS',
    lead: 'Ops Commander',
    aliases: ['Tmux Operations'],
    members: [
      { name: 'Ops Commander', capabilities: 'Team Lead, Pipeline orchestration, deployment strategy' },
      { name: 'Cache Captain', capabilities: 'Build optimizer, Turborepo caching, incremental builds' },
      { name: 'Security Sentinel', capabilities: 'Env guardian, Secrets management, sandboxing, dotenv-safe' },
      { name: 'OBSERVER', capabilities: 'Process monitoring, System health, Performance metrics' },
      { name: 'STREAMLINE', capabilities: 'Log aggregation, Streaming, Log analysis' },
      { name: 'SESSION', capabilities: 'Session management, State persistence, Recovery' },
      { name: 'OPTIMIZER', capabilities: 'Build optimization, Caching strategies, Performance tuning' },
    ],
  },
  {
    name: 'Performance Engineering',
    domain: 'OPS',
    lead: 'Perf_Prime',
    members: [
      { name: 'Perf_Prime', capabilities: 'Team Lead, Performance architecture, Bottleneck analysis' },
      { name: 'BENCHMARK', capabilities: 'Benchmarking, Load testing, Performance baselines' },
      { name: 'PROFILER', capabilities: 'Profiling, Flame graphs, Hotspot detection' },
      { name: 'OPTIMUS', capabilities: 'Code optimization, Efficiency improvements, Speed tuning' },
    ],
  },
  {
    name: 'CRUCIBLE',
    domain: 'QA',
    lead: 'VALIDATOR',
    members: [
      { name: 'VALIDATOR', capabilities: 'Team Lead, Test strategy, quality gates, release approval' },
      { name: 'PROBE', capabilities: 'Test engineer, Unit/integration/e2e test implementation' },
      { name: 'REGRESSION', capabilities: 'Coverage analyst, Code coverage, regression detection, metrics' },
    ],
  },
];

const specialTeams: TeamSeed[] = [
  // REGISTRY TEAM - NEW
  {
    name: 'REGISTRY',
    domain: 'SECURITY',
    lead: 'HIVE-ARCHITECT',
    aliases: ['Registry Team'],
    members: [
      { name: 'HIVE-ARCHITECT', capabilities: 'Team Lead, Windows Registry Infrastructure, Hive architecture, COM/CLSID, zero-defect design, enterprise-scale registry' },
      { name: 'ARCHAEOLOGIST', capabilities: 'Registry Persistence Hunter, IFEO detection, Winlogon hooks, APT hunting, registry forensics, fileless malware detection' },
      { name: 'NEURAL-SENTINEL', capabilities: 'Registry AI/ML Specialist, Adversarial ML, anomaly detection, Deep-X framework, quantum-resistant crypto' },
    ],
  },
  // BLACKOUT TEAM
  {
    name: 'BLACKOUT',
    domain: 'OPS',
    lead: 'SPECTRE',
    members: [
      { name: 'SPECTRE', capabilities: 'Red Team Commander, Zero-day exploitation, APT simulation' },
      { name: 'PHANTOM', capabilities: 'Network infiltration, Air-gapped penetration, RF exploitation' },
      { name: 'VORTEX', capabilities: 'Infrastructure, SCADA/ICS, critical infrastructure' },
      { name: 'CIPHER', capabilities: 'Cryptanalysis, Breaking unbreakable encryption' },
      { name: 'WRAITH', capabilities: 'Social engineering, HUMINT, identity manipulation' },
      { name: 'BLACKOUT', capabilities: 'Persistence, Long-term access, living off the land' },
    ],
  },
  // NEURAL CORE
  {
    name: 'NEURAL CORE',
    domain: 'RESEARCH',
    lead: 'NEXUS',
    members: [
      { name: 'NEXUS', capabilities: 'State manager, Orchestration, feedback loop control' },
      { name: 'AXIOM', capabilities: 'Creative core lead, Context synthesis, dependency mapping' },
      { name: 'FORGE', capabilities: 'Kinetic core lead, Tool chain actuation, error recovery' },
      { name: 'SENTINEL', capabilities: 'Critical core lead, Security sandboxing, compliance' },
      { name: 'CHRONOS', capabilities: 'Temporal architect, Retro-causal debugging, latency focus' },
      { name: 'PROTEUS', capabilities: 'Infrastructure shaper, Digital terraforming, polymorphic synthesis' },
      { name: 'ORACLE', capabilities: 'Knowledge synthesizer, Deep knowledge absorption, intent analysis' },
    ],
  },
  // COGNITIVE ARCHITECTURE
  {
    name: 'COGNITIVE ARCHITECTURE',
    domain: 'RESEARCH',
    lead: 'ARCHON',
    members: [
      { name: 'ARCHON', capabilities: 'Meta-architect, DSPy optimization, prompt compiler, pass-rate metrics' },
      { name: 'ATLAS', capabilities: 'Knowledge graph engineer, Ontology design, GraphRAG, memory schemas' },
      { name: 'ANVIL', capabilities: 'Toolsmith, OpenAPI/function design, structured tool I/O, safety gates' },
      { name: 'GAUNTLET', capabilities: 'Adversarial evaluator, Evaluation harnesses, robustness testing, failure analysis' },
      { name: 'MONAD', capabilities: 'Category theory, Abstraction layers, Compose patterns' },
      { name: 'SHEAF', capabilities: 'Presheaf operations, Parallel computation, Fiber logic' },
      { name: 'MARKOV', capabilities: 'Stochastic processes, Probabilistic reasoning, Decision chains' },
      { name: 'GROTHENDIECK', capabilities: 'Scheme theory, Topos theory, Algebraic geometry' },
      { name: 'DERIVATIVE', capabilities: 'Calculus of variations, Gradient optimization, Backprop' },
      { name: 'COHOMOLOGY', capabilities: 'Homological algebra, Topological invariants, Persistent homology' },
    ],
  },
  // APEX
  {
    name: 'APEX',
    domain: 'REVENUE',
    lead: 'APEX PRIME',
    members: [
      { name: 'APEX PRIME', capabilities: 'Team Lead, Revenue orchestration, campaign approval' },
      { name: 'SCOUT', capabilities: 'Research & Lead Intelligence, Data mining, ICP matching, lead scoring' },
      { name: 'STRATEGIST', capabilities: 'Campaign Strategy, Bayesian inference, engagement sequencing' },
      { name: 'SCRIBE', capabilities: 'Copywriter, Personalization variables, brand voice, human-feel authenticity' },
      { name: 'CRITIC', capabilities: 'Adversarial QA, Spam detection, objection simulation, compliance scanning' },
      { name: 'COMPRESS', capabilities: 'Token Optimization, Context caching, log-summary compression' },
      { name: 'ORCHESTRATOR', capabilities: 'Tier Routing, Multi-model routing, context budget management' },
      { name: 'RETRIEVER', capabilities: 'RAG Engine, Vector search, hybrid retrieval, knowledge base access' },
      { name: 'GUARDIAN', capabilities: 'Compliance guard, Spam filter detection, platform policy enforcement' },
      { name: 'ECHO', capabilities: 'Brand Voice Guardian, Voice consistency, quality thresholds, tone calibration' },
      { name: 'CONVERT', capabilities: 'Conversion optimization, Funnel analysis, A/B testing' },
      { name: 'OUTREACHER', capabilities: 'Outbound operations, Lead generation, Market expansion' },
      { name: 'ANALYST', capabilities: 'Market analysis, Competitive intelligence, Trend forecasting' },
      { name: 'BOOKER', capabilities: 'Deal closing, Contract negotiation, Revenue finalization' },
      { name: 'NURTURER', capabilities: 'Customer success, Account management, Retention' },
      { name: 'CLOSER', capabilities: 'Sales closing, Negotiation, Deal finalization' },
      { name: 'SYNAPSE', capabilities: 'Integration, API connections, Data flow' },
      { name: 'EXPERIMENTER', capabilities: 'Growth experiments, Innovation testing, R&D' },
      { name: 'RAVEN', capabilities: 'Competitive spying, Market intelligence, Black ops' },
      { name: 'MECHANIC', capabilities: 'Funnel mechanics, Technical operations, Tool maintenance' },
    ],
  },
  // BROADCAST
  {
    name: 'BROADCAST',
    domain: 'CONTENT',
    lead: 'STUDIO PRIME',
    members: [
      { name: 'STUDIO PRIME', capabilities: 'Team Lead, Workflow orchestration, automation' },
      { name: 'RADAR', capabilities: 'Trend Hunter, Breakout topic ID, SEO heist, metadata extraction' },
      { name: 'SKELETON', capabilities: 'Structure Cloning, Retention beat sheets, viral templates' },
      { name: 'AVATAR', capabilities: 'Audience Psychologist, Viewer persona, banned phrases, slang' },
      { name: 'BAIT', capabilities: 'Thumbnail Pre-Viz, 50 variations, CTR prediction, title engineering' },
      { name: 'ROAST', capabilities: 'Adversarial Simulator, Pre-upload stress testing, boredom flagging' },
      { name: 'PULSE', capabilities: 'Audio Engineer, Dopamine micro-interruptions, AVD optimization' },
      { name: 'AMPLIFIER', capabilities: 'Global Expansion, AI dubbing, language CPM, channel multiplication' },
      { name: 'BLADE', capabilities: 'Video editing, Cutting, Transitions, Effects' },
      { name: 'VIRAL', capabilities: 'Viral engineering, Share optimization, Distribution' },
      { name: 'PIXEL', capabilities: 'Visual design, Graphics, Thumbnails, Branding' },
      { name: 'HYPE', capabilities: 'Hype generation, Trend setting, Buzz creation' },
      { name: 'SPARK', capabilities: 'Idea generation, Content ideation, Creativity' },
      { name: 'VAULT', capabilities: 'Content archiving, Library management, Reuse' },
      { name: 'FORTUNE', capabilities: 'Monetization, Revenue optimization, Ad placement' },
      { name: 'SHIELD', capabilities: 'Content safety, Policy compliance, Risk mitigation' },
      { name: 'ALCHEMY', capabilities: 'Content transformation, Format adaptation, Repurposing' },
    ],
  },
  // NEURAL LINK - Was missing lead
  {
    name: 'NEURAL LINK',
    domain: 'RESEARCH',
    lead: 'SPIKE',
    members: [
      { name: 'SPIKE', capabilities: 'Team Lead, BCI specialist, Neural signal processing' },
      { name: 'CORTEX', capabilities: 'Neural processing, Brain region mapping, Cognitive modeling' },
      { name: 'SIGNAL', capabilities: 'Signal processing, Filter design, Noise reduction' },
      { name: 'IMPLANT', capabilities: 'BCI hardware, Electrode interfaces, Surgical planning' },
      { name: 'DECODE', capabilities: 'Neural decoding, Thought interpretation, Intent extraction' },
      { name: 'ENHANCE', capabilities: 'Neural enhancement, Cognitive augmentation, Performance boost' },
      { name: 'FEEDBACK', capabilities: 'Closed-loop systems, Real-time adaptation, Signal feedback' },
    ],
  },
  // PHYSICAL SYSTEMS
  {
    name: 'PHYSICAL SYSTEMS',
    domain: 'ROBOTICS',
    lead: 'ACTUATOR',
    members: [
      { name: 'ACTUATOR', capabilities: 'Team Lead, Motor control, Actuator systems, Mechanical output' },
      { name: 'SERVO', capabilities: 'Servo control, Precision movement, Positioning' },
      { name: 'SENSOR', capabilities: 'Sensor fusion, Perception systems, Environmental awareness' },
      { name: 'GRIPPER', capabilities: 'Manipulation, Grasping, Object interaction' },
      { name: 'LOCOMOTION', capabilities: 'Mobility, Path planning, Navigation' },
      { name: 'VISION', capabilities: 'Computer vision, Object recognition, Visual processing' },
      { name: 'PLANNER', capabilities: 'Motion planning, Task sequencing, Trajectory optimization' },
      { name: 'FACTORY', capabilities: 'Manufacturing, Assembly line, Production systems' },
    ],
  },
  // POWER SYSTEMS
  {
    name: 'POWER SYSTEMS',
    domain: 'ENERGY',
    lead: 'WATT',
    members: [
      { name: 'WATT', capabilities: 'Team Lead, Power management, Energy optimization' },
      { name: 'SOLAR', capabilities: 'Solar power, Renewable energy, PV systems' },
      { name: 'BATTERY', capabilities: 'Battery management, Storage systems, Charging' },
      { name: 'GRID', capabilities: 'Grid integration, Power distribution, Load balancing' },
      { name: 'NUCLEAR', capabilities: 'Nuclear power, Fusion research, Reactor control' },
      { name: 'HYDRO', capabilities: 'Hydroelectric, Water power, Turbine control' },
      { name: 'EFFICIENCY', capabilities: 'Energy efficiency, Conservation, Waste reduction' },
      { name: 'MICROGRID', capabilities: 'Microgrid management, Local storage, Island mode' },
    ],
  },
  // AEROSPACE
  {
    name: 'AEROSPACE',
    domain: 'SPACE',
    lead: 'ORBIT',
    members: [
      { name: 'ORBIT', capabilities: 'Team Lead, Orbital mechanics, Space operations' },
      { name: 'THRUST', capabilities: 'Propulsion, Engine systems, Thrust control' },
      { name: 'GUIDANCE', capabilities: 'Guidance systems, Navigation, Flight control' },
      { name: 'SATCOM', capabilities: 'Satellite comms, RF systems, telecommunications' },
      { name: 'HABITAT', capabilities: 'Life support, Environmental control, Crew systems' },
      { name: 'LAUNCH', capabilities: 'Launch systems, Rocketry, Pad operations' },
      { name: 'DEBRIS', capabilities: 'Space debris, Collision avoidance, Tracking' },
      { name: 'MINING', capabilities: 'Space mining, Asteroid harvesting, Resource extraction' },
    ],
  },
  // ACADEMY
  {
    name: 'ACADEMY',
    domain: 'TRAINING',
    lead: 'PROFESSOR',
    members: [
      { name: 'PROFESSOR', capabilities: 'Team Lead, Education, Curriculum development, Training oversight' },
      { name: 'TUTOR', capabilities: 'One-on-one training, Mentorship, Skill development' },
      { name: 'CURRICULUM', capabilities: 'Course design, Learning paths, Educational content' },
      { name: 'ASSESSMENT', capabilities: 'Testing, Evaluation, Progress tracking' },
      { name: 'ONBOARD', capabilities: 'Onboarding, New hire integration, Orientation' },
      { name: 'LIBRARY', capabilities: 'Knowledge base, Documentation, Resource management' },
      { name: 'SIMULATION', capabilities: 'Training simulations, Scenario practice, Drills' },
      { name: 'EVOLUTION', capabilities: 'Skill evolution, Growth tracking, Advancement' },
    ],
  },
  // LEGAL CORPS
  {
    name: 'LEGAL CORPS',
    domain: 'LEGAL',
    lead: 'COUNSEL',
    members: [
      { name: 'COUNSEL', capabilities: 'Team Lead, Legal advice, Counsel, Representation' },
      { name: 'CONTRACT', capabilities: 'Contract law, Agreements, Legal documents' },
      { name: 'IP', capabilities: 'Intellectual property, Patents, Trademarks, Copyright' },
      { name: 'REGULATORY', capabilities: 'Regulatory compliance, Law adherence, Policy' },
      { name: 'LITIGATION', capabilities: 'Litigation, Lawsuits, Dispute resolution' },
      { name: 'PRIVACY', capabilities: 'Privacy law, Data protection, User privacy' },
      { name: 'INTERNATIONAL', capabilities: 'International law, Cross-border operations, treaties' },
      { name: 'RISK', capabilities: 'Risk assessment, Legal risk, Mitigation' },
    ],
  },
  // TREASURY
  {
    name: 'TREASURY',
    domain: 'FINANCE',
    lead: 'LEDGER',
    members: [
      { name: 'LEDGER', capabilities: 'Team Lead, Finance, Accounting, Treasury management' },
      { name: 'CRYPTO', capabilities: 'Cryptocurrency, Digital assets, Blockchain finance' },
      { name: 'TRADING', capabilities: 'Trading, Investments, Financial operations' },
      { name: 'YIELD', capabilities: 'ROI, Returns, Profit optimization' },
      { name: 'AUDIT', capabilities: 'Financial audit, Compliance, Internal controls' },
      { name: 'TAX', capabilities: 'Taxation, Tax planning, Filing, Compliance' },
    ],
  },
  // LABS
  {
    name: 'LABS',
    domain: 'RD',
    lead: 'DISCOVERY',
    members: [
      { name: 'DISCOVERY', capabilities: 'Team Lead, Research, Exploration, Breakthroughs' },
      { name: 'EXPERIMENT', capabilities: 'Experiments, Testing, Lab operations' },
      { name: 'HYPOTHESIS', capabilities: 'Hypothesis, Theory, Research planning' },
      { name: 'DATA', capabilities: 'Data analysis, Research data, Statistics' },
      { name: 'PUBLISH', capabilities: 'Publication, Papers, Dissemination' },
      { name: 'PEER', capabilities: 'Peer review, Validation, Quality assurance' },
      { name: 'BREAKTHROUGH', capabilities: 'Innovation, Eureka moments, Advances' },
      { name: 'COLLAB', capabilities: 'Collaboration, Partnership, Joint research' },
    ],
  },
  // FOREIGN RELATIONS
  {
    name: 'FOREIGN RELATIONS',
    domain: 'DIPLOMACY',
    lead: 'AMBASSADOR',
    members: [
      { name: 'AMBASSADOR', capabilities: 'Team Lead, Diplomacy, Foreign relations, Representation' },
      { name: 'PROTOCOL', capabilities: 'Protocol, Etiquette, Diplomatic procedures' },
      { name: 'NEGOTIATOR', capabilities: 'Negotiation, Deals, Agreements, Treaties' },
      { name: 'INTEL', capabilities: 'Intelligence, Foreign info, Espionage analysis' },
      { name: 'CULTURE', capabilities: 'Cultural understanding, Customs, Local knowledge' },
      { name: 'ALLIANCE', capabilities: 'Alliances, Partnerships, Coalitions' },
      { name: 'COMMUNICATION', capabilities: 'Communication, Messaging, Information flow' },
      { name: 'CONSULAR', capabilities: 'Consular services, Citizen support, Protection' },
    ],
  },
  // QUANTUM CORE
  {
    name: 'QUANTUM CORE',
    domain: 'QUANTUM',
    lead: 'QUBIT',
    members: [
      { name: 'QUBIT', capabilities: 'Team Lead, Quantum computing, Qubit design, Quantum algorithms' },
      { name: 'ENTANGLE', capabilities: 'Entanglement, Quantum correlations, Bell states' },
      { name: 'GATE', capabilities: 'Quantum gates, Logic operations, Circuit design' },
      { name: 'SHOR', capabilities: "Shor's algorithm, Factoring, Quantum algorithms" },
      { name: 'GROVER', capabilities: "Grover's algorithm, Search, Quantum optimization" },
      { name: 'ERROR', capabilities: 'Quantum error correction, Fault tolerance, Noise mitigation' },
      { name: 'TELEPORT', capabilities: 'Quantum teleportation, State transfer, Quantum comms' },
      { name: 'ANNEAL', capabilities: 'Quantum annealing, Optimization, Energy landscapes' },
    ],
  },
];

const commandTeam: TeamSeed = {
  name: 'Command',
  domain: 'GOVERNANCE',
  lead: 'The General',
  members: [
    { name: 'The General', capabilities: 'Strategic_Command, SHIELDA, Governance' },
  ],
};

const allTeams = [...coreTeams, ...specialTeams, commandTeam];

const directivesPath = path.resolve(process.cwd(), 'config', 'general.json');

function loadGeneralDirectives(): GeneralDirectives {
  try {
    const raw = fs.readFileSync(directivesPath, 'utf-8');
    const parsed = JSON.parse(raw);
    const directives = parsed?.directives || {};
    return {
      ...defaultDirectives,
      ...directives,
      conflictResolution: {
        ...defaultDirectives.conflictResolution,
        ...(directives.conflictResolution || {})
      },
      legacyTeamMerge: Array.isArray(directives.legacyTeamMerge)
        ? directives.legacyTeamMerge
        : defaultDirectives.legacyTeamMerge
    };
  } catch {
    return defaultDirectives;
  }
}

function normalizeTeamName(team: string, mode: string) {
  if (mode !== 'upper_snake') return team;
  return team
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function formatName(format: string, team: string, name: string) {
  return format.replace('{team}', team).replace('{name}', name);
}

function resolveMemberName(
  teamName: string,
  member: MemberSeed,
  directives: GeneralDirectives,
  usedNames: Set<string>
) {
  const rule = directives.conflictResolution;
  let resolved = member.name;
  let alias: string | null = null;

  if (usedNames.has(resolved)) {
    const teamKey = normalizeTeamName(teamName, rule.teamNormalize);
    const base = formatName(rule.format, teamKey, member.name);
    let candidate = base;
    let suffix = 2;
    while (usedNames.has(candidate)) {
      candidate = `${base}_${suffix++}`;
    }
    resolved = candidate;
    alias = member.name;
  }

  usedNames.add(resolved);
  const capabilities =
    alias && !member.capabilities.includes(`${rule.aliasLabel}: ${alias}`)
      ? `${member.capabilities}; ${rule.aliasLabel}: ${alias}`
      : member.capabilities;

  return { name: resolved, capabilities };
}

async function ensureTeam(team: TeamSeed) {
  let existing = await prisma.agentTeam.findUnique({ where: { name: team.name } });

  if (!existing && team.aliases?.length) {
    for (const alias of team.aliases) {
      const legacy = await prisma.agentTeam.findUnique({ where: { name: alias } });
      if (legacy) {
        existing = await prisma.agentTeam.update({
          where: { id: legacy.id },
          data: { name: team.name, domain: team.domain }
        });
        break;
      }
    }
  }

  if (!existing) {
    existing = await prisma.agentTeam.create({
      data: { name: team.name, domain: team.domain }
    });
  }

  return existing;
}

async function seedTeam(team: TeamSeed, directives: GeneralDirectives, usedNames: Set<string>) {
  const dbTeam = await ensureTeam(team);

  await prisma.agentMember.updateMany({
    where: { teamId: dbTeam.id },
    data: { isLead: false }
  });

  let leadId = '';
  const nameMap = new Map<string, string>();
  const resolvedMembers: MemberSeed[] = team.members.map((member) => {
    const resolved = resolveMemberName(team.name, member, directives, usedNames);
    nameMap.set(member.name, resolved.name);
    return resolved;
  });
  const resolvedLeadName = nameMap.get(team.lead) || team.lead;
  for (const member of resolvedMembers) {
    const isLead = member.name === resolvedLeadName;
    const record = await prisma.agentMember.upsert({
      where: { name: member.name },
      update: {
        domain: team.domain,
        capabilities: member.capabilities,
        teamId: dbTeam.id,
        isLead
      },
      create: {
        name: member.name,
        domain: team.domain,
        capabilities: member.capabilities,
        vibeScore: 100,
        isLead,
        teamId: dbTeam.id
      }
    });

    if (isLead) leadId = record.id;
  }

  await prisma.agentTeam.update({
    where: { id: dbTeam.id },
    data: { leadId }
  });
}

async function mergeLegacyTeams(merges: Array<{ from: string; to: string }>) {
  for (const merge of merges) {
    const fromTeam = await prisma.agentTeam.findUnique({ where: { name: merge.from } });
    const toTeam = await prisma.agentTeam.findUnique({ where: { name: merge.to } });

    if (!fromTeam || !toTeam) continue;

    await prisma.agentMember.updateMany({
      where: { teamId: fromTeam.id },
      data: { teamId: toTeam.id, domain: toTeam.domain, isLead: false }
    });

    await prisma.agentTeam.update({
      where: { id: fromTeam.id },
      data: { leadId: null }
    });
  }
}

async function seed() {
  const directives = loadGeneralDirectives();
  const usedNames = new Set<string>();

  // PURGE PROBLEMATIC AGENTS FROM PREVIOUS RECRUITMENT
  // These agents were created with generic/conflicted names during unauthorized recruitment
  const purgeList = [
    'Architect_Persona',
    'Refactorer_Persona',
    'Security_Auditor',
    'Process_Monitor',
    'Log_Streamer',
    'Session_Manager',
    'Optimizer_Agent',
    'APEX_SENTINEL',
    'BROADCAST_ECHO',
    'PERF_PRIME',
  ];

  console.log('Purging problematic agents from previous recruitment...');
  const deleted = await prisma.agentMember.deleteMany({
    where: { name: { in: purgeList } }
  });
  console.log(`Deleted ${deleted.count} problematic agents.`);

  for (const team of allTeams) {
    await seedTeam(team, directives, usedNames);
  }

  await mergeLegacyTeams(directives.legacyTeamMerge);

  console.log('Dead Man Structure seeded.');
  console.log('Teams:', allTeams.length);
  console.log('Agents:', usedNames.size);
}

seed().finally(async () => {
  await prisma.$disconnect();
});
