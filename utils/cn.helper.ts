import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper function to merge tailwind classes with clsx
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
