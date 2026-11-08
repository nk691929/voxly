import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Voxly - Speak naturally. Get things done.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BARS = [90, 170, 250, 140, 70];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4338CA, #7C3AED)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", height: 260 }}>
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{ width: 34, height: h, marginRight: 22, borderRadius: 17, background: "#ffffff" }}
            />
          ))}
          <div style={{ width: 34, height: 34, marginLeft: 8, marginBottom: 200, borderRadius: 17, background: "#FB7185" }} />
        </div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 700, marginTop: 20 }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 44, marginTop: 10, opacity: 0.9 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
