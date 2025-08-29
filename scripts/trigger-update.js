#!/usr/bin/env node

/**
 * External update trigger script
 * This can be run by cron jobs, GitHub Actions, or other external schedulers
 * to trigger updates without needing to visit the website
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function triggerUpdate(leagueCode = null) {
  try {
    const url = `${BASE_URL}/api/auto-update`;
    const body = {
      action: "force-update",
      ...(leagueCode && { leagueCode }),
    };

    console.log(
      `Triggering update${
        leagueCode ? ` for ${leagueCode}` : " for all leagues"
      }...`
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Update triggered successfully:", data.message);
      return true;
    } else {
      console.error("❌ Update failed:", data.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Error triggering update:", error.message);
    return false;
  }
}

async function startService() {
  try {
    const url = `${BASE_URL}/api/auto-update`;

    console.log("Starting auto-update service...");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "start" }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Service started successfully:", data.message);
      return true;
    } else {
      console.error("❌ Failed to start service:", data.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Error starting service:", error.message);
    return false;
  }
}

async function stopService() {
  try {
    const url = `${BASE_URL}/api/auto-update`;

    console.log("Stopping auto-update service...");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "stop" }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("✅ Service stopped successfully:", data.message);
      return true;
    } else {
      console.error("❌ Failed to stop service:", data.error);
      return false;
    }
  } catch (error) {
    console.error("❌ Error stopping service:", error.message);
    return false;
  }
}

async function getStatus() {
  try {
    const url = `${BASE_URL}/api/auto-update`;

    console.log("Getting service status...");

    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      console.log("✅ Service status:", JSON.stringify(data.status, null, 2));
      return data.status;
    } else {
      console.error("❌ Failed to get status:", data.error);
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting status:", error.message);
    return null;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const leagueCode = args[1];

  switch (command) {
    case "update":
      await triggerUpdate(leagueCode);
      break;

    case "start":
      await startService();
      break;

    case "stop":
      await stopService();
      break;

    case "status":
      await getStatus();
      break;

    default:
      console.log(`
Usage: node trigger-update.js <command> [leagueCode]

Commands:
  update [leagueCode]  - Trigger update for specific league or all leagues
  start               - Start the auto-update service
  stop                - Stop the auto-update service
  status              - Get current service status

Examples:
  node trigger-update.js update           # Update all leagues
  node trigger-update.js update PL        # Update Premier League only
  node trigger-update.js start            # Start auto-update service
  node trigger-update.js status           # Check service status

Environment variables:
  BASE_URL            - Your website URL (default: http://localhost:3000)
      `);
      break;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { triggerUpdate, startService, stopService, getStatus };
