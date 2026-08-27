export type PopSoundType = "click" | "star" | "success";

interface Tone {
  frequency: number;
  delay: number;
  duration: number;
  gain: number;
  wave: OscillatorType;
}

const TONES: Record<PopSoundType, Tone[]> = {
  click: [{ frequency: 520, delay: 0, duration: 0.018, gain: 0.05, wave: "sine" }],
  star: [{ frequency: 700, delay: 0, duration: 0.024, gain: 0.07, wave: "sine" }],
  success: [
    { frequency: 600, delay: 0, duration: 0.02, gain: 0.07, wave: "triangle" },
    { frequency: 800, delay: 0.02, duration: 0.028, gain: 0.08, wave: "triangle" },
  ],
};

// Reused across calls: mobile Safari caps the number of live AudioContext
// instances, so creating one per play would eventually go silent.
let sharedContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextCtor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextCtor) return null;

  try {
    if (!sharedContext) {
      sharedContext = new AudioContextCtor({ latencyHint: "interactive" });
    }
    return sharedContext;
  } catch {
    return null;
  }
}

function playTone(context: AudioContext, tone: Tone, jitter: number) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  const startAt = context.currentTime + tone.delay;
  const frequency = Math.max(tone.frequency + jitter, 40);

  oscillator.type = tone.wave;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(frequency * 0.55, 40), startAt + tone.duration);

  gainNode.gain.setValueAtTime(tone.gain, startAt);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + tone.duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(startAt + tone.duration + 0.01);
  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
  };
}

export function playPopSound(type: PopSoundType = "click") {
  const context = getContext();
  if (!context) return;

  try {
    if (context.state === "suspended") {
      void context.resume();
    }

    const jitter = (Math.random() - 0.5) * 30;
    for (const tone of TONES[type]) {
      playTone(context, tone, jitter);
    }
  } catch {
    // Sound is a non-critical enhancement; never let it break the UI.
  }
}
