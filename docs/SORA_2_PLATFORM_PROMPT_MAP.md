# Sora 2 Platform Prompt Map (Research-Backed)

Supported API constraints (OpenAI sample app):
- Models: sora-2, sora-2-pro
- Sizes: 1280x720, 720x1280, 1792x1024, 1024x1792
- Seconds: 4, 8, 12
- Map 16:9 to 1280x720 or 1792x1024; map 9:16 to 720x1280 or 1024x1792

Global scaffold:
[Subject/Character] + [Action/Motion] + [Environment/Time] + [Cinematography] + [Style/Look] + [Tech Specs] + [Audio]

Pacing rules by platform:
- Shorts/TikTok: hook in first 1 second; visual or audio shift every 2-3 seconds
- Reels: polished, aesthetic lighting; steady motion
- Long-form: slower camera, longer shots; layer environment details
- Stories: casual, BTS feel; minimal camera complexity

## YouTube Long (16:9)
Format notes: establishing shots, smooth movement, cinematic pacing.

Template:
```
[ESTABLISHING SHOT] + [SUBJECT] + [ACTION] + [ENVIRONMENT] + [CINEMATIC CAMERA] + [STYLE] + [16:9, 8-12s]
```

Example prompt:
```
Cinematic establishing shot of a coastal AI research lab at sunrise, waves breaking below the cliff, engineers moving between glass walkways. Wide shot, slow drone push-in, gentle haze, warm golden hour lighting, subtle film grain, 16:9, 12 seconds, 30fps. Audio: distant surf and soft wind.
```

## YouTube Shorts (9:16)
Format notes: immediate hook, high contrast, strong motion.

Template:
```
[HOOK] + [SUBJECT] + [ACTION] + [VERTICAL CAMERA] + [BOLD STYLE] + [9:16, 6-10s]
```

Example prompt:
```
Vertical framing, instant hook: a neon skateboard flips toward camera, sparks trailing as it lands. Low angle tracking shot, fast push-in, high contrast neon palette, 9:16, 8 seconds, 30fps. Audio: sharp board snap and crowd cheer.
```

## TikTok (9:16)
Format notes: trend pacing, loopable action, bold color.

Template:
```
[SUBJECT] + [LOOP ACTION] + [STYLIZED CAMERA] + [VIRAL AESTHETIC] + [9:16, 6-10s]
```

Example prompt:
```
A crystal orb continuously morphs into a butterfly and back, macro close-up, slow orbit camera, iridescent colors, seamless loop, 9:16, 8 seconds, 30fps. Audio: soft shimmer and whoosh.
```

## Instagram Reels (9:16 or 4:5)
Format notes: clean grade, aesthetic lighting, polished but authentic.

Template:
```
[SUBJECT] + [ACTION] + [SOFT LIGHT] + [AESTHETIC GRADE] + [9:16 or 4:5, 8-12s]
```

Example prompt:
```
A barista pours latte art in slow motion, warm window light, medium close-up, gentle handheld feel, soft pastel palette, 4:5, 10 seconds, 24fps. Audio: espresso hiss and cup clink.
```

## Instagram Stories (9:16)
Format notes: casual, BTS, minimal camera complexity.

Template:
```
[BTS MOMENT] + [NATURAL LIGHT] + [HANDHELD] + [9:16, 6-8s]
```

Example prompt:
```
Behind-the-scenes clip of a creator arranging props on a desk, handheld phone-like camera, soft room light, quick pan across tools, 9:16, 7 seconds, 30fps. Audio: quiet room tone and light chatter.
```

Sources:
- https://github.com/openai/openai-sora-sample-app
- https://github.com/zhangchenchen/awesome_sora2_prompt
- C:\Users\Administrator\Gemini_HQ\docs\SORA_2_PROMPT_LIBRARY.md
- C:\Users\Administrator\Gemini_HQ\Knowledge_Base\Special_Ops\BROADCAST_Production\SORA2_PRODUCTION_MANUAL.md
