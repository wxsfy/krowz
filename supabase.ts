import { createClient } from "@supabase/supabase-js";

// krowz-prod — the same database the iOS app uses
const SUPABASE_URL = "https://xmytfxopxggkoomdqhqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_89rKphUO7zyOZs34H68gKg_picIWSKk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
