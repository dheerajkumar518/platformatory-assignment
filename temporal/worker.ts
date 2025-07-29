// temporal/worker.ts
import { Worker } from "@temporalio/worker";
import * as activities from "./activities";

async function run() {
  // Create a worker that will listen to the "profile-task" task queue
  // and execute the workflows defined in the workflows module
  const worker = await Worker.create({
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
