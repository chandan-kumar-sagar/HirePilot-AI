import cluster from "cluster";
import os from "os";

// We import the main app logic without immediately listening if we want to control it,
// but since server.js calls listen(), we can just import server.js directly.
// Note: If server.js hardcodes `app.listen()`, it will work fine in cluster mode.

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  console.log(`[Cluster] Primary process ${process.pid} is running`);
  console.log(`[Cluster] Forking ${cpuCount} workers...`);

  // Fork workers for each CPU core
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    console.log(`[Cluster] Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log("[Cluster] Starting a new worker...");
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection.
  // In this case, it is an HTTP server.
  console.log(`[Cluster] Worker ${process.pid} started`);
  
  // By importing server.js, the app will listen on PORT. 
  // Node's cluster module automatically load balances across the workers.
  import("./src/server.js");
}
