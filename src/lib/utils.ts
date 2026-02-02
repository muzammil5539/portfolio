import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * This utility resolves Tailwind class conflicts, a critical requirement for reusable components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
