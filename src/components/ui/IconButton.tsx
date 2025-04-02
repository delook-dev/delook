import { ReactNode } from 'react';

import { Button, ButtonProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.';

export const IconButton = ({
  children,
  onClick,
  tooltipContent,
  buttonProps,
}: {
  children: ReactNode;
  onClick?: () => void;
  tooltipContent?: string;
  buttonProps?: ButtonProps;
}) => {
  const buttonElement = (
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
