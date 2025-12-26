# Dead Man Structure MCP Server

Model Context Protocol server exposing Dead Man Structure tools and resources.

## Features

- **Read-Only Tools**: All tools are read-only with Zod validation (BLACKOUT approved)
- **Agent Query**: Query agent roster by team or role
- **Mission Status**: Check mission status and priority
- **Knowledge Base**: Query DMS knowledge base
- **Resources**: Passive data access to structure and status

## Security

- ✅ Read-only access (no write capabilities)
- ✅ Zod input validation
- ✅ Local stdio transport (no network exposure)
- ✅ No secrets or API keys required

## Usage

### Running the Server

```bash
npm run dev
```

### Testing with Claude Desktop

1. Open Claude Desktop Settings
2. Go to Developer > Edit MCP Config
3. Add:

```json
{
  "mcpServers": {
    "dead-man-structure": {
      "command": "node",
      "args": ["/path/to/Gemini_HQ/packages/mcp-server/dist/index.js"]
    }
  }
}
```

4. Restart Claude Desktop
5. Available tools: `get_agents`, `get_missions`, `get_knowledge`

## Available Tools

### get_agents
Get information about Dead Man Structure agents.

**Parameters:**
- `team` (optional): Filter by team name
- `role` (optional): Filter by role

### get_missions
Get information about active missions.

**Parameters:**
- `status` (optional): PENDING, IN_PROGRESS, COMPLETE, FAILED
- `priority` (optional): LOW, MEDIUM, HIGH, CRITICAL

### get_knowledge
Query the Dead Man Structure knowledge base.

**Parameters:**
- `topic` (optional): Filter by topic
- `category` (optional): Filter by category

## Resources

- `dms:///structure`: Complete organizational structure
- `dms:///status`: Current operational status

## Team Approval

- ✅ NEURAL CORE: Technical feasibility confirmed
- ✅ BLACKOUT: Security requirements met
- ✅ CRUCIBLE: Test coverage included
- ✅ TREASURY: $0.00 cost confirmed
- ✅ ARCHITECT PRIME: Clean architectural fit
- ✅ ACADEMY: Documentation complete

## Cost

**Total: $0.00**
- Software: Free (MIT License)
- Infrastructure: Runs on existing hardware
- No API subscriptions required
