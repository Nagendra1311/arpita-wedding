# 💍 Arpita & Manish Wedding Invitation (#ManniKiMini)

An elegant, single-page royal wedding invitation website built with **Next.js 14**, **React**, **Tailwind CSS**, and **Framer Motion**, featuring rich scroll animations, an authentic design matching the printed physical cards, and an interactive **Scratch Card** feature to reveal the marriage date!

---

## 🌟 What's Included

### 1. 📜 Single-Page Royal Card Experience (`/`)
- **Shubh Aarambh & Ganesha Invocation**:
  - `|| श्री गणेशाय नमः ||` with auspicious shloka:
    *वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥*
  - Intertwined golden **AM** Monogram with heart motif.
  - Couple Names: **Arpita ∞ Manish**.
  - Family Blessings: Daughter of Aruna Adak & Late Jagodish Adak, Son of Sharda Devi & Lakhinder Sahni, with the loving blessings of Late Alpana Porey (Beloved Bua).
- **✨ Interactive Scratch-to-Reveal Marriage Date**:
  - Touch- and mouse-responsive golden foil canvas.
  - Rubbing/scratching clears away the gold foil with glowing sparks.
  - Once ~40% is scratched, it triggers a grand reveal with a **celebration burst of gold confetti & rose petals**, auspicious chime sound, countdown timer, and **"Add to Google Calendar"** button!
- **🗓️ Authentic January 2027 Calendar & Event Schedule**:
  - Matches the physical card's illustrated calendar with **17th January highlighted in Teal** (Sangeet) and **18th January highlighted in Maroon** (Wedding).
  - Event itinerary for **Sangeet**, **Haldi**, and **Wedding (Saat Phere)**.
- **👗 Wardrobe Planner & Attire Guide**:
  - Directly from the card leaflet:
    - **Sangeet (17 Jan Evening)**: Glam Night *(Indo-Western / Contemporary)*
    - **Haldi (18 Jan Morning)**: Bright & Cheerful *(Yellow / Pastel / Floral)*
    - **Wedding (18 Jan Evening)**: Traditional *(Saree / Kurta / Sherwani)*
- **📍 Venue & Map**:
  - The Grand Celebration Palace, 123 Harmony Avenue, Blissful City, Dreamland.
  - Instant Google Maps directions and one-tap address copy.
- **🖼️ High-Resolution Printed Card Viewer**:
  - Interactive flip/tab viewer for both front cover and inner ceremony leaflets with fullscreen zoom.
- **💬 WhatsApp Blessings & RSVP**:
  - One-tap button opening WhatsApp with prefilled congratulations message and `#ManniKiMini`.

---

### 2. 🎬 Video Invitation Backup (`/video`)
- The previous full-screen portrait video player is preserved 100% as a dedicated backup at **`/video`**.
- Features the golden monogram fade-in, 2.5s hold, smooth transition, and responsive 9:16 portrait video with original audio.
- A floating shortcut **"Watch Video Invitation"** is available on the main page header and footer.

---

## 🚀 How to Run

```bash
# Start development server
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view the single-page card UI with the scratch feature.
Open **[http://localhost:3000/video](http://localhost:3000/video)** to view the backup video invitation.

---

## ⚙️ Configuration
All details (names, dates, venue, WhatsApp number, hashtag, video path) are easily customizable in:
- `src/config/weddingConfig.ts`
