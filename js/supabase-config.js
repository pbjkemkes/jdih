const SUPABASE_URL =
"https://wciimitdbnfqvjphxjxi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_Quch2IU8YBkHDOqN32ZPLg_A5SDJkXh";

window.sb = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
