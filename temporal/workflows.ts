// temporal/workflows.ts
import { Tables } from "@/database.types";
import {
  proxyActivities,
  sleep,
  UntypedActivities,
} from "@temporalio/workflow";

const { saveToSupabase, pushToCrudCrud } = proxyActivities<UntypedActivities>({
  startToCloseTimeout: "1 minute",
});

export async function saveProfileWorkflow(profile: Tables<"profiles">) {
  // save to Supabase first
  await saveToSupabase(profile);
  // wait for a while before pushing to crudcrud.com
  await sleep(10000); // wait for 10 seconds
  // then push to crudcrud.com
  await pushToCrudCrud(profile);
}
