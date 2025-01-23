interface ExternalLinkProps {
   href: string;
   children: React.ReactNode;
   className?: string;
   target?: "_blank" | "_self" | "_parent" | "_top";
   rel?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
   href,
   children,
   className,
   target = "_blank",
   rel = "noopener noreferrer",
}) => {
   return (
      <a href={href} className={className} target={target} rel={rel}>
         {children}
      </a>
   );
};

export default ExternalLink;
