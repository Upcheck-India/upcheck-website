/**
 * Upcheck Mobile App Launch & Store Configuration
 * 
 * Set IS_APP_LAUNCHED to:
 * - true  : App is launched and available on Google Play Store (Case 1)
 * - false : App is in "Coming Soon" / Pre-registration phase (Case 2)
 */
export const IS_APP_LAUNCHED: boolean = false;

export interface AppConfigType {
  appName: string;
  tagline: string;
  packageName: string;
  playStoreUrl: string;
  version: string;
  fileSize: string;
  minAndroidVersion: string;
  lastUpdated: string;
  expectedRelease: string;
  features: Array<{
    title: string;
    description: string;
  }>;
}

export const APP_CONFIG: AppConfigType = {
  appName: "Neerani by Upcheck",
  tagline: "Smart Shrimp Farming & Pond Intelligence",
  packageName: "com.upcheck.aquafarm",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.upcheck.aquafarm",
  version: "Closed beta",
  fileSize: "—",
  minAndroidVersion: "Android 8.0+",
  lastUpdated: "Sep 2026",
  expectedRelease: "Public release date to be announced",
  features: [
    {
      title: "Real-time Pond Alerts",
      description: "Instant push notifications for critical pH drops, low DO, and molting cycles.",
    },
    {
      title: "Biomass & Feed Calculator",
      description: "Automated biomass tracking and precision feeding recommendations.",
    },
    {
      title: "Multi-Farm Dashboard",
      description: "Manage multiple farms and ponds simultaneously from one account.",
    },
    {
      title: "Offline Sync Mode",
      description: "Log farm records and check sensor logs even with patchy pond network connectivity.",
    },
  ],
};
