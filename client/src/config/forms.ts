/**
 * Web3Forms delivers contact-form and newsletter submissions straight to the
 * inbox tied to this access key.
 *
 * This key is PUBLIC by design — Web3Forms' own docs put it in plain HTML, and
 * any build inlines it into the JS bundle regardless. There is nothing to hide,
 * so it lives here rather than in an env var that only adds a deploy step.
 *
 * Because it is public, the protection that matters is NOT secrecy:
 *   → In the Web3Forms dashboard, restrict this key to the upcheck.in domain.
 *     A copied key is then useless anywhere else.
 *
 * Key created against admin@upcheck.in. To rotate: generate a new key at
 * https://web3forms.com, replace the value below, and redeploy.
 */
export const WEB3FORMS_KEY: string = "bb8c60a4-d598-48e4-9966-45915ee2dae8";

/** True once a real key has been pasted in above. */
export const FORMS_CONFIGURED =
  WEB3FORMS_KEY.length > 0 && !WEB3FORMS_KEY.startsWith("PASTE_YOUR_");

export const CONTACT_EMAIL = "admin@upcheck.in";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
