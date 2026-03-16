const logos: string[] = [];

const LogoMarquee = () => {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-12">
        {logos.map((name) => (
          <span
            key={name}
            className="text-sm font-display font-medium tracking-wide text-foreground opacity-[0.4] select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
