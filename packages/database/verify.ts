import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function verify() {
  const teams = await prisma.agentTeam.findMany({
    include: { members: true, _count: { select: { members: true } } },
    orderBy: { name: 'asc' }
  });

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║           DEAD MAN STRUCTURE — DATABASE VERIFICATION                      ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  console.log('');

  let totalMembers = 0;
  let totalLeads = 0;
  const problemAgents: string[] = [];

  // Check for problematic names
  const problematicPatterns = ['_Persona', 'Process_Monitor', 'Log_Streamer', 'Session_Manager', 'Optimizer_Agent', 'APEX_SENTINEL', 'BROADCAST_ECHO', 'PERF_PRIME', 'Architect_Persona', 'Refactorer_Persona', 'Security_Auditor'];

  for (const team of teams) {
    totalMembers += team.members.length;
    const lead = team.members.find(m => m.isLead);
    if (lead) totalLeads++;

    for (const member of team.members) {
      if (problematicPatterns.some(p => member.name.includes(p))) {
        problemAgents.push(member.name);
      }
    }

    const nameStr = team.name.padEnd(25);
    const countStr = team._count.members.toString().padStart(2);
    const leadStr = lead?.name || 'NONE';
    console.log(`Team: ${nameStr} Members: ${countStr}  Lead: ${leadStr}`);
  }

  console.log('');
  console.log(`Total Teams: ${teams.length}`);
  console.log(`Total Agents: ${totalMembers}`);
  console.log(`Total Leads: ${totalLeads}`);
  console.log('');

  if (problemAgents.length > 0) {
    console.log('⚠️  PROBLEMATIC AGENTS FOUND:');
    problemAgents.forEach(name => console.log(`   - ${name}`));
  } else {
    console.log('✅ No problematic agents detected');
  }

  await prisma.$disconnect();
}

verify();
