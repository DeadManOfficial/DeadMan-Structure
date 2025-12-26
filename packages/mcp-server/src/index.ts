#!/usr/bin/env node
/**
 * Dead Man Structure MCP Server
 *
 * Model Context Protocol server exposing DMS tools and resources
 * Security: Read-only access with Zod validation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';
import { registerResources } from './resources/index.js';
import { logger } from '@repo/logger';

const SERVER_INFO = {
  name: 'dead-man-structure',
  version: '1.0.0',
};

// @ts-ignore
const CAPABILITIES: any = {
  tools: {},
  resources: {},
};

async function main() {
  logger.info('[MCP] Starting Dead Man Structure MCP Server...');

  // Create MCP server
  const server = new Server(SERVER_INFO, CAPABILITIES);

  // Register tools (read-only, validated)
  await registerTools(server);

  // Register resources (passive data providers)
  await registerResources(server);

  // Error handling
  server.onerror = (error) => logger.error('[MCP] Server error:', error);

  // Start stdio transport (local, secure)
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('[MCP] Dead Man Structure MCP Server running on stdio');
  logger.info('[MCP] Available tools: agents, missions, knowledge, teams');
}

main().catch((error) => {
  logger.error('[MCP] Fatal error:', error);
  process.exit(1);
});
