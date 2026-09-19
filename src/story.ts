/**
 * Everything she reads lives here — nothing is buried in the page markup.
 * Change a line, the site changes.
 */

export const story = {
  /** Her name. It appears in giant type at the very top. */
  herName: "my love",

  /** The little note in the top bar. */
  ribbon: "A private letter",

  opening: {
    eyebrow: "A letter, sealed with wax",
    lineOne: "I have something",
    lineTwo: "to ask you.",
    cta: "Tap to begin",
  },

  met: {
    label: "How we met",
    headline: "It started the way everything good does — quietly.",
    body: "I didn't know it that day. I thought it was just a conversation, and I said something I thought was clever. But I have replayed it ever since, and every time it lands a little harder.",
    dateLabel: "The day",
    date: "the day it started",
    placeLabel: "The place",
    place: "the place I still remember best",
  },

  moments: [
    {
      n: "01",
      title: "The first trip — the one I'd take again tomorrow",
      image: "first-trip",
      alt: "Two coffee cups on a sunlit rooftop ledge at golden hour",
    },
    {
      n: "02",
      title: "The first place we called ours — small, loud, perfect",
      image: "first-home",
      alt: "Morning light in a bare first apartment with two mismatched chairs",
    },
    {
      n: "03",
      title: "The ordinary Tuesdays — the ones that turned out to be the point",
      image: "ordinary-tuesdays",
      alt: "Pasta on a kitchen table under a warm evening lamp",
    },
  ],

  letter: {
    label: "A letter from me",
    lines: [
      "I'm not good at saying this out loud,",
      "so I wrote it down instead.",
      "You made the ordinary feel like",
      "somewhere I always wanted to be.",
      "I don't want a single Tuesday",
      "without you in it.",
    ],
    /** Which line (1-indexed) is set in vermilion. */
    accentLine: 4,
    signoff: "— always, me",
  },

  question: {
    eyebrow: "The quiet click of a ring box",
    lineOne: "Will you",
    lineTwo: "marry me?",
    button: "Yes",
    footnote: "Take your time. Then press it.",
    /** Shown after she presses Yes. */
    after: {
      eyebrow: "And that's the whole story",
      headline: "She said yes.",
      body: "Now come and find me — I've been waiting all day.",
      note: "Press it again if you'd like the hearts once more.",
    },
  },
} as const;

export const CHAPTERS = [
  "The beginning",
  "How we met",
  "The moments",
  "A letter",
  "The question",
] as const;
