import { Connection, Client } from "@temporalio/client";
import { Tables } from "@/database.types";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const profileData = JSON.parse(body) as Tables<"profiles">;

    const connection = await Connection.connect();
    const client = new Client({ connection });

    await client.workflow.start("saveProfileWorkflow", {
      args: [profileData],
      taskQueue: "profile-task",
      workflowId: `profile-${profileData.id}-${Date.now()}`,
    });

    return new Response(JSON.stringify({ status: "Workflow started" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
