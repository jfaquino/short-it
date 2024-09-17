import type { Config } from "tailwindcss";

const config = {
   darkMode: ["class"],
   content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
   ],
   prefix: "",
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
            "move-in-circle": {
               "0%": { transform: "rotate(0deg)" },
               "50%": { transform: "rotate(180deg)" },
               "100%": { transform: "rotate(360deg)" },
            },
            "move-vertical": {
               "0%": { transform: "translateY(-50%) translateX(-10%)" },
               "50%": { transform: "translateY(50%) translateX(10%)" },
               "100%": { transform: "translateY(-50%) translateX(-10%)" },
            },
            "move-horizontal": {
               "0%": { transform: "translateX(-50%) translateY(-10%)" },
               "50%": { transform: "translateX(50%) translateY(10%)" },
               "100%": { transform: "translateX(-50%) translateY(-10%)" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "move-vertical": "move-vertical 30s ease infinite",
            "move-horizontal": "move-horizontal 40s ease infinite",
            "move-in-circle": "move-in-circle 20s reverse infinite",
            "move-in-circle-long": "move-in-circle 40s reverse infinite",
         },
         transitionDelay: {
            "minus-20s": "-20s",
            "minus-15s": "-15s",
            "minus-10s": "-10s",
         },
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      ({ addVariant }: any) => {
         addVariant("starting", "@starting-style");
      },
   ],
} satisfies Config;

export default config;
