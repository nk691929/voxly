/** Checks for uploaded audio. Pure functions so they are easy to test. */

export const ALLOWED_AUDIO_TYPES = [
  "audio/webm",
  "audio/ogg",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/aac",
  "audio/flac",
  "video/webm", // some browsers label audio-only recordings this way
] as const;

export type AudioCheck = { ok: true } | { ok: false; error: string; status: number };

/** "audio/webm;codecs=opus" -> "audio/webm" */
export function normalizeMime(type: string): string {
  return type.split(";")[0].trim().toLowerCase();
}

export function validateAudioMeta(
  file: { type: string; size: number },
  maxBytes: number,
): AudioCheck {
  if (!file.size) return { ok: false, error: "The audio file is empty.", status: 400 };
  if (file.size > maxBytes) {
    return {
      ok: false,
      error: `The file is too large. The limit is ${Math.round(maxBytes / (1024 * 1024))} MB.`,
      status: 413,
    };
  }
  const mime = normalizeMime(file.type);
  if (!(ALLOWED_AUDIO_TYPES as readonly string[]).includes(mime)) {
    return { ok: false, error: "This file type is not supported. Use WebM, MP3, WAV, M4A, OGG or FLAC.", status: 415 };
  }
  return { ok: true };
}

function startsWith(bytes: Uint8Array, text: string, offset = 0): boolean {
  if (bytes.length < offset + text.length) return false;
  for (let i = 0; i < text.length; i++) {
    if (bytes[offset + i] !== text.charCodeAt(i)) return false;
  }
  return true;
}

/**
 * Looks at the first bytes of a file ("magic bytes") to confirm it really is audio.
 * A browser-reported file type can be faked; the content cannot.
 */
export function looksLikeAudio(bytes: Uint8Array): boolean {
  if (bytes.length < 4) return false;
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return true; // WebM / Matroska
  if (startsWith(bytes, "OggS")) return true; // Ogg
  if (startsWith(bytes, "fLaC")) return true; // FLAC
  if (startsWith(bytes, "ID3")) return true; // MP3 with tag
  if (startsWith(bytes, "RIFF") && startsWith(bytes, "WAVE", 8)) return true; // WAV
  if (startsWith(bytes, "ftyp", 4)) return true; // MP4 / M4A
  if (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0) return true; // MP3 / AAC frame sync
  return false;
}
