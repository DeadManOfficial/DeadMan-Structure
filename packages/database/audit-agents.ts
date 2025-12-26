import { prisma } from './src/index.ts';

async function auditAgents() {
  const members = await prisma.agentMember.findMany({
    include: { team: true }
  });
  
  console.log('=== AGENT AUDIT ===');
  console.log('Total agents:', members.length);
  
  const lowVibe = members.filter(m => m.vibeScore < 90);
  const noCapabilities = members.filter(m => !m.capabilities || m.capabilities.length < 10);
  const genericNames = members.filter(m => m.name.includes('_'));
  
  console.log('\nLOW VIBE SCORE (<90):', lowVibe.length);
  lowVibe.forEach(m => console.log('  -', m.name, ':', m.vibeScore, '(', m.team?.name, ')'));
  
  console.log('\nNO/LIMITED CAPABILITIES:', noCapabilities.length);
  noCapabilities.forEach(m => console.log('  -', m.name, ':', m.capabilities, '(', m.team?.name, ')'));
  
  console.log('\nGENERIC/CONFLICTED NAMES:', genericNames.length);
  genericNames.forEach(m => console.log('  -', m.name, '(', m.team?.name, ')'));
  
  console.log('\n=== ALL AGENTS BY TEAM ===');
  const teams = await prisma.agentTeam.findMany({
    include: { members: true },
    orderBy: { name: 'asc' }
  });
  
  teams.forEach(t => {
    console.log('\n[' + t.name + '] -', t.members.length, 'agents');
    t.members.forEach(m => {
      const lead = m.isLead ? '*' : ' ';
      console.log(' ', lead, m.name, '(vibe:', m.vibeScore + ')');
    });
  });
}

auditAgents().finally(() => prisma.$disconnect());
