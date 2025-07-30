// temporal/worker.ts

import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities";

async function run() {
  const temporalAddress =
    process.env.TEMPORAL_ADDRESS || "localhost:7233"; // Fallback for local dev
  console.log(`Connecting to Temporal at: ${temporalAddress}`);

  const connection = await NativeConnection.connect({
    address: temporalAddress,
  });
  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve("./workflows"),
    activities,
    taskQueue: "profile-task",
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
