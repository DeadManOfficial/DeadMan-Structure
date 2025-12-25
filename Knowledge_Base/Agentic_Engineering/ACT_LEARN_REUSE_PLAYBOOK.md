# Act-Learn-Reuse Playbook (Cognitive Architecture)

## Purpose
Define the operating pattern for the Cognitive Architecture Team: build a self-improving agent system that continuously acts, evaluates, learns, and reuses winning patterns.

## Sources
- https://agenticengineer.com/principled-ai-coding
- https://agenticengineer.com/tactical-agentic-coding
- https://www.youtube.com/@indydevdan
- https://github.com/jezweb/claude-skills
- https://github.com/fleurytian/awesome-claude-skills
- https://github.com/brennercruvinel/CCPlugins
- https://github.com/search?q=claude+dev&type=repositories&p=2

## Key Takeaways (Summarized)
- Principles over tools: the course framing emphasizes clear context, choosing the right model, and prompt design as the core leverage.
- Shift from "how" to "what": focus on defining the target outcome and letting agents handle the heavy lifting.
- Engineer is the bottleneck: agentic coding pushes beyond manual prompting by building loops, evaluation, and reuse.
- System-first thinking: build the machine that evolves its own inputs, not just one-off features.

## Act-Learn-Reuse Loop (Gemini HQ)
1. ACT: Execute tasks with constrained tool interfaces and structured outputs.
2. OBSERVE: Capture traces, outputs, and automated grades.
3. LEARN: Diagnose failures, update instructions, and record lessons.
4. REUSE: Retrieve winning patterns and insert them into the next run.

## Implementation Notes
- Context precision: define task boundaries, constraints, and expected outputs up front.
- Tooling discipline: require schemas for tool inputs/outputs; reject free-form tool calls.
- Traceability: store task -> plan -> output -> evaluation as a structured artifact.
- Memory layering: use both a graph (relationships) and vector memory (examples).

## Safety and Quality Guardrails
- Adversarial testing is for robustness and safety, not misuse.
- Use evaluation harnesses to prevent regressions and unsafe behaviors.
- Keep human-in-the-loop gates for high-risk actions.

## Immediate Backlog (Team-Scoped)
- Loop spec and metrics (ARCHON)
- Knowledge graph schema + retrieval policy (ATLAS)
- Tool interface registry + schemas (ANVIL)
- Evaluation harness plan and thresholds (GAUNTLET)
