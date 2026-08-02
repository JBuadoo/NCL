export type SubmissionKind =
  | "application"
  | "referral"
  | "tour_request"
  | "benefits_screening";

export type NotificationPayload = {
  kind: SubmissionKind;
  summary: string;
  details: Record<string, string | null | undefined>;
};

const KIND_LABEL: Record<SubmissionKind, string> = {
  application: "Self Application",
  referral: "Referral",
  tour_request: "Tour Request",
  benefits_screening: "Benefits Screening",
};

function formatDetails(details: NotificationPayload["details"]): string {
  return Object.entries(details)
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

async function sendEmail(payload: NotificationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL || "New Creation Living <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "Email notify skipped: set RESEND_API_KEY and NOTIFY_EMAIL in .env.local"
    );
    return;
  }

  const label = KIND_LABEL[payload.kind];
  const body = [
    `New ${label} submission on New Creation Living.`,
    "",
    payload.summary,
    "",
    formatDetails(payload.details),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New NCL ${label}: ${payload.summary}`,
      text: body,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed (${response.status}): ${errorText}`);
  }
}

async function sendSms(payload: NotificationPayload): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.NOTIFY_PHONE;

  if (!accountSid || !authToken || !from || !to) {
    console.warn(
      "SMS notify skipped: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, and NOTIFY_PHONE in .env.local"
    );
    return;
  }

  const label = KIND_LABEL[payload.kind];
  const message = `NCL: New ${label} — ${payload.summary}. Check the dashboard.`;

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: message,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio failed (${response.status}): ${errorText}`);
  }
}

/**
 * Notify staff by email and SMS after a successful form insert.
 * Failures are logged only — they never fail the visitor's submission.
 */
export async function notifyNewSubmission(payload: NotificationPayload): Promise<void> {
  const results = await Promise.allSettled([sendEmail(payload), sendSms(payload)]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Submission notification failed:", result.reason);
    }
  }
}
