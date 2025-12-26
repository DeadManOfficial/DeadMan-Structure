# CLAUDE DESKTOP MCP SETUP - COMPLETE GUIDE
**Date:** 2025-12-25
**Status:** CONFIGURED AND READY

---

## ✅ SETUP STATUS

**MCP Server:** Built and ready
**Claude Config:** Created at `C:\Users\Administrator\AppData\Roaming\Claude\claude_desktop_config.json`
**Status:** Ready for connection

---

## 🔧 CONFIGURATION DETAILS

**File Location:**
```
C:\Users\Administrator\AppData\Roaming\Claude\claude_desktop_config.json
```

**Configuration:**
```json
{
  "mcpServers": {
    "dead-man-structure": {
      "command": "node",
      "args": [
        "C:\\Users\\Administrator\\Gemini_HQ\\packages\\mcp-server\\dist\\index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

## 🚀 HOW TO USE (Step by Step)

### **Step 1: Restart Claude Desktop**

**IMPORTANT:** You must restart Claude Desktop for it to pick up the new MCP configuration.

1. Close Claude Desktop completely (check system tray)
2. Reopen Claude Desktop
3. Claude will automatically load the MCP server

---

### **Step 2: Verify MCP Connection**

When you restart Claude Desktop, the MCP server will start automatically. You should see:

**In Claude Desktop logs (if enabled):**
```
[MCP] Starting Dead Man Structure MCP Server...
[MCP] Dead Man Structure MCP Server running on stdio
[MCP] Available tools: agents, missions, knowledge, teams
```

---

### **Step 3: Use the MCP Tools**

Once Claude Desktop is running with MCP, you can ask questions like:

#### **Example 1: Query Agents**
```
Show me all agents in the BLACKOUT team.
```

**Claude will:**
- Call the `get_agents` tool
- Filter by team: BLACKOUT
- Return agent information

---

#### **Example 2: Check Mission Status**
```
What's the status of our high-priority missions?
```

**Claude will:**
- Call the `get_missions` tool
- Filter by priority: HIGH
- Return mission status and progress

---

#### **Example 3: Query Knowledge**
```
What does our knowledge base say about MCP?
```

**Claude will:**
- Call the `get_knowledge` tool
- Filter by topic: MCP
- Return relevant knowledge entries

---

#### **Example 4: Strategic Question**
```
Which teams are available for a new urgent mission in Sector 7?
```

**Claude will:**
- Call `get_agents` to check availability
- Call `get_missions` to check current workload
- Cross-reference data
- Recommend teams for deployment

---

## 🎯 AVAILABLE TOOLS

When MCP is connected, Claude has access to these tools:

### **Tool 1: get_agents**
Get information about Dead Man Structure agents.

**Parameters:**
- `team` (optional): Filter by team name
- `role` (optional): Filter by role

**Example:**
```
"Show me all agents in the NEURAL CORE team."
"Which agents have 'Commander' in their role?"
```

---

### **Tool 2: get_missions**
Get information about active missions.

**Parameters:**
- `status` (optional): PENDING, IN_PROGRESS, COMPLETE, FAILED
- `priority` (optional): LOW, MEDIUM, HIGH, CRITICAL

**Example:**
```
"What missions are in progress?"
"Show me all CRITICAL priority missions."
```

---

### **Tool 3: get_knowledge**
Query the Dead Man Structure knowledge base.

**Parameters:**
- `topic` (optional): Filter by topic
- `category` (optional): Filter by category

**Example:**
```
"What do we know about GraphRAG?"
"Show me knowledge about security protocols."
```

---

## 🔍 TROUBLESHOOTING

### **Issue: Claude doesn't see the tools**

**Solution:**
1. Make sure you've fully restarted Claude Desktop
2. Check the config file path is correct: `C:\Users\Administrator\AppData\Roaming\Claude\claude_desktop_config.json`
3. Verify the MCP server exists: `C:\Users\Administrator\Gemini_HQ\packages\mcp-server\dist\index.js`

---

### **Issue: MCP server errors**

**Solution:**
1. Rebuild the MCP server:
   ```bash
   cd C:\Users\Administrator\emini_HQ\packages\mcp-server
   npm run build
   ```

2. Check dependencies are installed:
   ```bash
   cd C:\Users\Administrator\emini_HQ
   npm install
   ```

---

### **Issue: Tools return no data**

**Solution:**
This is expected initially - the tools have sample data. Once connected to the real database, they'll return actual agent/mission data.

---

## 📊 WHAT TO EXPECT

**When you ask Claude a question, you'll see:**

1. Claude will think about which tool to use
2. Claude will call the tool (you won't see this happen)
3. Claude will process the tool response
4. Claude will give you an answer based on your actual data

**Example conversation:**

```
You: Which BLACKOUT agents are available?

Claude: Let me query the Dead Man Structure database for you.

[CLAUDE CALLS: get_agents with team="BLACKOUT"]

Here are the available BLACKOUT agents:
• SPECTRE (Team Lead) - Status: ACTIVE
• GHOST - Status: ACTIVE
• PHANTOM - Status: ON MISSION

All agents have Level 4+ security clearance.
Would you like me to show their specific capabilities?
```

---

## 🎉 NEXT STEPS

Once you've confirmed Claude Desktop is connected to MCP:

1. **Test with simple queries:**
   - "Show me all teams"
   - "What's the status of our missions?"

2. **Try complex queries:**
   - "Which agents are available for a new urgent mission?"
   - "What does our knowledge base say about [topic]?"

3. **Use in decision-making:**
   - "Recommend agents for this mission based on their skills"
   - "Analyze our mission load across all teams"

---

## 📝 NOTES

- MCP server runs locally (stdio transport) - no network exposure
- All tools are read-only with Zod validation (security approved)
- Server starts automatically when Claude Desktop starts
- No manual configuration needed per conversation

---

## ✅ VERIFICATION CHECKLIST

Before using, verify:

- [ ] Claude Desktop has been restarted
- [ ] Config file exists at correct path
- [ ] MCP server dist files exist
- [ ] No errors in Claude Desktop startup

**All checked? You're ready to go!**

---

**GENERAL, YOUR MCP INTEGRATION IS OPERATIONAL.**

**Simply restart Claude Desktop and start commanding with intelligence.**

---

*"The future of command is not manual data retrieval—it's intelligent query and instant response. MCP makes that possible."*

— The General, Supreme Commander

**Classification: UNCLASSIFIED**
**Status: OPERATIONAL**
