/** Contact topics shown on /contact. Each opens Gmail with a subject and a short template. */
export const inquiryTypes = [
  {
    id: "bookings",
    title: "Bookings",
    description: "Clubs, festivals, private and brand events.",
    subject: "Booking inquiry",
    body: "Event name:\nDate:\nCity / venue:\nSet length & time:\nExpected capacity:\nBudget / fee range:\n",
  },
  {
    id: "collaboration",
    title: "Music Collaboration",
    description: "Co-productions, vocals, remixes.",
    subject: "Music collaboration",
    body: "Project:\nYour role / links to your work:\nTimeline:\n",
  },
  {
    id: "label",
    title: "Label / A&R",
    description: "Releases, signings, promo requests.",
    subject: "Label / A&R inquiry",
    body: "Label / company:\nWhat you're looking for:\n",
  },
  {
    id: "general",
    title: "General Inquiry",
    description: "Press, interviews and everything else.",
    subject: "General inquiry",
    body: "",
  },
] as const;
