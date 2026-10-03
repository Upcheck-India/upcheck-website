/**
 * Upcheck Pond icon set — React components.
 *
 * One shared factory enforces the set's style spec (24px grid, 1.75px stroke,
 * round caps/joins) so every icon stays visually consistent. Outlines follow
 * `currentColor`; each icon carries exactly one filled water accent that
 * fills with `var(--uc-accent, #00C9E4)` — define `--uc-accent` in CSS to
 * re-tint the accent (the site default is set in index.css).
 *
 * Raw SVGs live in /icons (source of truth, mirrored here) along with
 * icons/style-spec.json and icons/preview.html. `npm run icons:export`
 * regenerates the preview and exports Android/iOS PNGs from them.
 */
import type { ReactNode, SVGProps } from "react";

export type UpIconProps = SVGProps<SVGSVGElement> & {
  /** Icon width/height in px. Tailwind classes like w-4 h-4 override it. */
  size?: number | string;
};

/** Fill for the one accent element each icon carries. */
const accent = { fill: "var(--uc-accent, #00C9E4)" } as const;

function UpIcon({ size = 24, children, ...props }: UpIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Aquaculture core ─────────────────────────────────────────────────── */

export function IconShrimp(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12.5 19A7.5 7.5 0 1 1 20 11.5h-3A4.5 4.5 0 1 0 12.5 16z" />
      <path d="M5.5 11.5h2" />
      <path d="M7.6 6.6l1.35 1.35" />
      <path d="M12.5 4.5v2" />
      <path d="M17.4 6.6l-1.35 1.35" />
      <path d="M19.9 10.9l2-1" />
      <path d="M20 11.5h2" />
      <path d="M19.9 12.1l2 1" />
      <path d="M12.5 19l-2.1 1.5" />
      <path d="M12.9 18.8c1.7.4 3 1.5 3.7 3" />
      <path d="M12.9 17.9c1.2.2 2.2.8 3 1.7" />
      <circle cx="11.3" cy="17.5" r="1.05" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconFish(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M4.5 12c.3-3.2 2.7-5.3 6-5.3h3.2c2.9 0 4.9 2.2 4.9 5.2" />
      <path d="M4.5 12c.3 3.1 2.6 5.2 5.9 5.2h3c2.8 0 4.8-1.9 5.2-4.9" />
      <path d="M18.6 12l2.9-2.7" />
      <path d="M18.6 12l2.9 2.7" />
      <path d="M9.4 8.3c-1.7 1.3-1.7 6.1 0 7.4" />
      <circle cx="7" cy="10.6" r="1.1" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconPond(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 4.6c4.6 0 8.4 3.1 8.4 6.9 0 3.8-3.8 7.4-8.4 7.4S3.6 15.3 3.6 11.5 7.4 4.6 12 4.6z" />
      <path d="M6.6 12.2c.9-.9 2.1-.9 3 0s2.1.9 3 0 2.1-.9 3 0 2.1.9 3 0" />
      <path d="M9.2 15.1c.9-.9 2.1-.9 3 0s2.1.9 3 0" />
      <circle cx="12" cy="8.6" r="1.4" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconWaterDrop(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 3.2c3.3 3.9 5.8 7 5.8 9.9a5.8 5.8 0 1 1-11.6 0C6.2 10.2 8.7 7.1 12 3.2z" />
      <path d="M12 11c1.3 1.7 2 2.8 2 3.7a2 2 0 1 1-4 0c0-.9.7-2 2-3.7z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconThermometer(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M14 4v9.8a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
      <path d="M16.8 7h2.2" />
      <path d="M16.8 10.5h2.2" />
      <path d="M11.4 11h1.2v4.6h-1.2z" stroke="none" style={accent} />
      <circle cx="12" cy="17.3" r="2" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconAeration(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M4 19c1.25-1.25 2.75-1.25 4 0s2.75 1.25 4 0 2.75-1.25 4 0 2.75 1.25 4 0" />
      <circle cx="8.5" cy="13.5" r="1.7" />
      <circle cx="16" cy="13" r="1.4" />
      <circle cx="12.3" cy="8.5" r="2.2" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconTestKit(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M9.3 3.2h5.4" />
      <path d="M10.3 3.2v13.6a1.85 1.85 0 0 0 3.7 0V3.2" />
      <path d="M10.3 12.8v4a1.85 1.85 0 0 0 3.7 0v-4z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconFeedTray(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M3.5 13.5h17" />
      <path d="M5.5 13.5c0 3.4 2.9 5.5 6.5 5.5s6.5-2.1 6.5-5.5" />
      <circle cx="8.5" cy="10.8" r="1.15" stroke="none" style={accent} />
      <circle cx="12" cy="9.6" r="1.15" stroke="none" style={accent} />
      <circle cx="15.5" cy="11" r="1.15" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconMoltMoon(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M20.9 12.8A8.8 8.8 0 1 1 11.2 3.1a6.9 6.9 0 0 0 9.7 9.7z" />
      <path d="M17 4.8l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconHarvestNet(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 4.2L5.2 17.4a9 9 0 0 0 13.6 0L12 4.2z" />
      <path d="M8.9 10.3Q12 12.6 15.1 10.3" />
      <path d="M7.1 13.8Q12 16.4 16.9 13.8" />
      <path d="M10.4 8L9 15.5" />
      <path d="M13.6 8l1.4 7.5" />
      <circle cx="12" cy="4.2" r="1.25" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconBuoy(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M8.6 15.8l1.5-6.2h3.8l1.5 6.2H8.6z" />
      <path d="M10.3 12.6h3.4" />
      <path d="M12 9.6V6.3" />
      <path d="M3.2 16.8c.65-.65 1.55-.65 2.2 0s1.55.65 2.2 0" />
      <path d="M15.8 16.8c.65-.65 1.55-.65 2.2 0s1.55.65 2.2 0" />
      <path d="M9.4 19.6c.8-.8 1.9-.8 2.7 0s1.9.8 2.7 0" />
      <circle cx="12" cy="5.1" r="1.25" stroke="none" style={accent} />
    </UpIcon>
  );
}

/* ── Records, economics and alerts ────────────────────────────────────── */

export function IconRupee(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M6.5 3.5h11" />
      <path d="M6.5 8.5h11" />
      <path d="M9.5 13.5C16.2 13.5 16.2 3.5 9.5 3.5" />
      <path d="M6.5 13.5h3" />
      <path d="M6.5 13.5l7.5 7" />
    </UpIcon>
  );
}

export function IconGrowthChart(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M4.5 4v15.5h15.5" />
      <path d="M8 15.3l3.3-3.4 2.8 1.9 4.4-4.9" />
      <circle cx="18.5" cy="8.9" r="1.35" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconCycleCalendar(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2" />
      <path d="M8.5 3.2v3.4" />
      <path d="M15.5 3.2v3.4" />
      <path d="M4.5 10h15" />
      <circle cx="12" cy="14.8" r="1.4" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconPondAlert(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 4.5l4.6 8.1h-9.2z" />
      <path d="M12 7.6v2.2" />
      <circle cx="12" cy="11.3" r="1.05" stroke="none" style={accent} />
      <path d="M4.5 18.6c1.2-1.2 2.8-1.2 4 0s2.8 1.2 4 0 2.8-1.2 4 0 2.8 1.2 4 0" />
    </UpIcon>
  );
}

export function IconBell(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M18 16.5V11a6 6 0 0 0-12 0v5.5l-1.7 2.2h15.4z" />
      <path d="M10.4 21.2a1.6 1.6 0 0 0 3.2 0" />
      <circle cx="17.6" cy="6.2" r="1.35" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconLedger(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M6.6 3.4h10.8a1.6 1.6 0 0 1 1.6 1.6v13.6a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 18.6V5a1.6 1.6 0 0 1 1.6-1.6z" />
      <path d="M9.6 3.4v16.8" />
      <path d="M12.8 8h3.6" />
      <path d="M12.8 11.4h3.6" />
      <rect x="12.8" y="14.6" width="3.6" height="1.6" rx="0.8" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconCoin(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.8" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconScale(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M4 7.2h16" />
      <path d="M4 7.2v5.1" />
      <path d="M20 7.2v5.1" />
      <path d="M2 12.3a2.1 2.1 0 0 0 4.2 0" />
      <path d="M17.8 12.3a2.1 2.1 0 0 0 4.2 0" />
      <path d="M12 7.2v13" />
      <path d="M8.6 20.2h6.8" />
      <path d="M12 7.2V6.2" />
      <circle cx="12" cy="4.9" r="1.3" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconPill(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M6.63 13.83l7.2-7.2a2.5 2.5 0 0 1 3.54 3.54l-7.2 7.2a2.5 2.5 0 0 1-3.54-3.54z" />
      <path d="M10.23 10.23l3.54 3.54" />
      <path d="M10.23 10.23l3.6-3.6a2.5 2.5 0 0 1 3.54 3.54l-3.6 3.6z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconMicroscope(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M15.9 6.7L9.1 13.5L6.8 11.2L13.6 4.4z" />
      <path d="M9.4 13.6c2.7 1.85 3.7 5.3 2.15 7.9" />
      <path d="M5.2 21.5h9.6" />
      <path d="M4.2 14.8h6.2" />
      <path d="M7.6 11.7c.8 1.05 1.2 1.75 1.2 2.25a1.2 1.2 0 1 1-2.4 0c0-.5.4-1.2 1.2-2.25z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconStockBox(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="4.5" y="5.5" width="15" height="13" rx="2" />
      <path d="M12 8.6v5.3" />
      <path d="M9.4 11.6l2.6 2.6 2.6-2.6" />
      <circle cx="16.9" cy="8.1" r="1.25" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconTasks(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="5" y="4.6" width="14" height="16.2" rx="2" />
      <rect x="9.6" y="3" width="4.8" height="3.2" rx="1.6" stroke="none" style={accent} />
      <path d="M9.1 12.6l2 2 3.9-4.1" />
    </UpIcon>
  );
}

/* ── People and reach ─────────────────────────────────────────────────── */

export function IconRoles(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="8.6" cy="7.6" r="2.9" />
      <path d="M3.6 18.9c0-3.1 2.2-5.2 5-5.2s5 2.1 5 5.2" />
      <circle cx="17.1" cy="9.7" r="2.1" stroke="none" style={accent} />
      <path d="M13.9 18.9c0-2.4 1.5-4 3.2-4s3.2 1.6 3.2 4" />
    </UpIcon>
  );
}

export function IconUser(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="8.2" r="3.6" stroke="none" style={accent} />
      <path d="M5 20.5c0-4.3 3.1-7.1 7-7.1s7 2.8 7 7" />
    </UpIcon>
  );
}

export function IconLanguages(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 3.4c-3.1 2.6-4.7 5.5-4.7 8.6s1.6 6 4.7 8.6c3.1-2.6 4.7-5.5 4.7-8.6S15.1 6 12 3.4z" />
      <path d="M3.9 9.3c2.6 1.2 5.3 1.8 8.1 1.8s5.5-.6 8.1-1.8" />
      <path d="M3.9 14.7c2.6-1.2 5.3-1.8 8.1-1.8s5.5.6 8.1 1.8" />
      <circle cx="12" cy="12" r="1.5" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconOfflineSync(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="6.6" y="3.4" width="10.8" height="17.4" rx="2.3" />
      <path d="M9.2 12.4c.65-.65 1.55-.65 2.2 0s1.55.65 2.2 0 1.55-.65 2.2 0" />
      <path d="M10.1 15.2c.55-.55 1.3-.55 1.85 0s1.3.55 1.85 0" />
      <path d="M10.2 18.6h3.6" />
      <circle cx="14.6" cy="6.6" r="1.15" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconInspect(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="10" cy="10" r="6.2" />
      <path d="M14.7 14.7l5.5 5.5" />
      <path d="M10 6.9c1.25 1.55 1.9 2.65 1.9 3.5a1.9 1.9 0 1 1-3.8 0c0-.85.65-1.95 1.9-3.5z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconBanChemical(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M5.9 5.9l12.2 12.2" />
      <rect x="6.5" y="9.7" width="11" height="4.6" rx="2.3" />
      <path d="M12 9.7v4.6" />
      <path d="M12 9.7H9.5a2.3 2.3 0 0 0 0 4.6H12z" stroke="none" style={accent} />
    </UpIcon>
  );
}

/* ── System and energy ─────────────────────────────────────────────────── */

export function IconSolar(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 3v2.3" />
      <path d="M12 18.7V21" />
      <path d="M3 12h2.3" />
      <path d="M18.7 12H21" />
      <path d="M6.34 6.34l1.63 1.63" />
      <path d="M16.03 16.03l1.63 1.63" />
      <path d="M17.66 6.34l-1.63 1.63" />
      <path d="M7.97 16.03l-1.63 1.63" />
      <circle cx="12" cy="12" r="1.7" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconBattery(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="3.5" y="8.4" width="15.5" height="7.2" rx="1.8" />
      <path d="M20.4 10.9v2.2" />
      <rect x="6.1" y="10" width="8" height="4" rx="1.2" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconRadioTower(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M9.2 20.8L12 5.6" />
      <path d="M14.8 20.8L12 5.6" />
      <path d="M10 15.6l4-2.2" />
      <path d="M14 15.6l-4-2.2" />
      <path d="M7.6 20.8h8.8" />
      <path d="M8.6 9.3a3.2 3.2 0 0 0 0 5.6" />
      <path d="M15.4 9.3a3.2 3.2 0 0 1 0 5.6" />
      <circle cx="12" cy="4.3" r="1.25" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconCloudDrop(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="M12.5 8.6c1.45 1.8 2.15 3.05 2.15 3.95a2.15 2.15 0 1 1-4.3 0c0-.9.7-2.15 2.15-3.95z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconAdvice(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M6.2 3.6h11.6a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2h-6.4l-3.7 3.2v-3.2H6.2a2 2 0 0 1-2-2V5.6a2 2 0 0 1 2-2z" />
      <path d="M8.6 7.8h6.8" />
      <path d="M8.6 11.2h4.2" />
    </UpIcon>
  );
}

/* ── App shell and actions ────────────────────────────────────────────── */

export function IconPhoneApp(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3.4" />
      <path d="M12 6.9c2.45 2.9 4.05 5.15 4.05 7.05a4.05 4.05 0 1 1-8.1 0C7.95 12.05 9.55 9.8 12 6.9z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconDashboard(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconHomePond(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M3.9 11L12 3.9l8.1 7.1" />
      <path d="M5.4 9.9v9a1.5 1.5 0 0 0 1.5 1.5h10.2a1.5 1.5 0 0 0 1.5-1.5v-9" />
      <path d="M8.7 16.3c.65-.65 1.55-.65 2.2 0s1.55.65 2.2 0 1.55-.65 2.2 0" />
      <circle cx="12" cy="13.4" r="1.25" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconDownload(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 3.8v10.4" />
      <path d="M7.6 10.2l4.4 4.4 4.4-4.4" />
      <path d="M4 18.9c1.25-1.25 2.75-1.25 4 0s2.75 1.25 4 0 2.75-1.25 4 0 2.75 1.25 4 0" />
      <circle cx="9" cy="16.7" r=".95" stroke="none" style={accent} />
      <circle cx="15" cy="16.7" r=".95" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconExportFile(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M6.6 3.2h7.8l4.6 4.6v11.6a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 19.4V4.8a1.6 1.6 0 0 1 1.6-1.6z" />
      <path d="M14.4 3.2v4.6h4.6" />
      <path d="M12 16.4v-5.6" />
      <path d="M9.6 13l2.4-2.4 2.4 2.4" />
      <circle cx="12" cy="17.6" r="1.2" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconSprout(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 21v-7.4" />
      <path d="M12 13.6c-4.6 0-8-3.2-8-7.6 4.6 0 8 3.2 8 7.6z" />
      <path d="M12 13.6c4.2 0 7.2-2.9 7.2-6.8-4.2 0-7.2 2.9-7.2 6.8z" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconInsight(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="9.3" r="5.4" />
      <path d="M9.6 15.1v1.6" />
      <path d="M14.4 15.1v1.6" />
      <path d="M9 19.5h6" />
      <path d="M12 6.6c1.6 2 2.4 3.4 2.4 4.5a2.4 2.4 0 1 1-4.8 0c0-1.1.8-2.5 2.4-4.5z" stroke="none" style={accent} />
    </UpIcon>
  );
}

/* ── Contact and time ─────────────────────────────────────────────────── */

export function IconMail(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="M4.2 7.4c2.6 2.2 5.2 4.5 7.8 6.7 2.6-2.2 5.2-4.5 7.8-6.7" />
      <circle cx="12" cy="12.3" r="1.5" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconClock(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.4 2.4" />
      <circle cx="12" cy="12" r="1.4" stroke="none" style={accent} />
    </UpIcon>
  );
}

export function IconMapPin(props: UpIconProps) {
  return (
    <UpIcon {...props}>
      <path d="M12 2.6c3.8 0 6.9 3.1 6.9 6.9 0 5-6.9 11.9-6.9 11.9S5.1 14.5 5.1 9.5C5.1 5.7 8.2 2.6 12 2.6z" />
      <path d="M12 5.7c1.15 1.45 1.75 2.45 1.75 3.25a1.75 1.75 0 1 1-3.5 0c0-.8.6-1.8 1.75-3.25z" stroke="none" style={accent} />
    </UpIcon>
  );
}
