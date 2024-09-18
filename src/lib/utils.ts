import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
