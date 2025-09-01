import { fetchStandings } from "./fetchStandings.js";
import { fetchResults } from "./fetchResults.js";
import { fetchFixtures } from "./fetchFixtures.js";
import getRedisClient from "./redisClient.js";

const LEAGUE_CODES = [
  "PL", // Premier League
  "PD", // La Liga
  "BL1", // Bundesliga
  "CL", // Champions League
];

const UPDATE_INTERVALS = {
  STANDARDS: 6 * 60 * 60 * 1000,
  RESULTS: 2 * 60 * 60 * 1000,
  FIXTURES: 24 * 60 * 60 * 1000,
  MATCH_DAY: 30 * 60 * 1000,
};

class AutoUpdateService {
  constructor() {
    this.isRunning = false;
    this.updateInterval = null;
    this.lastUpdate = {};
    this.matchDaySchedule = new Map();
    this.initializationAttempts = 0;
    this.maxInitializationAttempts = 5;

    // Start immediately and also set up multiple fallback mechanisms
    this.initializeService();
  }

  async initializeService() {
    console.log("🚀 Initializing auto-update service...");

    // Try to start immediately
    await this.attemptStart();

    // Set up multiple fallback timers to ensure service starts
    setTimeout(() => this.attemptStart(), 2000);
    setTimeout(() => this.attemptStart(), 5000);
    setTimeout(() => this.attemptStart(), 10000);
    setTimeout(() => this.attemptStart(), 30000);

    // Set up a periodic check to ensure service stays running
    setInterval(() => {
      if (!this.isRunning) {
        console.log("🔄 Service not running, attempting restart...");
        this.attemptStart();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  async attemptStart() {
    if (this.isRunning) {
      return;
    }

    if (this.initializationAttempts >= this.maxInitializationAttempts) {
      console.log("⚠️ Max initialization attempts reached, will retry later");
      this.initializationAttempts = 0; // Reset for next cycle
      return;
    }

    this.initializationAttempts++;

    try {
      console.log(
        `🔄 Attempting to start auto-update service (attempt ${this.initializationAttempts})...`
      );
      await this.start();
      console.log("✅ Auto-update service started successfully");
    } catch (error) {
      console.error(
        `❌ Failed to start auto-update service (attempt ${this.initializationAttempts}):`,
        error.message
      );
    }
  }

  async start() {
    if (this.isRunning) {
      console.log("Auto-update service is already running");
      return;
    }

    console.log("Starting auto-update service...");
    this.isRunning = true;

    await this.performUpdate();

    this.updateInterval = setInterval(async () => {
      await this.performUpdate();
    }, UPDATE_INTERVALS.STANDARDS);

    this.setupMatchDayUpdates();
  }

  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isRunning = false;
    console.log("Auto-update service stopped");
  }

  async performUpdate() {
    const updatePromises = LEAGUE_CODES.map(async (leagueCode) => {
      try {
        console.log(`Updating data for ${leagueCode}...`);

        await fetchStandings(leagueCode, UPDATE_INTERVALS.STANDARDS);

        await fetchResults(leagueCode, UPDATE_INTERVALS.RESULTS);

        await fetchFixtures(leagueCode, UPDATE_INTERVALS.FIXTURES);

        this.lastUpdate[leagueCode] = new Date();
        console.log(`✅ Updated ${leagueCode} successfully`);
      } catch (error) {
        console.error(`❌ Error updating ${leagueCode}:`, error);
      }
    });

    await Promise.allSettled(updatePromises);
    console.log("Auto-update cycle completed");
  }

  async setupMatchDayUpdates() {
    setInterval(async () => {
      for (const leagueCode of LEAGUE_CODES) {
        try {
          const { fixtures } = await fetchFixtures(leagueCode);
          const hasUpcomingMatches = this.checkForUpcomingMatches(fixtures);

          if (hasUpcomingMatches && !this.matchDaySchedule.has(leagueCode)) {
            console.log(
              `Match day detected for ${leagueCode}, setting up frequent updates`
            );
            this.scheduleMatchDayUpdates(leagueCode);
          }
        } catch (error) {
          console.error(`Error checking match day for ${leagueCode}:`, error);
        }
      }
    }, 60 * 60 * 1000);
  }

  checkForUpcomingMatches(fixtures) {
    if (!fixtures || fixtures.length === 0) return false;

    const now = new Date();
    const nextFewHours = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    return fixtures.some((fixture) => {
      const matchDate = new Date(fixture.utcDate);
      return matchDate > now && matchDate <= nextFewHours;
    });
  }

  scheduleMatchDayUpdates(leagueCode) {
    const matchDayInterval = setInterval(async () => {
      try {
        console.log(`Match day update for ${leagueCode}...`);
        await fetchResults(leagueCode, UPDATE_INTERVALS.MATCH_DAY);
        await fetchStandings(leagueCode, UPDATE_INTERVALS.MATCH_DAY);
      } catch (error) {
        console.error(`Error in match day update for ${leagueCode}:`, error);
      }
    }, UPDATE_INTERVALS.MATCH_DAY);

    this.matchDaySchedule.set(leagueCode, matchDayInterval);
  }

  clearMatchDayUpdates(leagueCode) {
    const interval = this.matchDaySchedule.get(leagueCode);
    if (interval) {
      clearInterval(interval);
      this.matchDaySchedule.delete(leagueCode);
      console.log(`Cleared match day updates for ${leagueCode}`);
    }
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastUpdate: this.lastUpdate,
      activeMatchDays: Array.from(this.matchDaySchedule.keys()),
      nextUpdate: this.updateInterval
        ? new Date(Date.now() + UPDATE_INTERVALS.STANDARDS)
        : null,
    };
  }

  async forceUpdate(leagueCode = null) {
    if (leagueCode) {
      console.log(`Forcing update for ${leagueCode}...`);
      try {
        await fetchStandings(leagueCode, 0);
        await fetchResults(leagueCode, 0);
        await fetchFixtures(leagueCode, 0);
        this.lastUpdate[leagueCode] = new Date();
        console.log(`✅ Force update completed for ${leagueCode}`);
      } catch (error) {
        console.error(`❌ Force update failed for ${leagueCode}:`, error);
        throw error;
      }
    } else {
      console.log("Forcing update for all leagues...");
      await this.performUpdate();
    }
  }
}

const autoUpdateService = new AutoUpdateService();

export default autoUpdateService;
