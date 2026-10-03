import {
  IconPond,
  IconFeedTray,
  IconRupee,
  IconShrimp,
  IconLanguages,
  IconOfflineSync,
  IconRoles,
  IconBuoy,
  IconRadioTower,
  IconCloudDrop,
  IconPhoneApp,
} from "@/components/icons";

/* ── Images ─────────────────────────────────────────────────────────── */

export const yellowDeviceImg = "/attached_assets/upcheck-yellow-device.webp";
export const appScreenshotImg = "/attached_assets/upcheck-farm-app.jpg";
export const aquaculturePensImg = "/attached_assets/aquaculture-pens.webp";
export const shrimpHarvestImg = "/attached_assets/shrimp-harvest.webp";
export const fishermanBoatImg = "/attached_assets/fisherman-boat.webp";
export const diseaseShrimpImg = "/attached_assets/disease-shrimp.jpg";
export const platformAccuracyImg = "/attached_assets/platform-accuracy.webp";
export const liveAnalyticsSeaImg = "/attached_assets/live-analytics-sea.webp";
export const aiFeedingSeaweedImg = "/attached_assets/ai-feeding-seaweed.jpg";
export const traceabilityPlaceholderImg = "/attached_assets/traceability-placeholder.webp";

/* ── The four headline workflows ─────────────────────────────────────── */

export const detailedSections = [
  {
    name: "Pond Monitoring & Daily Log",
    icon: IconPond,
    description:
      "Every pond's working record in one place — dissolved oxygen, pH, temperature and salinity, feed given by meal, tray residue, mortality and treatments. A multi-pond grid lets one person log the whole farm in a single morning round.",
    points: [
      "Log the whole farm in one pass, not pond by pond",
      "Works offline at the pond bank and syncs when signal returns",
      "Weekly chemistry, plankton and Vibrio counts in the same record",
    ],
  },
  {
    name: "Feed Advisor",
    icon: IconFeedTray,
    description:
      "How much to feed today, adjusted for tray residue, water conditions and molt stage. Where the readings are thin the advisor returns a range instead of a falsely precise number, and says what to go and measure.",
    points: [
      "Tray-residue adjusted, so uneaten feed stops becoming ammonia",
      "Lunar molt windows factored into the daily ration",
      "States what each recommendation was computed from",
    ],
  },
  {
    name: "Cycle Economics & Reckoning",
    icon: IconRupee,
    description:
      "Feed conversion ratio, survival rate, cost per kilo, break-even count band, margin and return — computed from the record you kept all cycle, not estimated in a spreadsheet after harvest.",
    points: [
      "Costs and feed attributed to the crop, not the farm in general",
      "Break-even priced against count bands, the way buyers actually pay",
      "Dealer credit tracked as a balance instead of remembered",
    ],
  },
  {
    name: "Disease Risk & Responsible Treatment",
    icon: IconShrimp,
    description:
      "A symptom checker that ranks likely causes from what you can actually see — on the animal, in its behaviour, in the water — instead of a guess from a WhatsApp group. Paired with a banned-substance warning at the moment a treatment is recorded.",
    points: [
      "Ranked candidates from observable signs, not a single guess",
      "Warns on export-banned substances before they go in the water",
      "Treatment history kept per pond for audit and certification",
    ],
  },
];

// Everything else in the app, beyond the four headline workflows above.
export const alsoInNeerani = [
  { title: "Daily and feed logs", text: "The morning round and every meal, logged pond by pond or across the farm in one pass." },
  { title: "Alerts on the home screen", text: "Anything abnormal shows up plainly the moment the app opens, not buried in a chart." },
  { title: "Workforce and tasks", text: "Assign jobs, track attendance, and have a manager verify the work was done." },
  { title: "Inventory", text: "Feed, chemicals and probiotics drawn down as they are used, flagged before they run out." },
  { title: "Finance", text: "Expenses and income by pond and crop, plus the credit taken from feed dealers." },
  { title: "Harvest planning and records", text: "Partial and final harvests, count per kilo, buyer and price, planned ahead and logged after." },
  { title: "Calculators and simulators", text: "Change feed rate, price or stocking density and see the effect on profit before committing." },
  { title: "Exports", text: "The farm record leaves the app in a file an accountant, buyer or certifier can read." },
];

export const reasons = [
  {
    title: "It speaks the shrimp belt's languages",
    description:
      "Every screen, label and warning exists in six languages — English, Hindi, Bengali, Tamil, Telugu and Odia. The person who walks the pond bank at dawn is rarely the person who reads English.",
    icon: IconLanguages,
  },
  {
    title: "It works where the signal doesn't",
    description:
      "Ponds are not where the towers are. Neerani keeps working through a dead patch and reconciles when the connection returns — because a logging tool that fails at the pond bank is one nobody uses twice.",
    icon: IconOfflineSync,
  },
  {
    title: "A record several people can be trusted with",
    description:
      "Workers log, managers verify, and money is visible only to whom the owner allows. A farm with hired labour cannot run on one shared password — and a lender or consultant can be given a read-only view without handing over the books.",
    icon: IconRoles,
  },
];

// The connected-system story told by the scrubbed flow diagram.
export const flowNodes = [
  {
    step: "01",
    icon: IconBuoy,
    title: "Neero in the water",
    text: "The buoy wakes every 15 minutes, measures pH, oxygen and temperature, and sleeps again.",
  },
  {
    step: "02",
    icon: IconRadioTower,
    title: "Over the air",
    text: "Readings travel in small hourly batches — mobile data where there is coverage, a long-range link where there isn't.",
  },
  {
    step: "03",
    icon: IconCloudDrop,
    title: "Filed under the pond",
    text: "The cloud keeps every batch against the pond and the crop cycle it came from.",
  },
  {
    step: "04",
    icon: IconPhoneApp,
    title: "In your hand",
    text: "Neerani turns the record into alerts and guidance — offline at the pond bank, in six languages.",
  },
];

// Procedural floating bubble configurations
export const bubbleConfigs = [
  { size: 28, left: 8, duration: 14, delay: 0 },
  { size: 16, left: 18, duration: 10, delay: 3 },
  { size: 34, left: 28, duration: 18, delay: 1 },
  { size: 20, left: 45, duration: 12, delay: 5 },
  { size: 24, left: 62, duration: 15, delay: 2 },
  { size: 14, left: 74, duration: 9, delay: 4 },
  { size: 30, left: 85, duration: 16, delay: 1.5 },
  { size: 18, left: 93, duration: 11, delay: 6 },
];
