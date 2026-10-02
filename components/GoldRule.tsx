export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-28 items-center gap-2.5 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gold/70" />
      <span className="size-1.5 rotate-45 border border-gold/80" />
      <span className="h-px flex-1 bg-gold/70" />
    </div>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.34em] text-gold-deep">
      {children}
    </p>
  );
}
