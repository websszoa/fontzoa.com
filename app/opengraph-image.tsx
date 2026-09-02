import { ImageResponse } from "next/og";

import { APP_NAME, APP_SLOGAN } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = `${APP_NAME} — ${APP_SLOGAN}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f1f0e9",
          color: "#1d1d1b",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 32, marginBottom: 80 }}>
            FONTZOA <span style={{ color: "#ff3d19" }}>●</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-5px",
              lineHeight: 1,
            }}
          >
            <span>KOREAN FONT</span>
            <span style={{ color: "#ff3d19" }}>ARCHIVE.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, marginTop: 56 }}>
            FIND YOUR TYPE · 144 FONT FACES
          </div>
        </div>
      </div>
    ),
    size,
  );
}
