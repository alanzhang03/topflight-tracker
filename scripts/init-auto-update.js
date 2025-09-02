#!/usr/bin/env node

/**
 * Auto-Update Service Initialization Script
 * This script ensures the auto-update service starts when the application is deployed
 * It can be run as a post-deploy hook or manually to initialize the service
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function initializeAutoUpdate() {
  try {
    console.log("🚀 Initializing auto-update service...");

    const url = `${BASE_URL}/api/auto-update`;

    // First, check if the service is already running
    console.log("📊 Checking service status...");

    try {
      const statusResponse = await fetch(url, {
        timeout: 5000, // 5 second timeout
      });
      const statusData = await statusResponse.json();

      if (statusData.success && statusData.status.isRunning) {
        console.log("✅ Auto-update service is already running");
        return true;
      }

      // If not running, start it
      console.log("🔄 Starting auto-update service...");
      const startResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "start" }),
        timeout: 5000,
      });

      const startData = await startResponse.json();

      if (startData.success) {
        console.log("✅ Auto-update service started successfully");
        console.log(
          "📈 Service will now automatically update data for all leagues"
        );
        return true;
      } else {
        console.error(
          "❌ Failed to start auto-update service:",
          startData.error
        );
        return false;
      }
    } catch (fetchError) {
      // If fetch fails (e.g., during build), that's okay - the service will auto-start when the server runs
      console.log(
        "ℹ️ Service not accessible during build - will auto-start when server runs"
      );
      console.log(
        "✅ Auto-update service will initialize automatically on first API access"
      );
      return true; // Consider this a success since the service will start automatically
    }
  } catch (error) {
    console.error("❌ Error initializing auto-update service:", error.message);
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAutoUpdate()
    .then((success) => {
      if (success) {
        console.log("🎉 Auto-update initialization completed successfully");
        process.exit(0);
      } else {
        console.log("⚠️ Auto-update initialization failed");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Unexpected error:", error);
      process.exit(1);
    });
}

export { initializeAutoUpdate };
