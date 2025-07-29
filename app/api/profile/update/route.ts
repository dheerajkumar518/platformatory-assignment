import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const inputData =
      (await request.json()) as Database["public"]["Tables"]["profiles"]["Insert"];

    console.log({ ...inputData });
    const { data: result, error } = await supabase
      .from("profiles")
      .upsert([{ ...inputData }]); // upsert expects an array of objects

    console.log(result, error);
    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
