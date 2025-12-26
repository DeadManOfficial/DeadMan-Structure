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
  legacyTeamMerge: [
    { from: 'Performance Engineering', to: 'Tmux DevOps' }
  ]
};

const coreTeams: TeamSeed[] = [
  {
    name: 'Automaker Architecture',
    domain: 'ENGINEERING',
    lead: 'Architect Prime',
    aliases: ['Automaker Core'],
    members: [
      { name: 'Architect Prime', capabilities: 'Team Lead, Monorepo structure, DDD boundaries, type system' },
      { name: 'Schema Sentinel', capabilities: 'Data Architect, Zod schemas, Prisma models, data validation' },
      { name: 'Module Master', capabilities: 'Package Manager, @repo/* packages, dependency management' },
    ],
  },
  {
    name: 'ShadCN Frontend',
    domain: 'FRONTEND',
    lead: 'Component Commander',
    aliases: ['ShadCN Stylists'],
    members: [
      { name: 'Component Commander', capabilities: 'Team Lead, Component architecture, composition patterns' },
      { name: 'Performance Prophet', capabilities: 'Optimizer, Tree shaking, lazy loading, RSC optimization' },
      { name: 'A11y Advocate', capabilities: 'Accessibility, Keyboard nav, ARIA, semantic HTML' },
    ],
  },
  {
    name: 'Figma Design',
    domain: 'DESIGN',
    lead: 'Design Director',
    members: [
      { name: 'Design Director', capabilities: 'Team Lead, Design tokens, Figma-to-code translation' },
      { name: 'Animation Artisan', capabilities: 'Motion design, Transitions, states, tailwindcss-animate' },
    ],
  },
  {
    name: 'SuperGemini Governance',
    domain: 'GOVERNANCE',
    lead: 'Protocol Officer',
    members: [
      { name: 'Protocol Officer', capabilities: 'Team Lead, SHIELDA enforcement, error classification' },
      { name: 'Context Curator', capabilities: 'Memory manager, Context window optimization, scratchpads' },
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
  {
    name: 'COGNITIVE ARCHITECTURE',
    domain: 'RESEARCH',
    lead: 'ARCHON',
    members: [
      { name: 'ARCHON', capabilities: 'Meta-architect, DSPy optimization, prompt compiler, pass-rate metrics' },
      { name: 'ATLAS', capabilities: 'Knowledge graph engineer, Ontology design, GraphRAG, memory schemas' },
      { name: 'ANVIL', capabilities: 'Toolsmith, OpenAPI/function design, structured tool I/O, safety gates' },
      { name: 'GAUNTLET', capabilities: 'Adversarial evaluator, Evaluation harnesses, robustness testing, failure analysis' },
    ],
  },
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
      { name: 'SENTINEL', capabilities: 'Compliance, Spam filter detection, platform policy enforcement' },
      { name: 'ECHO', capabilities: 'Brand Voice Guardian, Voice consistency, quality thresholds, tone calibration' },
    ],
  },
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
      { name: 'ECHO', capabilities: 'Global Expansion, AI dubbing, language CPM, channel multiplication' },
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
    const raw = fs.readFileSync(directivesPath, 'utf8');
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

  for (const team of allTeams) {
    await seedTeam(team, directives, usedNames);
  }

  await mergeLegacyTeams(directives.legacyTeamMerge);

  console.log('Structure seeded.');
}

seed().finally(async () => {
  await prisma.$disconnect();
});
