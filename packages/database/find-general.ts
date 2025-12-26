import { prisma } from './src/index.ts';

async function findGeneral() {
  const teams = await prisma.agentTeam.findMany();
  const members = await prisma.agentMember.findMany();
  
  console.log('=== TEAMS ===');
  for (const t of teams) {
    console.log(`Team: ${t.name} (ID: ${t.id})`);
  }
  
  console.log('\n=== MEMBERS ===');
  for (const m of members) {
    console.log(`Member: ${m.name} | Team: ${m.teamId} | Lead: ${m.isLead}`);
  }
  
  console.log('\n=== THE GENERAL SEARCH ===');
  const general = members.find(m => m.name.includes('General') || m.name === 'The General');
  if (general) {
    console.log('FOUND:', general);
  } else {
    console.log('The General not found in database - needs to be seeded');
  }
}

findGeneral().finally(() => prisma.$disconnect());
