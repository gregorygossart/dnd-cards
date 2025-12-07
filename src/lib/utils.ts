import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to receive value "${x}"`);
};
