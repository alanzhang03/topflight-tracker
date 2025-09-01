import { NextResponse } from "next/server";
import autoUpdateService from "../../../../utils/api/autoUpdateService.js";

// Ensure service starts when API is first accessed
let serviceInitialized = false;
if (!serviceInitialized) {
  serviceInitialized = true;
  console.log(
    "🌐 API route accessed - ensuring auto-update service is running"
  );
  // Trigger service initialization if not already running
  if (!autoUpdateService.isRunning) {
    autoUpdateService.attemptStart();
  }
}

export async function GET(request) {
  try {
    const status = autoUpdateService.getStatus();
    return NextResponse.json({
      success: true,
      status,
      message: "Auto-update service status retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting auto-update status:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { action, leagueCode } = await request.json();

    switch (action) {
      case "start":
        await autoUpdateService.start();
        return NextResponse.json({
          success: true,
          message: "Auto-update service started successfully",
        });

      case "stop":
        autoUpdateService.stop();
        return NextResponse.json({
          success: true,
          message: "Auto-update service stopped successfully",
        });

      case "force-update":
        await autoUpdateService.forceUpdate(leagueCode);
        return NextResponse.json({
          success: true,
          message: `Force update completed ${
            leagueCode ? `for ${leagueCode}` : "for all leagues"
          }`,
        });

      case "status":
        const status = autoUpdateService.getStatus();
        return NextResponse.json({
          success: true,
          status,
          message: "Status retrieved successfully",
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action. Use: start, stop, force-update, or status",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in auto-update API:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
