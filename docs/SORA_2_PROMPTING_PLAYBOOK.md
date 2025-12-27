# Sora 2 Prompting Playbook (Research-Backed)

Purpose: Fast, repeatable prompts for consistent, cinematic Sora 2 outputs.

Core prompt stack (Five Pillars):
- Subject/Character: identity, wardrobe, age, expression, materials
- Action/Motion: verbs, timing, choreography, physics cues
- Environment/Time: location, weather, time of day, atmosphere
- Cinematography: shot scale, angle, movement, lens, depth of field
- Aesthetic/Style: medium, art style, film stock, color grading
- Technical specs: aspect ratio, seconds, fps, resolution
- Audio (Sora 2): SFX, dialogue, music cues

World simulator mindset:
- DO: describe how the world behaves (steam rises, fabric flutters, reflections ripple)
- DONT: list nouns without interactions

Model constraints (OpenAI sample app):
- Models: sora-2, sora-2-pro
- Sizes: 1280x720, 720x1280, 1792x1024, 1024x1792
- Seconds: 4, 8, 12
- Note: verify with official OpenAI docs when accessible

Structured prompts for precision:
- Use labeled sections when you need production-level control
- Example sections: Primary Target, Format, Camera, Grading, Lighting, Audio

Shot sequencing (multi-scene):
- Use Shot_IDs and describe each shot separately
- Each shot includes its own action + camera movement
- Use 10-second clip boundaries as natural cuts if needed

Consistency controls:
- Define base metadata for recurring characters (wardrobe, facial mesh, voice)
- Inject the base object into every scene using a `ref:` tag

Cinematic levers:
- Shot scale: extreme wide, wide, medium, close-up, extreme close-up
- Angle: eye level, low angle, high angle, over-the-shoulder, POV
- Movement: static, pan, tilt, dolly, tracking, handheld, drone
- Lens/DOF: 24mm wide, 50mm normal, 85mm portrait; shallow or deep focus
- Lighting: high-key, low-key, golden hour, neon, softbox, rim light
- Grading: warm or cool palette, desaturated, high contrast, film grain

Audio cues:
- Tie audio to action (footsteps echo, wind howls, dialogue: "...")
- Keep audio consistent with environment and camera distance

Prompt length guidance:
- Short (under 50 words): exploration and style tests
- Medium (50-120): balanced creative prompts
- Long (120+): technical control; use sections

Optional workflows (from OpenAI sample app):
- Prompt optimization: use an LLM to rewrite a rough prompt using context
  (model, size, seconds, existing prompt). Ask for a single improved prompt.
- Image reference: generate stills with gpt-image-1 and send as input_reference
  to anchor composition and style before video generation.
- Remix iteration: use video remix with a revised prompt to compare variants.

Known limitations and fixes (community + PromptingGuide):
- Physics/cause effect confusion -> add explicit material behavior
- Camera path misread -> use one simple move per shot and restate once
- Spatial details drift -> simplify layout and anchor key objects
- Character drift -> repeat defining traits and use `ref:`

Testing loop (minimum):
- 10 prompt variations per concept
- Score quality, accuracy, motion, audio 1-10
- Keep top 20 percent; rewrite bottom 20 percent
- Store winners in the prompt library with notes

Quick template:
```
[SUBJECT/CHARACTER]
[ACTION/MOTION]
[ENVIRONMENT/TIME]
[CINEMATOGRAPHY]
[STYLE/LOOK]
[TECH SPECS]
[AUDIO]
```

Example (structured):
```
Primary Target & Visuals:
A young architect in a charcoal blazer reviews blueprints on a glass table, pages fluttering slightly.

Environment & Atmosphere:
A modern studio at late afternoon, soft sun beams through tall windows, dust motes visible.

Camera & Movement:
Medium shot, eye level, slow tracking left, shallow depth of field, 50mm lens.

Style & Grading:
Cinematic, warm highlights, gentle film grain, subtle bokeh.

Technical Specs:
16:9, 8 seconds, 30fps, 1080p.

Audio:
Pencil scratches, paper rustle, distant city hum.
```

Sources (local):
- C:\Users\Administrator\Gemini_HQ\docs\SORA_2_PROMPT_LIBRARY.md
- C:\Users\Administrator\Gemini_HQ\Knowledge_Base\Academy\Training_Paths\INTEL_UPGRADE_2025.md
- C:\Users\Administrator\Gemini_HQ\Knowledge_Base\Special_Ops\BROADCAST_Production\SORA2_PRODUCTION_MANUAL.md
- C:\Users\Administrator\Gemini_HQ\docs\intelligence\ARCH_infrastructure_design.md
- C:\Users\Administrator\Gemini_HQ\docs\intelligence\CRUCIBLE_testing_framework.md

Sources (external):
- https://github.com/zhangchenchen/awesome_sora2_prompt
- https://raw.githubusercontent.com/zhangchenchen/awesome_sora2_prompt/main/guides/getting-started.md
- https://raw.githubusercontent.com/zhangchenchen/awesome_sora2_prompt/main/guides/cinematic-techniques.md
- https://raw.githubusercontent.com/zhangchenchen/awesome_sora2_prompt/main/prompts/official-prompts.md
- https://raw.githubusercontent.com/zhangchenchen/awesome_sora2_prompt/main/prompts/sora2-viral-prompts.md
- https://github.com/xjpp22/awesome--sora-prompts
- https://www.promptingguide.ai/models/sora
- https://github.com/openai/openai-sora-sample-app
