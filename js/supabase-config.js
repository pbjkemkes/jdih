const SUPABASE_URL =
"https://wciimitdbnfqvjphxjxi.supabase.co";

const SUPABASE_KEY =
"sb_publishable_Quch2IU8YBkHDOqN32ZPLg_A5SDJkXh";

window.sb = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const hariIni = new Date().toISOString().slice(0,10);

const {data} = await sb
.from("access_log")
.select("*")
.gte("login_time", hariIni);
