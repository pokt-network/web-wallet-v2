import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export function cx(...args: ClassValue[]): string {
  return twMerge(clsx(...args));
}
