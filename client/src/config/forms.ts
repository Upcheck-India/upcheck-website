/**
 * Web3Forms delivers contact-form, newsletter and feedback notifications
 * straight to the inbox tied to this access key.
 *
 * This key is PUBLIC by design — Web3Forms' own docs put it in plain HTML, and
 * any build inlines it into the JS bundle regardless. There is nothing to hide,
 * so it lives here rather than in an env var that only adds a deploy step.
 *
 * Because it is public, the protection that matters is NOT secrecy:
 *   → In the Web3Forms dashboard, allowlist BOTH upcheck.in and www.upcheck.in.
 *     (The site 308-redirects to www, so the browser sends the www origin.)
 *   → The honeypot field below silently drops the most common bot submissions.
 *
 * Key created against admin@upcheck.in. To rotate: generate a new key at
 * https://web3forms.com, replace the value below, and redeploy.
 */
export const WEB3FORMS_KEY: string = "bb8c60a4-d598-48e4-9966-45915ee2dae8";

/** True once a real key has been pasted in above. */
export const FORMS_CONFIGURED =
  WEB3FORMS_KEY.length > 0 && !WEB3FORMS_KEY.startsWith("PASTE_YOUR_");

export const CONTACT_EMAIL = "admin@upcheck.in";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Name of the honeypot input. Web3Forms silently discards any submission where
 * this field is filled — real people never see it, bots fill everything.
 * Render it on every form with `honeypotFieldProps`.
 */
export const HONEYPOT_NAME = "botcheck";

export const honeypotFieldProps = {
  type: "checkbox" as const,
  name: HONEYPOT_NAME,
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  style: { display: "none" } as const,
};

/**
 * Client-side throttle. This is not a security boundary — anyone can bypass it
 * with curl — but it stops a stuck finger or a runaway retry loop from burning
 * the 250/month free-tier quota. The real ceiling is the Web3Forms domain
 * allowlist plus their own server-side limits.
 */
const MIN_INTERVAL_MS = 20_000;
const STORAGE_KEY = "upcheck:lastFormSubmit";

function lastSubmitAt(): number {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0; // private mode / storage blocked — fail open, the server still limits
  }
}

function markSubmitted() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable; nothing to do */
  }
}

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Posts one notification to Web3Forms.
 *
 * Returns a result rather than throwing, so callers never show a success state
 * they cannot back up — the failure that started this whole audit.
 */
export async function sendFormNotification(
  fields: Record<string, string>,
  options: { throttle?: boolean } = {}
): Promise<SendResult> {
  if (!FORMS_CONFIGURED) {
    return { ok: false, error: `This form isn't configured yet. Please email ${CONTACT_EMAIL}.` };
  }

  const { throttle = true } = options;
  if (throttle) {
    const waited = Date.now() - lastSubmitAt();
    if (waited < MIN_INTERVAL_MS) {
      const seconds = Math.ceil((MIN_INTERVAL_MS - waited) / 1000);
      return {
        ok: false,
        error: `Just a moment — please wait ${seconds}s before sending again.`,
      };
    }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: "Upcheck website", ...fields }),
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(result?.message ?? `Request failed (${response.status})`);
    }

    markSubmitted();
    return { ok: true };
  } catch (err) {
    console.error("Form notification failed:", err);
    return {
      ok: false,
      error: `We couldn't send that — check your connection and try again, or email ${CONTACT_EMAIL}.`,
    };
  }
}
