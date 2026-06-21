module.exports = {
  apps: [
    {
      name: "hirepilot-api",
      script: "./src/server.js",
      instances: "max", // Uses all available CPU cores for load balancing
      exec_mode: "cluster", // Enables cluster mode for load balancing
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};
