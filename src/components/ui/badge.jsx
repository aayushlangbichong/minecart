import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        pending:
          "border-transparent bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80",
        cancelled:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        processing:
          "border-transparent bg-blue-400 text-blue-900 hover:bg-blue-400/80",
        shipped:
          "border-transparent bg-teal-400 text-teal-900 hover:bg-teal-400/80",
        delivered:
          "border-transparent bg-green-500 text-white hover:bg-green-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
