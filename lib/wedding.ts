export const wedding = {
  names: {
    short: "Akhil & Preethi",
    groom: "Akhil Sekhar",
    bride: "Preethi Chandran",
  },
  families: {
    groom: {
      parents: "Son of Chandrashekharan PK and Omana NG",
    },
    bride: {
      parents: "Daughter of Chandran M & Priyamvadha P",
      house: "Puzhakkal House",
      place: "Kizhakkencherry, Palakkad",
    },
  },
  date: {
    display: "15 November",
    displayLong: "15 November 2026",
    iso: "2026-11-15T10:15:00+05:30",
  },
  ceremony: {
    title: "The Wedding",
    muhurtham: "Muhurtham",
    time: "10:15 AM – 10:45 AM",
    venue: "MD Palace",
    place: "Thiruvara Temple",
    locality: "Vadakkencherry",
    maps: "https://share.google/43rLRQ94WRMphi1gq",
  },
  reception: {
    title: "The Celebration Continues",
    label: "Reception",
    time: "5:00 PM – 8:00 PM",
    venue: "Tanima Auditorium",
    locality: "Puthukode, Palakkad",
    maps: "https://share.google/btC01sg3z642sqvXK",
  },
  images: {
    bride: { src: "/bbride.jpg", width: 813, height: 1084 },
    groom: { src: "/groom.jpg", width: 1440, height: 1800 },
    together1: { src: "/toghether_1.jpg", width: 1440, height: 1919 },
    together2: { src: "/togther_2.jpg", width: 1440, height: 1920 },
    story: { src: "/where_it_all_started.jpg", width: 698, height: 1047 },
  },
  copy: {
    invitationLine: "Together with their families",
    inviteYou: "invite you to celebrate their wedding",
    heroLine: "Two hearts. One beautiful beginning.",
    storyTitle: "Where It All Started",
    storyLead:
      "Every beautiful story has a beginning. Ours began with a moment that slowly became a lifetime.",
    countdown: "Counting down to forever",
    closing:
      "With love in our hearts, we invite you to be part of our special day.",
    closingWait: "We can't wait to celebrate with you.",
    signOff: "With love,",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "gallery", label: "Gallery" },
    { id: "couple", label: "The Couple" },
    { id: "wedding", label: "Wedding" },
    { id: "reception", label: "Reception" },
  ] as const,
} as const;

export const cinematicEase = [0.22, 1, 0.36, 1] as const;
