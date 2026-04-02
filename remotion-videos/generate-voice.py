import requests
import sys
import os
import json
import subprocess
import time

API_KEY = "sk_5fd6197ef3223135ce71bae77c364600288c474970166f0a"
BASE_URL = "https://api.elevenlabs.io/v1"

# Jessica - Playful, Bright, Warm
VOICE_ID = "cgSgspJ2msm6clMCkdW9"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "voice")


def generate_audio(text: str, output_path: str, voice_id: str = VOICE_ID):
    """Generate audio from text using ElevenLabs API."""
    print(f"  Generating: {os.path.basename(output_path)}")

    resp = requests.post(
        f"{BASE_URL}/text-to-speech/{voice_id}",
        headers={
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
        },
        json={
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.35,
                "similarity_boost": 0.80,
                "style": 0.20,
                "use_speaker_boost": True,
            },
        },
    )

    if resp.status_code != 200:
        print(f"  Error {resp.status_code}: {resp.text}")
        sys.exit(1)

    with open(output_path, "wb") as f:
        f.write(resp.content)

    # Get duration
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", output_path],
        capture_output=True, text=True,
    )
    duration = float(json.loads(result.stdout)["format"]["duration"])
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  Saved: {size_kb:.0f} KB, {duration:.1f}s")
    return duration


# ── Video 5: Per-scene narration clips ─────────────────────────────────
# Each clip gets its own file so Remotion can sync precisely per scene.

VIDEO5_SCENES = [
    {
        "id": "scene1",
        "text": "You need a developer. So you do what every founder does. You open LinkedIn, and send fifty personalised messages.",
    },
    {
        "id": "scene2",
        "text": "Three weeks later... three replies. Two say not interested. One just stops responding.",
    },
    {
        "id": "scene3",
        "text": "So you try a recruiter. Fifteen thousand dollars. Just the fee.",
    },
    {
        "id": "scene4",
        "text": "Three months gone. No hire. You settle for the best available option.",
    },
    {
        "id": "scene5",
        "text": "Missed deadlines. Culture mismatch. They're gone. Back to square one.",
    },
    {
        "id": "scene6",
        "text": "LinkedIn. Ghosted. Recruiter fees. Bad hire. The loop never ends.",
    },
    {
        "id": "scene7",
        "text": "Break the cycle. Six pre-screened candidates. Ten days. Shortlisted AI.",
    },
]

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Video 5 - The Founder's Hiring Reality")
    print("Voice: Jessica (Playful, Bright, Warm)")
    print("=" * 50)

    durations = {}
    for scene in VIDEO5_SCENES:
        path = os.path.join(OUTPUT_DIR, f"video5-{scene['id']}.mp3")
        dur = generate_audio(scene["text"], path)
        durations[scene["id"]] = dur
        time.sleep(1)  # rate limit buffer for free account

    print("\n" + "=" * 50)
    print("Scene durations:")
    for sid, dur in durations.items():
        print(f"  {sid}: {dur:.1f}s")
    print(f"  Total: {sum(durations.values()):.1f}s")
