"use server";

import { createClient } from "@supabase/supabase-js";
import { notifyNewSubmission } from "@/lib/notify";

export type FormActionResult =
  | { ok: true }
  | { ok: false; error: string };

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createClient(url, anonKey);
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function requireYesExplain(
  answer: string,
  explanation: string,
  label: string
): string | null {
  if (answer === "Yes" && !explanation) {
    return `Please explain for: ${label}`;
  }
  return null;
}

export async function submitApplication(formData: FormData): Promise<FormActionResult> {
  const payload = {
    first_name: text(formData, "first_name"),
    last_name: text(formData, "last_name"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    gender: text(formData, "gender"),
    date_of_birth: text(formData, "date_of_birth"),
    benefit_type: text(formData, "benefit_type"),
    situation_explanation: text(formData, "situation_explanation"),
    mobility_limitations: text(formData, "mobility_limitations"),
    mobility_explanation: text(formData, "mobility_explanation"),
    mental_limitations: text(formData, "mental_limitations"),
    mental_explanation: text(formData, "mental_explanation"),
    medications_independent: text(formData, "medications_independent"),
    crime_conviction: text(formData, "crime_conviction"),
    crime_explanation: text(formData, "crime_explanation"),
    monthly_benefit_amount: text(formData, "monthly_benefit_amount"),
    medical_prescriptions: text(formData, "medical_prescriptions"),
    medical_explanation: text(formData, "medical_explanation"),
    drug_free_commitment: text(formData, "drug_free_commitment"),
    value_understanding: text(formData, "value_understanding"),
    living_with_others: text(formData, "living_with_others"),
    home_not_short_term: text(formData, "home_not_short_term"),
    payee_agreement: text(formData, "payee_agreement"),
    roommate_commitment: text(formData, "roommate_commitment"),
    referring_party_info: text(formData, "referring_party_info"),
    how_heard: text(formData, "how_heard"),
    move_timeline: text(formData, "move_timeline"),
    emergency_contact: text(formData, "emergency_contact"),
  };

  const required: (keyof typeof payload)[] = [
    "first_name",
    "last_name",
    "phone",
    "email",
    "gender",
    "date_of_birth",
    "benefit_type",
    "situation_explanation",
    "mobility_limitations",
    "mental_limitations",
    "medications_independent",
    "crime_conviction",
    "monthly_benefit_amount",
    "medical_prescriptions",
    "drug_free_commitment",
    "value_understanding",
    "living_with_others",
    "home_not_short_term",
    "payee_agreement",
    "roommate_commitment",
    "referring_party_info",
    "how_heard",
    "move_timeline",
  ];

  if (required.some((key) => !payload[key])) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const explainError =
    requireYesExplain(payload.mobility_limitations, payload.mobility_explanation, "mobility limitations") ||
    requireYesExplain(payload.mental_limitations, payload.mental_explanation, "mental limitations") ||
    requireYesExplain(payload.crime_conviction, payload.crime_explanation, "crime conviction") ||
    requireYesExplain(payload.medical_prescriptions, payload.medical_explanation, "medical prescriptions");

  if (explainError) return { ok: false, error: explainError };

  try {
    const { error } = await getServerSupabase().from("applications").insert({
      ...payload,
      mobility_explanation: payload.mobility_explanation || null,
      mental_explanation: payload.mental_explanation || null,
      crime_explanation: payload.crime_explanation || null,
      medical_explanation: payload.medical_explanation || null,
      emergency_contact: payload.emergency_contact || null,
    });

    if (error) {
      console.error("Application submission failed:", error);
      return { ok: false, error: error.message };
    }

    await notifyNewSubmission({
      kind: "application",
      summary: `${payload.first_name} ${payload.last_name}`,
      details: {
        Name: `${payload.first_name} ${payload.last_name}`,
        Phone: payload.phone,
        Email: payload.email,
        Gender: payload.gender,
        DOB: payload.date_of_birth,
        "Benefit type": payload.benefit_type,
        "Monthly benefits": payload.monthly_benefit_amount,
        "Move timeline": payload.move_timeline,
        Situation: payload.situation_explanation,
        "Drug-free commitment": payload.drug_free_commitment,
        "Payee agreement": payload.payee_agreement,
        "Emergency contact": payload.emergency_contact || "—",
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("Application submission failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed.",
    };
  }
}

export async function submitReferral(formData: FormData): Promise<FormActionResult> {
  const payload = {
    referrer_name: text(formData, "referrer_name"),
    referrer_role: text(formData, "referrer_role"),
    organization: text(formData, "organization"),
    phone: text(formData, "phone"),
    referee_first_name: text(formData, "referee_first_name"),
    referee_last_name: text(formData, "referee_last_name"),
    referee_phone: text(formData, "referee_phone"),
    referee_email: text(formData, "referee_email"),
    gender: text(formData, "gender"),
    date_of_birth: text(formData, "date_of_birth"),
    benefit_type: text(formData, "benefit_type"),
    situation_explanation: text(formData, "situation_explanation"),
    mobility_limitations: text(formData, "mobility_limitations"),
    mobility_explanation: text(formData, "mobility_explanation"),
    mental_limitations: text(formData, "mental_limitations"),
    mental_explanation: text(formData, "mental_explanation"),
    medications_independent: text(formData, "medications_independent"),
    crime_conviction: text(formData, "crime_conviction"),
    crime_explanation: text(formData, "crime_explanation"),
    monthly_benefit_amount: text(formData, "monthly_benefit_amount"),
    medical_prescriptions: text(formData, "medical_prescriptions"),
    medical_explanation: text(formData, "medical_explanation"),
    drug_free_commitment: text(formData, "drug_free_commitment"),
    value_understanding: text(formData, "value_understanding"),
    living_with_others: text(formData, "living_with_others"),
    home_not_short_term: text(formData, "home_not_short_term"),
    payee_agreement: text(formData, "payee_agreement"),
    roommate_commitment: text(formData, "roommate_commitment"),
    how_heard: text(formData, "how_heard"),
    move_timeline: text(formData, "move_timeline"),
    emergency_contact: text(formData, "emergency_contact"),
  };

  const required: (keyof typeof payload)[] = [
    "referrer_name",
    "referrer_role",
    "phone",
    "referee_first_name",
    "referee_last_name",
    "gender",
    "date_of_birth",
    "benefit_type",
    "situation_explanation",
    "mobility_limitations",
    "mental_limitations",
    "medications_independent",
    "crime_conviction",
    "monthly_benefit_amount",
    "medical_prescriptions",
    "drug_free_commitment",
    "value_understanding",
    "living_with_others",
    "home_not_short_term",
    "payee_agreement",
    "roommate_commitment",
    "how_heard",
    "move_timeline",
  ];

  if (required.some((key) => !payload[key])) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  const explainError =
    requireYesExplain(payload.mobility_limitations, payload.mobility_explanation, "mobility limitations") ||
    requireYesExplain(payload.mental_limitations, payload.mental_explanation, "mental limitations") ||
    requireYesExplain(payload.crime_conviction, payload.crime_explanation, "crime conviction") ||
    requireYesExplain(payload.medical_prescriptions, payload.medical_explanation, "medical prescriptions");

  if (explainError) return { ok: false, error: explainError };

  try {
    const { error } = await getServerSupabase().from("referrals").insert({
      ...payload,
      organization: payload.organization || null,
      referee_phone: payload.referee_phone || null,
      referee_email: payload.referee_email || null,
      mobility_explanation: payload.mobility_explanation || null,
      mental_explanation: payload.mental_explanation || null,
      crime_explanation: payload.crime_explanation || null,
      medical_explanation: payload.medical_explanation || null,
      emergency_contact: payload.emergency_contact || null,
    });

    if (error) {
      console.error("Referral submission failed:", error);
      return { ok: false, error: error.message };
    }

    await notifyNewSubmission({
      kind: "referral",
      summary: `${payload.referrer_name} referred ${payload.referee_first_name} ${payload.referee_last_name}`,
      details: {
        Referrer: payload.referrer_name,
        Role: payload.referrer_role,
        Organization: payload.organization || "—",
        "Referrer phone": payload.phone,
        Referee: `${payload.referee_first_name} ${payload.referee_last_name}`,
        "Benefit type": payload.benefit_type,
        "Move timeline": payload.move_timeline,
        Situation: payload.situation_explanation,
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("Referral submission failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed.",
    };
  }
}

export async function submitTourRequest(formData: FormData): Promise<FormActionResult> {
  const first_name = text(formData, "tour-first");
  const last_name = text(formData, "tour-last");
  const preferred_date = text(formData, "tour-date");
  const gender = text(formData, "tour-gender");

  if (!first_name || !last_name || !preferred_date || !gender) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  try {
    const { error } = await getServerSupabase().from("tour_requests").insert({
      first_name,
      last_name,
      preferred_date,
      gender,
    });

    if (error) {
      console.error("Tour request submission failed:", error);
      return { ok: false, error: error.message };
    }

    await notifyNewSubmission({
      kind: "tour_request",
      summary: `${first_name} ${last_name} — ${preferred_date}`,
      details: {
        Name: `${first_name} ${last_name}`,
        "Preferred date": preferred_date,
        Gender: gender,
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("Tour request submission failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed.",
    };
  }
}

export async function submitBenefitsScreening(
  formData: FormData
): Promise<FormActionResult> {
  const first_name = text(formData, "ben-first");
  const last_name = text(formData, "ben-last");
  const phone = text(formData, "ben-phone");
  const email = text(formData, "ben-email");
  const benefit_type = text(formData, "ben-type");
  const applied_before = text(formData, "ben-applied");
  const notes = text(formData, "ben-notes");

  if (!first_name || !last_name || !phone || !email || !benefit_type || !applied_before) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  try {
    const { error } = await getServerSupabase().from("benefits_screenings").insert({
      first_name,
      last_name,
      phone,
      email,
      benefit_type,
      applied_before,
      notes: notes || null,
    });

    if (error) {
      console.error("Benefits screening submission failed:", error);
      return { ok: false, error: error.message };
    }

    await notifyNewSubmission({
      kind: "benefits_screening",
      summary: `${first_name} ${last_name}`,
      details: {
        Name: `${first_name} ${last_name}`,
        Phone: phone,
        Email: email,
        "Benefit type": benefit_type,
        "Applied before": applied_before,
        Notes: notes || "—",
      },
    });

    return { ok: true };
  } catch (err) {
    console.error("Benefits screening submission failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed.",
    };
  }
}
