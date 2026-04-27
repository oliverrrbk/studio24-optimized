import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safari Optimization Config (Hardware Acceleration + will-change)
export const hardwareAccelerated: any = {
  WebkitTransform: "translateZ(0)",
  transform: "translate3d(0, 0, 0)",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  willChange: "transform, opacity",
};
