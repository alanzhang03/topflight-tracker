import React from "react";
import { useAutoUpdate } from "../src/app/hooks/useAutoUpdate";
import styles from "./styles/AutoUpdateControl.module.scss";

const AutoUpdateControl = () => {
  const {
    status,
    loading,
    error,
    startService,
    stopService,
    forceUpdate,
    formatLastUpdate,
    getNextUpdateTime,
  } = useAutoUpdate();

  const leagueNames = {
    PL: "Premier League",
    PD: "La Liga",
    BL1: "Bundesliga",
    CL: "Champions League",
  };

  const handleForceUpdate = async (leagueCode = null) => {
    const success = await forceUpdate(leagueCode);
    if (success) {
      console.log("Force update completed successfully");
    }
  };

  return (
    <div className={styles.autoUpdateControl}>
      <div className={styles.header}>
        <h3>🔄 Auto-Update Control</h3>
        <div className={styles.statusIndicator}>
          <span
            className={`${styles.dot} ${
              status.isRunning ? styles.running : styles.stopped
            }`}
          ></span>
          {status.isRunning ? "Running" : "Stopped"}
        </div>
      </div>

      {error && <div className={styles.error}>❌ Error: {error}</div>}

      <div className={styles.controls}>
        <button
          onClick={startService}
          disabled={loading || status.isRunning}
          className={`${styles.btn} ${styles.startBtn}`}
        >
          {loading ? "Starting..." : "Start Auto-Updates"}
        </button>

        <button
          onClick={stopService}
          disabled={loading || !status.isRunning}
          className={`${styles.btn} ${styles.stopBtn}`}
        >
          {loading ? "Stopping..." : "Stop Auto-Updates"}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.nextUpdate}>
          <strong>Next Update:</strong> {getNextUpdateTime()}
        </div>

        {status.activeMatchDays.length > 0 && (
          <div className={styles.matchDays}>
            <strong>Active Match Days:</strong>{" "}
            {status.activeMatchDays.map((code) => leagueNames[code]).join(", ")}
          </div>
        )}
      </div>

      <div className={styles.leagueUpdates}>
        <h4>League Update Status</h4>
        <div className={styles.leagueGrid}>
          {Object.entries(leagueNames).map(([code, name]) => (
            <div key={code} className={styles.leagueItem}>
              <div className={styles.leagueHeader}>
                <span className={styles.leagueName}>{name}</span>
                <span className={styles.leagueCode}>{code}</span>
              </div>
              <div className={styles.lastUpdate}>
                Last: {formatLastUpdate(code)}
              </div>
              <button
                onClick={() => handleForceUpdate(code)}
                disabled={loading}
                className={styles.updateBtn}
              >
                Update Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bulkActions}>
        <button
          onClick={() => handleForceUpdate()}
          disabled={loading}
          className={`${styles.btn} ${styles.bulkBtn}`}
        >
          {loading ? "Updating..." : "Update All Leagues Now"}
        </button>
      </div>

      <div className={styles.scheduleInfo}>
        <h4>Update Schedule</h4>
        <ul>
          <li>
            <strong>Standings:</strong> Every 6 hours
          </li>
          <li>
            <strong>Results:</strong> Every 2 hours
          </li>
          <li>
            <strong>Fixtures:</strong> Every 24 hours
          </li>
          <li>
            <strong>Match Days:</strong> Every 30 minutes during games
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AutoUpdateControl;
