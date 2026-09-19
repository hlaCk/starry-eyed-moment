import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";

import firstTrip from "@/assets/first-trip.jpg";
import firstHome from "@/assets/first-home.jpg";
import ordinaryTuesdays from "@/assets/ordinary-tuesdays.jpg";
import { HeartBurst } from "@/components/HeartBurst";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { CHAPTERS, story } from "@/story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A letter for you" },
      {
        name: "description",
        content:
          "A private letter in five short chapters — how we met, the moments I keep, and one question at the end.",
      },
      { property: "og:title", content: "A letter for you" },
      {
        property: "og:description",
        content: "Five short chapters, and one question at the end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Proposal,
});

const IMAGES = {
  "first-trip": firstTrip,
  "first-home": firstHome,
  "ordinary-tuesdays": ordinaryTuesdays,
} as const;

function Proposal() {
  const [active, setActive] = useState(1);
  const [said, setSaid] = useState(false);
  const [seed, setSeed] = useState(0);
  const storyRef = useRef<HTMLElement | null>(null);

  // Keep the top bar's chapter counter in step with wherever she has scrolled:
  // the chapter with the most of its height on screen wins.
  useEffect(() => {
    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    if (!chapters.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      let winner = chapters[0];
      let mostSeen = -1;

      for (const chapter of chapters) {
        const { top, bottom } = chapter.getBoundingClientRect();
        const seen = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
        if (seen > mostSeen) {
          mostSeen = seen;
          winner = chapter;
        }
      }

      const next = Number(winner.getAttribute("data-chapter"));
      setActive((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const begin = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const answer = () => {
    setSaid(true);
    setSeed((value) => value + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/92">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-primary" />
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              For {story.herName} — {story.ribbon}
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {CHAPTERS[active - 1]} · Chapter 0{active} / 0{CHAPTERS.length}
          </span>
        </div>
      </header>

      <main>
        {/* 01 — The opening */}
        <section
          data-chapter="1"
          className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sky/30 via-blush/30 to-butter/40" />
          <div className="drift absolute top-24 left-8 size-28 rounded-full bg-butter/70" />
          <div className="drift-2 absolute right-10 bottom-28 size-40 rounded-full bg-blush/60" />
          <div className="drift-3 absolute top-40 right-24 size-16 rounded-full bg-primary/80" />
          <div className="drift absolute bottom-40 left-1/3 size-10 rounded-full bg-sky/70" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-8 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {story.opening.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,13vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.04em] text-balance">
              {story.herName},
              <span className="block text-primary">{story.opening.lineOne}</span>
              <span className="block">{story.opening.lineTwo}</span>
            </h1>
            <div className="mt-14">
              <button
                type="button"
                onClick={begin}
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground bg-primary-foreground px-6 py-3 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="breathe size-2 rounded-full bg-primary" />
                <span className="text-sm font-medium tracking-tight">
                  {story.opening.cta}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 02 — How we met */}
        <section
          ref={storyRef}
          data-chapter="2"
          className="scroll-mt-16 border-y border-border bg-background px-6 py-28"
        >
          <div className="mx-auto max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Chapter 02 · {story.met.label}
            </span>
            <Reveal>
              <h2 className="font-display mt-6 text-[clamp(2rem,6vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">
                {story.met.headline}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground text-pretty">
                {story.met.body}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-12 flex flex-wrap items-baseline gap-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {story.met.dateLabel}
                  </div>
                  <div className="font-mono text-2xl font-bold tracking-tight">
                    {story.met.date}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {story.met.placeLabel}
                  </div>
                  <div className="font-display text-2xl font-bold tracking-tight">
                    {story.met.place}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 03 — The moments */}
        <section data-chapter="3" className="bg-sky/10 px-6 py-28">
          <div className="mx-auto max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Chapter 03 · The moments
            </span>
            <div className="mt-10 space-y-16">
              {story.moments.map((moment, index) => (
                <Reveal key={moment.n} delay={index * 80}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm font-bold text-primary">
                        {moment.n}
                      </span>
                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-balance">
                        {moment.title}
                      </h3>
                    </div>
                    <div className="overflow-hidden rounded-[min(2vw,20px)] outline outline-black/5 -outline-offset-1">
                      <img
                        src={IMAGES[moment.image]}
                        alt={moment.alt}
                        loading="lazy"
                        width={1088}
                        height={720}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — The letter */}
        <section data-chapter="4" className="border-y border-border bg-butter/15 px-6 py-32">
          <Letter />
        </section>

        {/* 05 — The question */}
        <section
          data-chapter="5"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-night-foreground"
        >
          <div className="bloom absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25" />
          <div
            className="bloom absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/25"
            style={{ animationDelay: "1.4s" }}
          />
          <div
            className="bloom absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/20"
            style={{ animationDelay: "2.8s" }}
          />

          {said && <HeartBurst seed={seed} />}

          <div className="relative">
            <p className="mb-8 text-[10px] uppercase tracking-[0.22em] text-night-foreground/50">
              {said ? story.question.after.eyebrow : story.question.eyebrow}
            </p>

            {said ? (
              <>
                <h2 className="font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-balance">
                  {story.question.after.headline}
                </h2>
                <p className="mt-6 text-lg text-night-foreground/80 text-pretty">
                  {story.question.after.body}
                </p>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={answer}
                    className="font-display rounded-full bg-night-foreground px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-night transition-colors duration-300 hover:bg-butter"
                  >
                    Once more
                  </button>
                </div>
                <p className="mt-10 max-w-[40ch] text-sm text-night-foreground/50 text-pretty">
                  {story.question.after.note}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-balance">
                  {story.question.lineOne}
                  <br />
                  <span className="text-primary">{story.question.lineTwo}</span>
                </h2>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={answer}
                    className="font-display rounded-full bg-primary px-14 py-5 text-2xl font-extrabold tracking-tight text-primary-foreground transition-all duration-300 hover:bg-butter hover:text-foreground"
                  >
                    {story.question.button}
                  </button>
                </div>
                <p className="mt-10 max-w-[40ch] text-sm text-night-foreground/50 text-pretty">
                  {story.question.footnote}
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/** The letter writes itself, one line at a time, as she reaches it. */
function Letter() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto max-w-2xl">
      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Chapter 04 · {story.letter.label}
      </span>
      <div className="font-display mt-8 space-y-5 text-[clamp(1.4rem,4vw,2.2rem)] leading-[1.35] font-bold tracking-[-0.02em] text-balance">
        {story.letter.lines.map((line, index) => (
          <p
            key={line}
            className={cn(
              "reveal",
              inView && "reveal-in",
              index + 1 === story.letter.accentLine ? "text-primary" : "text-foreground/90",
            )}
            style={{ transitionDelay: `${index * 110}ms` } as CSSProperties}
          >
            {line}
          </p>
        ))}
      </div>
      <p
        className={cn("reveal font-mono mt-12 text-sm text-muted-foreground", inView && "reveal-in")}
        style={{ transitionDelay: `${story.letter.lines.length * 110}ms` }}
      >
        {story.letter.signoff}
      </p>
    </div>
  );
}
