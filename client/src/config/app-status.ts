/**
 * Upcheck Mobile App Launch & Store Configuration
 * 
 * Set IS_APP_LAUNCHED to:
 * - true  : App is launched and available on Google Play Store (Case 1)
 * - false : App is in "Coming Soon" / Pre-registration phase (Case 2)
 */
export const IS_APP_LAUNCHED: boolean = true;

export interface AppConfigType {
  appName: string;
  tagline: string;
  packageName: string;
  playStoreUrl: string;
  apkDownloadUrl: string;
  version: string;
  fileSize: string;
  minAndroidVersion: string;
  rating: number;
  reviewCount: string;
  downloadCount: string;
  lastUpdated: string;
  expectedRelease: string;
  features: Array<{
    title: string;
    description: string;
  }>;
}

export const APP_CONFIG: AppConfigType = {
  appName: "UpCheck Farm Manager",
  tagline: "Smart Shrimp Farming & Pond Intelligence",
  packageName: "com.upcheck.aquafarm",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.upcheck.aquafarm",
  apkDownloadUrl: "/downloads/upcheck-farm-manager.apk",
  version: "v2.4.1",
  fileSize: "28.4 MB",
  minAndroidVersion: "Android 8.0+",
  rating: 4.8,
  reviewCount: "1,280+ reviews",
  downloadCount: "10,000+",
  lastUpdated: "Aug 29, 2026",
  expectedRelease: "Q3 2026",
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
