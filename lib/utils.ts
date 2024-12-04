export async function copyToClipboard(url) {
  try {
    await navigator.clipboard.writeText(url);
    console.log("URL copied to clipboard");
    // Optionally, you can show a success message to the user
  } catch (err) {
    console.error("Failed to copy URL: ", err);
    // Optionally, you can show an error message to the user
  }
}

import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
