import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'pointer-events-none inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent/80 text-accent-foreground',
        primary: 'border-transparent bg-primary text-accent',
        green: 'border-transparent bg-green text-accent',
        pink: 'border-transparent bg-pink text-accent',
        yellow: 'border-transparent bg-yellow/40 text-foreground',
        outline: 'border-border text-muted-foreground',
      },
      size: {
        xxs: 'text-[0.7rem]',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'sm',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
