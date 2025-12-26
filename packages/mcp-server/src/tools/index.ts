/**
 * MCP Tools Registration
 *
 * All tools are READ-ONLY with Zod validation (BLACKOUT Team requirement)
 */

import { z } from 'zod';
import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { logger } from '@repo/logger';

/**
 * Tool: Get Agent Information
 * Security: Read-only access to agent roster
 */
const getAgentsSchema = z.object({
  team: z.string().optional().describe('Filter by team name'),
  role: z.string().optional().describe('Filter by role'),
});

async function getAgents(args: unknown) {
  const { team, role } = getAgentsSchema.parse(args);

  // Query database (read-only)
  const agents = [
    {
      id: 'general',
      name: 'The General',
      role: 'Supreme Commander',
      team: 'Command',
      status: 'active',
    },
    {
      id: 'nexus',
      name: 'NEXUS',
      role: 'Neural Core Lead',
      team: 'NEURAL CORE',
      status: 'active',
    },
    // ... more agents from database
  ];

  if (team) {
    return agents.filter(a => a.team.toLowerCase().includes(team.toLowerCase()));
  }
  if (role) {
    return agents.filter(a => a.role.toLowerCase().includes(role.toLowerCase()));
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(agents, null, 2),
    }],
  };
}

/**
 * Tool: Get Mission Information
 * Security: Read-only access to mission status
 */
const getMissionsSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETE', 'FAILED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
});

async function getMissions(args: unknown) {
  const { status, priority } = getMissionsSchema.parse(args);

  const missions = [
    {
      id: 'mcp-integration',
      codeName: 'MCP_INTEGRATION',
      description: 'Implement Model Context Protocol server',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      progress: 75,
    },
  ];

  if (status) {
    return missions.filter(m => m.status === status);
  }
  if (priority) {
    return missions.filter(m => m.priority === priority);
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(missions, null, 2),
    }],
  };
}

/**
 * Tool: Get Knowledge Base
 * Security: Read-only access to knowledge
 */
const getKnowledgeSchema = z.object({
  topic: z.string().optional().describe('Filter by topic'),
  category: z.string().optional().describe('Filter by category'),
});

async function getKnowledge(args: unknown) {
  const { topic, category } = getKnowledgeSchema.parse(args);

  // Query knowledge base
  const knowledge = [
    {
      topic: 'MCP',
      category: 'Protocol',
      description: 'Model Context Protocol for agent interoperability',
      source: 'AI Engineer Summit',
    },
    {
      topic: 'GEPA',
      category: 'Architecture',
      description: 'Graph Enhanced Prompt Architecture',
      source: 'Internal Research',
    },
  ];

  if (topic) {
    return knowledge.filter(k => k.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify(knowledge, null, 2),
    }],
  };
}

/**
 * Register all tools with the MCP server
 */
export async function registerTools(server: Server): Promise<void> {
  // Register tools list handler
  // @ts-ignore - MCP SDK type mismatch
  server.setRequestHandler('tools/list', async () => ({
    tools: [
      {
        name: 'get_agents',
        description: 'Get information about Dead Man Structure agents. Filter by team or role.',
        inputSchema: {
          type: 'object',
          properties: {
            team: { type: 'string', description: 'Filter by team name' },
            role: { type: 'string', description: 'Filter by role' },
          },
        },
      },
      {
        name: 'get_missions',
        description: 'Get information about active missions. Filter by status or priority.',
        inputSchema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETE', 'FAILED'],
              description: 'Filter by mission status',
            },
            priority: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
              description: 'Filter by priority',
            },
          },
        },
      },
      {
        name: 'get_knowledge',
        description: 'Query the Dead Man Structure knowledge base. Filter by topic or category.',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Filter by topic' },
            category: { type: 'string', description: 'Filter by category' },
          },
        },
      },
    ],
  }));

  // Register tool call handlers
  // @ts-ignore - MCP SDK type mismatch
  server.setRequestHandler('tools/call', async (request: any) => {
    const { name, arguments: args } = request.params;

    logger.info(`[MCP] Tool called: ${name}`, { args });

    switch (name) {
      case 'get_agents':
        return await getAgents(args);
      case 'get_missions':
        return await getMissions(args);
      case 'get_knowledge':
        return await getKnowledge(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });

  logger.info('[MCP] Tools registered: get_agents, get_missions, get_knowledge');
}
