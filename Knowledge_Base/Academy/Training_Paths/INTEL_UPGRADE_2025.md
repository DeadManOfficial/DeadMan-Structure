# Intelligence Update: Sora 2 & Cinematic Prompting

## 1. Sora 2 "Core Prompt" Method
To maintain consistent characters across multi-scene narratives:
*   Define Character Identity (Structure, Wardrobe, Voice) in a **Base Metadata Object**.
*   Inject the Base Object into every scene prompt using the `ref:` tag.

## 2. Cinematic Precision
*   Use standard cinematography terms: `Dolly Zoom`, `Low-Angle Tilt`, `High-Key Lighting`.
*   Synchronize Audio: Prompt soundscapes alongside visuals (e.g., `[SFX: Rain on tin roof]`).

## 3. Structured Storyboarding
*   Break narrative into `Shot_IDs`.
*   Each shot ID must have a dedicated action and camera movement.
