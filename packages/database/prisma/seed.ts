import { prisma } from '@repo/database';

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

const legacyTeamMerges: Array<{ from: string; to: string }> = [
  { from: 'Performance Engineering', to: 'Tmux DevOps' },
];

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

async function seedTeam(team: TeamSeed) {
  const dbTeam = await ensureTeam(team);

  await prisma.agentMember.updateMany({
    where: { teamId: dbTeam.id },
    data: { isLead: false }
  });

  let leadId = '';
  for (const member of team.members) {
    const isLead = member.name === team.lead;
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

async function mergeLegacyTeams() {
  for (const merge of legacyTeamMerges) {
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
  for (const team of allTeams) {
    await seedTeam(team);
  }

  await mergeLegacyTeams();

  console.log('Structure seeded.');
}

seed().finally(async () => {
  await prisma.$disconnect();
});
