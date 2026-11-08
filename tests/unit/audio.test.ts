import { describe, expect, it } from "vitest";
import { looksLikeAudio, normalizeMime, validateAudioMeta } from "../../src/lib/validation/audio";

const MB = 1024 * 1024;
const bytes = (...n: number[]) => new Uint8Array(n);
const ascii = (s: string) => new Uint8Array([...s].map((c) => c.charCodeAt(0)));

describe("normalizeMime", () => {
  it("removes codec parameters and lowercases", () => {
    expect(normalizeMime("Audio/WebM;codecs=opus")).toBe("audio/webm");
  });
});

describe("validateAudioMeta", () => {
  it("accepts a normal recording", () => {
    expect(validateAudioMeta({ type: "audio/webm;codecs=opus", size: 1 * MB }, 25 * MB).ok).toBe(true);
  });
  it("rejects empty files", () => {
    const r = validateAudioMeta({ type: "audio/mpeg", size: 0 }, 25 * MB);
    expect(r.ok).toBe(false);
  });
  it("rejects files over the size limit with status 413", () => {
    const r = validateAudioMeta({ type: "audio/mpeg", size: 26 * MB }, 25 * MB);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(413);
  });
  it("rejects unsupported types with status 415", () => {
    const r = validateAudioMeta({ type: "text/plain", size: 1000 }, 25 * MB);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(415);
  });
});

describe("looksLikeAudio (magic bytes)", () => {
  it("recognizes WebM", () => expect(looksLikeAudio(bytes(0x1a, 0x45, 0xdf, 0xa3, 0, 0, 0, 0))).toBe(true));
  it("recognizes Ogg", () => expect(looksLikeAudio(ascii("OggS\0\0\0\0"))).toBe(true));
  it("recognizes MP3 with ID3 tag", () => expect(looksLikeAudio(ascii("ID3\u0004\0\0\0\0"))).toBe(true));
  it("recognizes MP3 frame sync", () => expect(looksLikeAudio(bytes(0xff, 0xfb, 0x90, 0x00))).toBe(true));
  it("recognizes WAV", () => expect(looksLikeAudio(ascii("RIFF\0\0\0\0WAVE"))).toBe(true));
  it("recognizes M4A/MP4", () => expect(looksLikeAudio(ascii("\0\0\0\u0020ftypM4A "))).toBe(true));
  it("rejects plain text renamed to .mp3", () => expect(looksLikeAudio(ascii("hello world!"))).toBe(false));
  it("rejects a RIFF file that is not WAVE", () => expect(looksLikeAudio(ascii("RIFF\0\0\0\0AVI "))).toBe(false));
  it("rejects too-short input", () => expect(looksLikeAudio(bytes(1, 2))).toBe(false));
});
