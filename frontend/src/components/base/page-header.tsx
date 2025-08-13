interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="border-b pt-2 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>

      {description && (
        <p className="text-base text-muted-foreground font-light leading-relaxed">{description}</p>
      )}
    </header>
  );
};
