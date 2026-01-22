import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kriumzgtdbroidtaggkn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyaXVtemd0ZGJyb2lkdGFnZ2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODUzNDYsImV4cCI6MjA4MzM2MTM0Nn0.MVETNCwvrSSXwiet4wsAoBYoQIM0JZaf6XQVI4Vrg9Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
