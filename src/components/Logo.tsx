import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: "dark" | "light";
}

export function Logo({ className = "", size = 40, showText = true, textColor = "dark" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt="Advance Tech"
        width={size}
        height={size}
        className="shrink-0 object-contain"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span 
            className={`text-lg font-black tracking-tight ${
              textColor === "dark" ? "text-slate-950" : "text-white"
            }`}
          >
            ADVANCE TECH
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-red-650">
            Filtration Solutions
          </span>
        </div>
      )}
    </div>
  );
}
