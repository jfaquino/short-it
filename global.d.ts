import "react";

declare module "react" {
   interface CSSProperties {
      "--goo-color"?: string;
   }
}
