import { useMemo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const COLORS = ["bg-primary", "bg-butter", "bg-blush", "bg-sky"] as const;

/**
 * A single burst of hearts fired from the centre of the question screen.
 * Pass a new `seed` (e.g. an incrementing counter) to fire it again.
 */
export function HeartBurst({ seed }: { seed: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: `${seed}-${i}`,
        color: COLORS[i % COLORS.length],
        size: 8 + Math.round(Math.random() * 14),
        tx: `${(Math.random() - 0.5) * 130}vw`,
        ty: `${-28 - Math.random() * 58}vh`,
        tr: `${Math.round(Math.random() * 360)}deg`,
        delay: `${Math.random() * 0.6}s`,
        duration: `${2.2 + Math.random() * 1.5}s`,
      })),
    [seed],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={cn("heart", piece.color)}
          style={
            {
              left: "50%",
              top: "58%",
              width: piece.size,
              height: piece.size,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              "--tx": piece.tx,
              "--ty": piece.ty,
              "--tr": piece.tr,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
