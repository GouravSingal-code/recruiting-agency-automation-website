---
name: generate-marketing-video
description: Generate a Remotion marketing video with ElevenLabs voiceover for Shortlisted.ai, render to MP4, and push to repo
user_invocable: true
---

# Generate Marketing Video

This skill creates a marketing video using Remotion (React-based video framework) with ElevenLabs AI voiceover, renders it to MP4, and pushes to the external repo.

## Context

- **Project**: `/Users/sauravjha/Desktop/recruiting-agency-automation-website`
- **Remotion videos dir**: `remotion-videos/`
- **Audio output**: `public/voice/`
- **MP4 output**: `out/`
- **ElevenLabs API Key**: `sk_5fd6197ef3223135ce71bae77c364600288c474970166f0a`
- **ElevenLabs Account**: Free tier — generate audio **one scene at a time** with 1s delay between calls
- **Preferred Voice**: Jessica (`cgSgspJ2msm6clMCkdW9`) — Playful, Bright, Warm female voice

## Available Voices (for reference)

| Voice | ID | Style |
|---|---|---|
| Jessica (default) | `cgSgspJ2msm6clMCkdW9` | Playful, Bright, Warm |
| Sarah | `EXAVITQu4vr4xnSDxMaL` | Mature, Confident |
| Laura | `FGY2WhTYpPnrIDTdsKH5` | Enthusiastic, Energetic |
| George | `JBFqnCBsd6RMkjVDRZzb` | Warm Storyteller |
| Liam | `TX3LPaxmHKxFdv7VOQHJ` | Energetic, Confident |

## Voice Settings

```json
{
  "stability": 0.35,
  "similarity_boost": 0.80,
  "style": 0.20,
  "use_speaker_boost": true
}
```

Lower stability = more natural variation. Keep style low to avoid robotic output.

## Step-by-Step Process

### 1. Plan the video
- Get the video concept, target duration, and scene breakdown from the user
- Each scene should have: a visual description + narration text
- Resolution: 1080x1920 (vertical/portrait for social media), 30fps

### 2. Create the Remotion composition
- Create a new directory: `remotion-videos/VideoN-Name/`
- Write the composition as a single `.tsx` file using:
  - `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()` for animations
  - `<Sequence>` for scene boundaries
  - `<Audio>` + `staticFile()` for per-scene audio
  - `<AbsoluteFill>` for layering
  - Inline styles only (no external CSS)
- Register the composition in `remotion-videos/Root.tsx`

### 3. Generate voiceover audio
- Write narration text for each scene separately
- Generate per-scene MP3 clips using the ElevenLabs API (one at a time for free account):
  ```
  POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
  Headers: xi-api-key, Content-Type: application/json
  Body: { text, model_id: "eleven_multilingual_v2", voice_settings }
  ```
- Save to `public/voice/videoN-sceneN.mp3`
- Use `ffprobe` to get each clip's duration

### 4. Sync audio to video
- **Critical**: Use per-scene audio clips, NOT one long audio file
- Each scene gets its own `<Audio>` inside a `<Sequence>`:
  ```tsx
  <Sequence from={SCENE_START} durationInFrames={SCENE_END - SCENE_START}>
    <Audio src={staticFile("voice/videoN-sceneM.mp3")} />
  </Sequence>
  ```
- Set each scene's frame duration = audio duration + ~1s padding for breathing room
- Update the total `durationInFrames` in Root.tsx to match

### 5. Preview
- Run: `npx remotion studio remotion-videos/index.ts`
- Opens at http://localhost:3000
- User can scrub, play, and review each composition

### 6. Render to MP4
```bash
npx remotion render remotion-videos/index.ts CompositionId out/videoN-name.mp4
```

### 7. Push to repo
Use the `/push-external` skill to push to the external GitHub repo.

## Existing Videos

| # | ID | File | Duration |
|---|---|---|---|
| 1 | TheProblem | Video1-TheProblem/TheProblem.tsx | 18s |
| 2 | AIScreeningCall | Video2-AIScreeningCall/AIScreeningCall.tsx | 23s |
| 3 | JDToShortlist | Video3-JDToShortlist/JDToShortlist.tsx | 23s |
| 4 | CostComparison | Video4-CostComparison/CostComparison.tsx | 18s |
| 5 | FounderHiringReality | Video5-FounderHiringReality/FounderHiringReality.tsx | 50s |

## Key Lessons Learned
- ElevenLabs free tier: generate one clip at a time with `time.sleep(1)` between calls
- Single long audio files drift out of sync — always use per-scene clips
- Give each scene ~1s padding beyond audio duration so text has time to breathe
- Jessica voice with low stability (0.35) and low style (0.20) sounds most natural
- Use `eleven_multilingual_v2` model for best quality
- npm registry is pointed at corporate CodeArtifact — use `--registry https://registry.npmjs.org` for public packages
