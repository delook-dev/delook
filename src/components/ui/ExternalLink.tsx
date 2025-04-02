import { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => {
  return (
    <Link {...rest} to={href} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  );
};
