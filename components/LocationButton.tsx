type LocationButtonProps = {
  href: string;
  label: string;
  variant?: "light" | "dark";
};

export function LocationButton({
  href,
  label,
  variant = "light",
}: LocationButtonProps) {
  const styles =
    variant === "dark"
      ? "border-ivory/35 text-ivory hover:bg-ivory/10"
      : "border-gold-deep/50 text-charcoal hover:bg-gold/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center gap-3 border px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 ${styles}`}
    >
      <LocationIcon />
      {label}
    </a>
  );
}

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21s7-6.2 7-11.2A7 7 0 1 0 5 9.8C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9.8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
