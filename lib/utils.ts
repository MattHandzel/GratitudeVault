import crypto from "crypto";

function getIVFromUserId(userId: string): Buffer {
  // Derive a 16-byte IV from the user ID by hashing and truncating
  return crypto.createHash("md5").update(userId).digest(); // MD5 produces 16 bytes
}

export function encrypt_user_data(
  str: string,
  user: { id: string },
): { encrypted: string } {
  const algorithm = "aes-256-cbc"; // Encryption algorithm
  const key = crypto
    .createHash("sha256")
    .update(process.env.SESSION_SECRET!)
    .digest(); // 32-byte encryption key
  const iv = getIVFromUserId(user.id); // Generate IV from user ID
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(str, "utf8", "hex");
  encrypted += cipher.final("hex");

  return { encrypted };
}

export function decrypt_user_data(
  encrypted: string,
  user: { id: string },
): string {
  const algorithm = "aes-256-cbc"; // Encryption algorithm
  const key = crypto
    .createHash("sha256")
    .update(process.env.SESSION_SECRET!)
    .digest(); // 32-byte encryption key
  const iv = getIVFromUserId(user.id); // Generate IV from user ID
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

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
