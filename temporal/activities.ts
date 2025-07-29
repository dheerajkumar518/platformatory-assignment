// temporal/activities.ts
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { Tables } from "@/database.types";

// Environment values
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // use the service key, not anon
);

export async function saveToSupabase(profile: Tables<"profiles">) {
  await supabase.from("profiles").upsert(profile);
  console.log("Saved to Supabase:", profile);
}

export async function pushToCrudCrud(profile: Tables<"profiles">) {
  const endpoint = `https://crudcrud.com/api/${process.env.CRUDCRUD_API_KEY}/profile`;
  await axios.post(endpoint, profile);
  console.log("Pushed to crudcrud.com:", profile);
}
