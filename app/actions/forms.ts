"use server";

import { createClient } from "@supabase/supabase-js";

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

export async function submitReferral(formData: FormData): Promise<FormActionResult> {
  const referrer_name = text(formData, "ref-name");
  const referrer_role = text(formData, "ref-role");
  const organization = text(formData, "ref-org");
  const phone = text(formData, "ref-phone");
  const client_name = text(formData, "ref-client");
  const benefit_type = text(formData, "ref-benefit");
  const notes = text(formData, "ref-notes");

  if (!referrer_name || !referrer_role || !phone || !client_name || !benefit_type) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  try {
    const { error } = await getServerSupabase().from("referrals").insert({
      referrer_name,
      referrer_role,
      organization: organization || null,
      phone,
      client_name,
      benefit_type,
      notes: notes || null,
    });

    if (error) {
      console.error("Referral submission failed:", error);
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("Referral submission failed:", err);
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

    return { ok: true };
  } catch (err) {
    console.error("Benefits screening submission failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Submission failed.",
    };
  }
}
