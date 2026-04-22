import React from "react";
import { COLOR_MAP } from "./shared";

export function PixelBlock({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 mr-1"
      style={{ background: color, imageRendering: "pixelated", boxShadow: `0 0 6px ${color}` }}
    />
  );
}

export function NeonTag({ children, color }: { children: React.ReactNode; color: string }) {
  const c = COLOR_MAP[color] || "#00f5ff";
  return (
    <span
      className="pixel-font px-2 py-1"
      style={{ color: c, border: `1px solid ${c}`, textShadow: `0 0 6px ${c}`, boxShadow: `0 0 6px ${c}33`, fontSize: "8px" }}
    >
      {children}
    </span>
  );
}
