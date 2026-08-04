export type SubmissionKind =
  | "application"
  | "referral"
  | "tour_request"
  | "benefits_screening";

export type NotificationPayload = {
  kind: SubmissionKind;
  summary: string;
  details: Record<string, string | null | undefined>;
  /** Submitter email — receives a confirmation after successful insert */
  userEmail?: string | null;
  userName?: string | null;
};

const KIND_LABEL: Record<SubmissionKind, string> = {
  application: "Self Application",
  referral: "Referral",
  tour_request: "Tour Request",
  benefits_screening: "Benefits Screening",
};

const SUPPORT_PHONE = "(404) 731-2371";

function formatDetails(details: NotificationPayload["details"]): string {
  return Object.entries(details)
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function getFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL || "New Creation Living <onboarding@resend.dev>"
  );
}

async function sendResendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string | null;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Email skipped: set RESEND_API_KEY in .env.local");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to: [opts.to],
      ...(opts.replyTo?.trim() ? { reply_to: opts.replyTo.trim() } : {}),
      subject: opts.subject,
      text: opts.text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed (${response.status}): ${errorText}`);
  }
}

async function sendStaffEmail(payload: NotificationPayload): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) {
    console.warn("Staff email notify skipped: set NOTIFY_EMAIL in .env.local");
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

  await sendResendEmail({
    to,
    replyTo: payload.userEmail,
    subject: `New NCL ${label}: ${payload.summary}`,
    text: body,
  });
}

function buildUserConfirmation(payload: NotificationPayload): {
  subject: string;
  text: string;
} | null {
  const name = (payload.userName || "").trim() || "there";
  const preferredDate =
    typeof payload.details["Preferred date"] === "string"
      ? payload.details["Preferred date"]
      : null;
  const referee =
    typeof payload.details.Referee === "string" ? payload.details.Referee : null;

  switch (payload.kind) {
    case "application":
      return {
        subject: "We received your New Creation Living application",
        text: [
          `Hi ${name},`,
          "",
          "Thank you for applying to New Creation Living. We've received your application and our team will review it shortly.",
          "",
          "We'll follow up with you by phone or email — usually within a few hours during business hours.",
          "",
          `If you have questions in the meantime, call us at ${SUPPORT_PHONE}.`,
          "",
          "— New Creation Living",
        ].join("\n"),
      };
    case "referral":
      return {
        subject: "We received your New Creation Living referral",
        text: [
          `Hi ${name},`,
          "",
          referee
            ? `Thank you for referring ${referee} to New Creation Living. We've received your referral and our team will review it shortly.`
            : "Thank you for your referral to New Creation Living. We've received it and our team will review it shortly.",
          "",
          "We'll follow up with you by phone or email — usually within a few hours during business hours.",
          "",
          `If you have questions in the meantime, call us at ${SUPPORT_PHONE}.`,
          "",
          "— New Creation Living",
        ].join("\n"),
      };
    case "tour_request":
      return {
        subject: "We received your New Creation Living tour request",
        text: [
          `Hi ${name},`,
          "",
          preferredDate
            ? `Thank you for requesting a tour. We've received your preferred date of ${preferredDate} and will confirm a time with you soon.`
            : "Thank you for requesting a tour. We've received your request and will confirm a time with you soon.",
          "",
          `If you need to reach us sooner, call ${SUPPORT_PHONE}.`,
          "",
          "— New Creation Living",
        ].join("\n"),
      };
    case "benefits_screening":
      return {
        subject: "We received your New Creation Living benefits request",
        text: [
          `Hi ${name},`,
          "",
          "Thank you for reaching out about benefits assistance. We've received your screening request and our team will follow up shortly.",
          "",
          `If you have questions in the meantime, call us at ${SUPPORT_PHONE}.`,
          "",
          "— New Creation Living",
        ].join("\n"),
      };
    default:
      return null;
  }
}

async function sendUserConfirmation(payload: NotificationPayload): Promise<void> {
  const to = (payload.userEmail || "").trim();
  if (!to) {
    console.warn(
      `User confirmation skipped for ${payload.kind}: no submitter email provided`
    );
    return;
  }

  const message = buildUserConfirmation(payload);
  if (!message) return;

  await sendResendEmail({
    to,
    subject: message.subject,
    text: message.text,
  });
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
 * Notify staff (email + SMS) and send the submitter a confirmation email.
 * Failures are logged only — they never fail the visitor's submission.
 */
export async function notifyNewSubmission(payload: NotificationPayload): Promise<void> {
  const results = await Promise.allSettled([
    sendStaffEmail(payload),
    sendSms(payload),
    sendUserConfirmation(payload),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Submission notification failed:", result.reason);
    }
  }
}
