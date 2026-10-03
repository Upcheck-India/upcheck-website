// Brevo list "Upcheck Website Newsletter" (folder "Your first folder").
const NEWSLETTER_LIST_ID = 3;

/**
 * Adds an email to the Brevo newsletter list. Existing contacts are updated
 * rather than rejected, so re-subscribing is idempotent. Contacts who previously
 * unsubscribed stay blocklisted in Brevo, which is what we want.
 */
export async function subscribeToNewsletter(email: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not set");

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, listIds: [NEWSLETTER_LIST_ID], updateEnabled: true }),
  });

  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
}
