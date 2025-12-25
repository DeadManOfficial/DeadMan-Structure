import { prisma } from '@repo/database';
import { Result, ShieldaError } from '@repo/types';

export class DemocracyService {
  /**
   * Casts a vote from one agent to another within a team
   */
  static async castVote(voterId: string, candidateId: string, teamId: string): Promise<Result<boolean>> {
    try {
      // Execute entire voting process atomically to prevent race conditions
      return await prisma.$transaction(async (tx) => {
        // 1. Ensure both voter and candidate belong to the team
        const team = await tx.agentTeam.findUnique({
          where: { id: teamId },
          include: { members: true }
        });

        if (!team) throw new Error('TEAM_NOT_FOUND');

        const memberIds = team.members.map(m => m.id);
        if (!memberIds.includes(voterId) || !memberIds.includes(candidateId)) {
          throw new Error('INVALID_MEMBER');
        }

        // 2. Clear previous vote by this voter for this team
        await tx.vote.deleteMany({ where: { voterId, teamId } });

        // 3. Cast new vote
        await tx.vote.create({
          data: { voterId, candidateId, teamId }
        });

        // 4. Tally and update Lead (inline to maintain transactional integrity)
        const votes = await tx.vote.findMany({ where: { teamId } });

        const counts: Record<string, number> = {};
        votes.forEach(v => {
          counts[v.candidateId] = (counts[v.candidateId] || 0) + 1;
        });

        let newLeadId = '';
        let maxVotes = 0;

        for (const [id, count] of Object.entries(counts)) {
          if (count > maxVotes) {
            maxVotes = count;
            newLeadId = id;
          }
        }

        if (newLeadId) {
          await tx.agentTeam.update({
            where: { id: teamId },
            data: { leadId: newLeadId }
          });

          // Update member flags
          await tx.agentMember.updateMany({
            where: { teamId },
            data: { isLead: false }
          });
          await tx.agentMember.update({
            where: { id: newLeadId },
            data: { isLead: true }
          });
        }

        return { ok: true, value: true };
      });
    } catch (err: any) {
      if (err.message === 'TEAM_NOT_FOUND') return { ok: false, error: this.err('TEAM_NOT_FOUND', 'Team does not exist') };
      if (err.message === 'INVALID_MEMBER') return { ok: false, error: this.err('INVALID_MEMBER', 'Voter or Candidate not in team') };
      return { ok: false, error: this.err('VOTING_FAILED', err.message) };
    }
  }

  // Note: tallyVotes logic inlined into castVote transaction to prevent race conditions
  // Keeping method reference for potential future standalone use
  private static async tallyVotes(teamId: string) {
    // This method is now inline within castVote to ensure transactional integrity
    // Left as placeholder for potential non-transactional tally operations
  }

  private static err(code: string, message: string): ShieldaError {
    return { code, message, severity: 'MEDIUM' };
  }
}
