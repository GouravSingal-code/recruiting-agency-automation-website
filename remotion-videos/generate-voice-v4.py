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


def generate_audio(text, output_path, voice_id=VOICE_ID):
    print(f"  Generating: {os.path.basename(output_path)}")
    resp = requests.post(
        f"{BASE_URL}/text-to-speech/{voice_id}",
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json"},
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
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", output_path],
        capture_output=True, text=True,
    )
    duration = float(json.loads(result.stdout)["format"]["duration"])
    size_kb = os.path.getsize(output_path) / 1024
    print(f"  Saved: {size_kb:.0f} KB, {duration:.1f}s")
    return duration


# Video 4: The Cost Comparison
# 7 scenes. Narration should be tight — numbers speak for themselves.

VIDEO4_SCENES = [
    {
        "id": "scene1",
        "text": "Hiring a senior developer?",
    },
    {
        "id": "scene2",
        "text": "Let's compare your options.",
    },
    {
        "id": "scene3",
        "text": "A traditional agency charges fifteen thousand dollars. We charge two ninety-nine per role.",
    },
    {
        "id": "scene4",
        "text": "They take two to three months. We deliver in ten days.",
    },
    {
        "id": "scene5",
        "text": "They send unvetted resumes. We send pre-screened, interview-ready candidates.",
    },
    {
        "id": "scene6",
        "text": "Same result.",
    },
    {
        "id": "scene7",
        "text": "Fraction of the cost. Shortlisted AI.",
    },
]

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Video 4 - The Cost Comparison")
    print("Voice: Jessica (Playful, Bright, Warm)")
    print("=" * 50)

    durations = {}
    for scene in VIDEO4_SCENES:
        path = os.path.join(OUTPUT_DIR, f"video4-{scene['id']}.mp3")
        dur = generate_audio(scene["text"], path)
        durations[scene["id"]] = dur
        time.sleep(1)

    print("\n" + "=" * 50)
    print("Scene durations:")
    for sid, dur in durations.items():
        print(f"  {sid}: {dur:.1f}s")
    print(f"  Total: {sum(durations.values()):.1f}s")
