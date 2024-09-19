import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
   HOST_URL,
   SHORT_CODE_CHARACTERS,
   SHORT_CODE_LENGTH,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatNumber(
   number: number | string,
   options: {
      decimals?: number;
      style?: Intl.NumberFormatOptions["style"];
      notation?: Intl.NumberFormatOptions["notation"];
   } = {}
) {
   const { decimals = 1, style = "decimal", notation = "standard" } = options;

   return new Intl.NumberFormat("en-US", {
      style,
      notation,
      maximumFractionDigits: decimals,
   }).format(Number(number));
}

export function generateShortCode(): string {
   let result = "";
   for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
      result += SHORT_CODE_CHARACTERS.charAt(
         Math.floor(Math.random() * SHORT_CODE_CHARACTERS.length)
      );
   }
   return result;
}

export function isValidUrl(url: string): boolean {
   try {
      new URL(url);
      return true;
   } catch {
      return false;
   }
}

export const generateShortUrl = (
   shortCode: string
): { label: string; url: string } => {
   const host = HOST_URL;
   if (!host || !shortCode) return { label: "", url: "" };

   try {
      const url = new URL(shortCode, host);
      return { label: `${url.host}${url.pathname}`, url: url.toString() };
   } catch (error) {
      console.error("Invalid URL:", error);
      return { label: "", url: "" };
   }
};
