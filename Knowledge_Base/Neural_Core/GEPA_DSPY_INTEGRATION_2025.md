# GEPA + DSPy INTEGRATION PLAN
**Date:** 2025-12-25
**Initiated By:** The General (Supreme Commander)
**Classification:** TOP SECRET // NEURAL CORE ONLY

---

## EXECUTIVE SUMMARY

Integration of **GEPA (Graph Enhanced Prompt Architecture)** and **DSPy (Declarative Self-improving Language Programs)** into Dead Man Structure's feedback loop and operational structure.

**Strategic Alignment:**
- ✅ Aligns with AI Engineer Summit findings (GraphRAG, Agentic Architecture)
- ✅ Enhances NEURAL CORE's reasoning capabilities
- ✅ Formalizes prompt optimization via DSPy teleprompters
- ✅ Enables knowledge graph integration for Knowledge_Base

---

## WHAT IS GEPA?

**Graph Enhanced Prompt Architecture (GEPA)** is an approach that enhances language model prompts by incorporating graph structures and relationships.

**Key Concepts:**
- **Knowledge Graphs:** Represent entities and their relationships as graph nodes/edges
- **Graph Traversal:** Use graph algorithms to find relevant context
- **Prompt Enhancement:** Inject graph-derived context into prompts
- **Dynamic Context:** Retrieve relevant knowledge based on query structure

**Benefits:**
- Better reasoning through relational context
- Reduced hallucinations (grounded in graph)
- Explainable decisions (trace graph paths)
- Efficient knowledge retrieval

---

## WHAT IS DSPy?

**DSPy** is a framework for programming with language models using declarative code rather than prompt engineering.

**Key Components:**
- **Signatures:** Declare input/output types (not prompts)
- **Modules:** Reusable LM components (like PyTorch)
- **Teleprompters:** Automatic prompt optimizers
- **Evaluators:** Metric-driven optimization

**Example:**
```python
import dspy

# Declare signature
class GenerateResponse(dspy.Signature):
    """Generate response to query."""
    query = dspy.InputField(desc="user query")
    context = dspy.InputField(desc="relevant context")
    response = dspy.OutputField(desc="generated response")

# Create module
responder = dspy.ChainOfThought(GenerateResponse)

# Optimize with teleprompter
teleprompter = dspy.BootstrapFewShot()
optimized_responder = teleprompter.compile(responder, trainset=training_data)
```

---

## INTEGRATION ARCHITECTURE

### Phase 1: Knowledge Graph Infrastructure

**Technology Stack:**
- **Neo4j** - Graph database (recommended)
- **NetworkX** - Python graph library (fallback)
- **Prisma** - ORM with graph extensions

**Schema Design:**
```cypher
// Nodes
(:Agent {name, role, capabilities})
(:Mission {codeName, status, priority})
(:Knowledge {topic, category, source})
(:Team {name, domain, leadId})
(:Tool {name, category, usage})

// Relationships
(:Agent)-[:MEMBER_OF]->(:Team)
(:Agent)-[:ASSIGNED_TO]->(:Mission)
(:Knowledge)-[:RELATES_TO]->(:Knowledge)
(:Agent)-[:SKILLED_IN]->(:Knowledge)
(:Mission)-[:REQUIRES]->(:Knowledge)
```

### Phase 2: GEPA Implementation

**File:** `packages/gepa/src/graph-enhanced-prompt.ts`

```typescript
import { Neo4j } from '@repo/database'

export class GraphEnhancedPrompt {
  constructor(private graph: Neo4j) {}

  async enhancePrompt(query: string, agentId: string): Promise<string> {
    // 1. Extract entities from query
    const entities = await this.extractEntities(query)

    // 2. Traverse graph for relevant context
    const context = await this.graph.traverse(`
      MATCH (a:Agent {id: $agentId})-[:SKILLED_IN]->(k:Knowledge)
      MATCH (k)-[:RELATES_TO*1..2]-(related:Knowledge)
      WHERE k.name IN $entities
      RETURN k, related
    `, { agentId, entities })

    // 3. Build enhanced prompt
    return `
      Query: ${query}

      Relevant Knowledge Context:
      ${context.map(k => `- ${k.name}: ${k.description}`).join('\n')}

      Relationships:
      ${context.relationships.map(r => `${r.from} --[${r.type}]--> ${r.to}`).join('\n')}

      Based on this knowledge graph context, provide a comprehensive response.
    `
  }
}
```

### Phase 3: DSPy Integration

**File:** `packages/dspy/src/optimizer.ts`

```python
import dspy
from dspy.teleprompt import BootstrapFewShot

# Define signatures
class AgentSignature(dspy.Signature):
    """Generate agent response with graph context."""
    query = dspy.InputField(desc="user query")
    graph_context = dspy.InputField(desc="knowledge graph context")
    agent_role = dspy.InputField(desc="agent's role")
    response = dspy.OutputField(desc="agent's response")

# Create agent modules
class GeneralAgent(dspy.Module):
    def forward(self, query, graph_context):
        return dspy.ChainOfThought(AgentSignature)(
            query=query,
            graph_context=graph_context,
            agent_role="Supreme Commander"
        )

class EngineerAgent(dspy.Module):
    def forward(self, query, graph_context):
        return dspy.ChainOfThought(AgentSignature)(
            query=query,
            graph_context=graph_context,
            agent_role="Code Quality Engineer"
        )

# Optimize with training data
def optimize_agents():
    teleprompter = BootstrapFewShot(max_labeled_demos=3)
    training_data = load_historical_conversations()

    optimized_general = teleprompter.compile(
        GeneralAgent(),
        trainset=training_data['general']
    )

    optimized_engineer = teleprompter.compile(
        EngineerAgent(),
        trainset=training_data['engineer']
    )

    return {
        'general': optimized_general,
        'engineer': optimized_engineer
    }
```

### Phase 4: Feedback Loop System

**File:** `apps/api/src/routes/feedback.routes.ts`

```typescript
import { GraphEnhancedPrompt } from '@repo/gepa'
import { optimizeAgents } from '@repo/dspy'

router.post('/api/feedback', async (req, res) => {
  const { query, agent, response, quality } = req.body

  // 1. Store feedback in knowledge graph
  await graph.create({
    type: 'Feedback',
    query,
    agent,
    response,
    quality,
    timestamp: Date.now()
  })

  // 2. Update agent's performance metrics
  await graph.query(`
    MATCH (a:Agent {name: $agent})
    SET a.feedbackCount = coalesce(a.feedbackCount, 0) + 1
    SET a.avgQuality = (
      (coalesce(a.avgQuality, 0) * (a.feedbackCount - 1) + $quality) /
      a.feedbackCount
    )
  `, { agent, quality })

  // 3. Trigger DSPy re-optimization if quality drops
  if (quality < 0.7) {
    await scheduleAgentReoptimization(agent)
  }

  res.json({ status: 'recorded' })
})
```

---

## DEPLOYMENT PLAN

### Week 1: Infrastructure
- [ ] Set up Neo4j instance
- [ ] Design graph schema
- [ ] Create initial knowledge graph from existing data
- [ ] Set up graph API endpoints

### Week 2: GEPA Implementation
- [ ] Implement GraphEnhancedPrompt class
- [ ] Create entity extraction service
- [ ] Build graph traversal algorithms
- [ ] Integrate with existing agents

### Week 3: DSPy Integration
- [ ] Install DSPy dependencies
- [ ] Define agent signatures
- [ ] Create training dataset from conversations
- [ ] Implement teleprompter optimization

### Week 4: Feedback Loop
- [ ] Create feedback collection API
- [ ] Implement quality metrics
- [ ] Set up automatic re-optimization triggers
- [ ] Deploy to NEURAL CORE team

---

## TEAM ASSIGNMENTS

**NEURAL CORE (NEXUS) - Lead**
- Implement GEPA architecture
- Optimize DSPy prompts
- Manage knowledge graph

**CRUCIBLE (VALIDATOR)**
- Create evaluation metrics
- Test prompt improvements
- Validate quality thresholds

**ACADEMY (PROFESSOR)**
- Document GEPA patterns
- Create DSPy training materials
- Update agent training curriculum

**BLACKOUT (SPECTRE)**
- Security review of graph access
- Test prompt injection resistance
- Validate no data leakage

---

## SUCCESS METRICS

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Response Quality** | +20% | Human evaluation |
| **Reasoning Accuracy** | +15% | Graph path analysis |
| **Hallucination Rate** | -30% | Fact-checking |
| **Prompt Optimization** | Automatic | DSPy teleprompter |
| **Knowledge Retrieval** | <100ms | Graph query time |

---

## NEXT STEPS

1. **IMMEDIATE:** Install Neo4j and set up knowledge graph
2. **TODAY:** Begin GEPA implementation in `/packages/gepa`
3. **THIS WEEK:** Integrate DSPy for agent optimization
4. **ONGOING:** Continuous feedback loop collection

---

**STATUS:** APPROVED BY THE GENERAL
**PRIORITY:** CRITICAL
**DEADLINE:** Week 4, 2025

*"We do not write prompts. We architect intelligence through graph structures and declarative optimization."*

— The General, Supreme Commander
