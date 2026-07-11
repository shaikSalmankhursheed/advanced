import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: "dark" | "light";
  brandName?: string;
  subtitle?: string;
}

export function Logo({ className = "", size = 40, showText = true, textColor = "dark", brandName = "ADVANCE TECH", subtitle = "Filtration Solutions" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt={brandName}
        style={{ width: size, height: size }}
        className="shrink-0 object-contain"
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span 
            className={`text-lg font-black tracking-tight ${
              textColor === "dark" ? "text-slate-950" : "text-white"
            }`}
          >
            {brandName}
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-red-650">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
