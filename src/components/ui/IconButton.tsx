import { ReactNode } from 'react';

import { Button, ButtonProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.';

export const IconButton = ({
  children,
  onClick,
  tooltipContent,
  buttonProps,
  popover = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  tooltipContent?: string;
  buttonProps?: ButtonProps;
  popover?: boolean;
}) => {
  const buttonElement = popover ? (
    <div className="flex size-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
      {children}
    </div>
  ) : (
    <Button size={'icon'} variant={'ghost'} onClick={onClick} {...buttonProps}>
      {children}
    </Button>
  );

  return tooltipContent ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
        <TooltipContent>
          <span>{tooltipContent}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    buttonElement
  );
};
