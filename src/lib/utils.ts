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

type DateFormatOptions = {
   locale?: Intl.LocalesArgument;
   options?: Intl.DateTimeFormatOptions; // Custom formatting options
};

export const formatDate = (
   date: Date,
   {
      locale = "en-US",
      options = { day: "2-digit", month: "long", year: "numeric" },
   }: DateFormatOptions = {}
): string => {
   const formatter = new Intl.DateTimeFormat(locale, options);
   return formatter.format(date);
};

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
   if (!shortCode?.trim()) {
      throw new Error("Short code is required and cannot be empty");
   }

   let host = HOST_URL;

   if (!host && typeof window !== "undefined") {
      host = window.location.origin;
   }

   if (!host) {
      throw new Error("Failed to generate short URL: Host URL is required");
   }

   try {
      const sanitizedCode = encodeURIComponent(shortCode.trim());
      const url = new URL(sanitizedCode, host);

      return {
         label: `${url.host}${url.pathname}`,
         url: url.toString(),
      };
   } catch (error) {
      console.error("Invalid URL:", error);
      const errorMessage =
         error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to generate short URL: ${errorMessage}`);
   }
};
