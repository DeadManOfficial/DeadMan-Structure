/**
 * MCP Resources Registration
 *
 * Resources provide passive data access (no side effects)
 */

import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { logger } from '@repo/logger';

/**
 * Register all resources with the MCP server
 */
export async function registerResources(server: Server): Promise<void> {
  // Register resources list handler
  // @ts-ignore - MCP SDK type mismatch
  server.setRequestHandler('resources/list', async () => ({
    resources: [
      {
        uri: 'dms:///structure',
        name: 'Dead Man Structure Organization',
        description: 'Complete organizational structure of all teams and agents',
        mimeType: 'application/json',
      },
      {
        uri: 'dms:///status',
        name: 'Operational Status',
        description: 'Current operational status of all teams',
        mimeType: 'application/json',
      },
    ],
  }));

  // Register resource read handlers
  // @ts-ignore - MCP SDK type mismatch
  server.setRequestHandler('resources/read', async (request: any) => {
    const { uri } = request.params;

    logger.info(`[MCP] Resource requested: ${uri}`);

    switch (uri) {
      case 'dms:///structure':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({
                teams: [
                  { name: 'Command', lead: 'The General', agents: 1 },
                  { name: 'NEURAL CORE', lead: 'NEXUS', agents: 12 },
                  { name: 'BLACKOUT', lead: 'SPECTRE', agents: 6 },
                  { name: 'APEX', lead: 'APEX PRIME', agents: 20 },
                  { name: 'CRUCIBLE', lead: 'VALIDATOR', agents: 3 },
                  // ... all teams
                ],
                totalAgents: 162,
                totalTeams: 20,
              }, null, 2),
            },
          ],
        };

      case 'dms:///status':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({
                status: 'OPERATIONAL',
                timestamp: new Date().toISOString(),
                activeMissions: 15,
                completedMissions: 127,
                overallHealth: 'GREEN',
              }, null, 2),
            },
          ],
        };

      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  });

  logger.info('[MCP] Resources registered: structure, status');
}
