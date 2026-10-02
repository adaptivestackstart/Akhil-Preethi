"use client";

type PetalFieldProps = {
  count?: number;
  className?: string;
};

export function PetalField({ count = 12, className = "" }: PetalFieldProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = ((i * 17) % 100) + (i % 5);
        const delay = (i * 0.7) % 8;
        const duration = 11 + (i % 6);
        const size = 7 + (i % 5);
        const hue = i % 3 === 0 ? "#e8d5c4" : i % 3 === 1 ? "#c9a36a" : "#f3eadc";
        return (
          <span
            key={i}
            className="petal absolute top-[-8%] rounded-[60%_40%_50%_50%] opacity-70"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 1.35,
              background: hue,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              filter: "blur(0.2px)",
            }}
          />
        );
      })}
    </div>
  );
}
