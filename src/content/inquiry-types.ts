/** Contact topics shown on /contact. `hint` guides what to write. */
export const inquiryTypes = [
  {
    id: "bookings",
    title: "Bookings",
    description: "Clubs, festivals, private and brand events.",
    subject: "Booking inquiry",
    hint: "Event name, date, city / venue, set length & time, expected capacity, budget / fee range.",
  },
  {
    id: "collaboration",
    title: "Music Collaboration",
    description: "Co-productions, vocals, remixes.",
    subject: "Music collaboration",
    hint: "The project, your role and links to your work, timeline.",
  },
  {
    id: "label",
    title: "Label / A&R",
    description: "Releases, signings, promo requests.",
    subject: "Label / A&R inquiry",
    hint: "Label / company and what you're looking for.",
  },
  {
    id: "general",
    title: "General Inquiry",
    description: "Press, interviews and everything else.",
    subject: "General inquiry",
    hint: "How can we help?",
  },
] as const;

export type InquiryTypeId = (typeof inquiryTypes)[number]["id"];
