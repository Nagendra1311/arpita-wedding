export interface WeddingEvent {
  title: string;
  subTitle?: string;
  date: string;
  time: string;
  theme: string;
  dressCode: string;
  colorScheme: string;
  accentColor: string;
  badgeColor: string;
  icon: string;
  description: string;
}

export interface WeddingConfig {
  couple: {
    bride: string;
    groom: string;
    initials: string; // "AM"
    fullName: string;
    hashtag: string;
  };
  family: {
    brideParents: string;
    groomParents: string;
    specialBlessing: string;
  };
  shloka: {
    sanskritTop: string;
    sanskritMain: string;
    translation: string;
  };
  event: {
    tagline: string;
    date: string;
    weddingDate: string;
    weddingDateFormatted: string;
    weddingDateIso: string;
    venue: string;
    venueName: string;
    venueAddress: string;
    city: string;
    googleMapsUrl: string;
  };
  events: WeddingEvent[];
  cardImages: {
    cover: string;
    details: string;
  };
  media: {
    videoSrc: string;
    musicSrc?: string;
  };
  animation: {
    logoHoldDurationSeconds: number;
    fadeOutDurationSeconds: number;
  };
  rsvp: {
    enableRsvpButton: boolean;
    rsvpLink: string;
    whatsappNumber: string;
    phoneFormatted?: string;
    defaultMessage: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: "Arpita",
    groom: "Manish",
    initials: "AM",
    fullName: "Arpita & Manish",
    hashtag: "#ManniKiMini",
  },
  family: {
    brideParents: "Aruna Adak & Late Jagodish Adak",
    groomParents: "Sharda Devi & Lakhinder Sahni",
    specialBlessing: "Late Alpana Porey (Beloved Bua)",
  },
  shloka: {
    sanskritTop: "॥ श्री गणेशाय नमः ॥",
    sanskritMain: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    translation: "O Lord with the curved trunk and immense radiance of millions of suns, please make all our endeavors obstacle-free, always.",
  },
  event: {
    tagline: "Our forever begins with your blessings",
    date: "18th January 2027",
    weddingDate: "18th January 2027",
    weddingDateFormatted: "Monday, January 18, 2027",
    weddingDateIso: "2027-01-18T18:00:00",
    venue: "Tridhara Community Hall",
    venueName: "Tridhara Community Hall",
    venueAddress: "3a, Dover Terrace, Ballygunge, Kolkata, West Bengal 700019",
    city: "Kolkata",
    googleMapsUrl: "https://maps.app.goo.gl/S56zyTP6njB4PuD97",
  },
  events: [
    {
      title: "Sangeet",
      subTitle: "Musical Night of Celebration",
      date: "17ᵗʰ January 2027",
      time: "Evening",
      theme: "Glam Night",
      dressCode: "Indo-Western / Contemporary",
      colorScheme: "Royal Burgundy, Plum & Sequins",
      accentColor: "#6B1D45",
      badgeColor: "#0D9488",
      icon: "Music",
      description: "An evening filled with music, rhythm, dance performances, and glamour.",
    },
    {
      title: "Haldi",
      subTitle: "Auspicious Turmeric Blessing",
      date: "18ᵗʰ January 2027",
      time: "Morning",
      theme: "Bright & Cheerful",
      dressCode: "Yellow / Pastel / Floral",
      colorScheme: "Marigold Yellow, Mustard & Floral",
      accentColor: "#D97706",
      badgeColor: "#EAB308",
      icon: "Sun",
      description: "A joyful morning bathed in bright, cheerful yellow tones as auspicious turmeric is lovingly applied.",
    },
    {
      title: "Wedding",
      subTitle: "The Sacred Vows & Phere",
      date: "18ᵗʰ January 2027",
      time: "Evening",
      theme: "Traditional",
      dressCode: "Traditional (Saree / Kurta / Sherwani)",
      colorScheme: "Royal Gold, Crimson & Silk",
      accentColor: "#881337",
      badgeColor: "#881337",
      icon: "Heart",
      description: "The sacred saat phere and traditional wedding ceremony solemnizing the union of two souls.",
    },
  ],
  cardImages: {
    cover: "/card/card_cover.jpg",
    details: "/card/card_details.jpg",
  },
  media: {
    videoSrc: "/invitation.mp4",
    musicSrc: "/music/music.mp3",
  },
  animation: {
    logoHoldDurationSeconds: 2.5,
    fadeOutDurationSeconds: 1.0,
  },
  rsvp: {
    enableRsvpButton: true,
    rsvpLink: "https://wa.me/917065891834?text=Dear%20Arpita%20and%20Manish,%20heartiest%20congratulations%20on%20your%20wedding!%20%23ManniKiMini",
    whatsappNumber: "917065891834",
    phoneFormatted: "+91 70658 91834",
    defaultMessage: "Dear Arpita and Manish, we are so delighted to receive your wedding invitation! Heartiest congratulations and best wishes for #ManniKiMini!",
  },
};
