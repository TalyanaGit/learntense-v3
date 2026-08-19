// js/supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://nykojzzxmgcgkbsacvej.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uiUBNg_GJBEzAdVs1t6HiA_0t_FaO7n";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
