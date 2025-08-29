import React from "react";
import { useAutoUpdate } from "../src/app/hooks/useAutoUpdate";
import styles from "./styles/AutoUpdateStatus.module.scss";

const AutoUpdateStatus = () => {
  const { status, formatLastUpdate, getNextUpdateTime } = useAutoUpdate();

  const leagueNames = {
    PL: "Premier League",
    PD: "La Liga",
    BL1: "Bundesliga",
    CL: "Champions League",
  };

  return (
    <div className={styles.autoUpdateStatus}>
      <div className={styles.header}>
        <h3>📊 Live Data Status</h3>
        <div className={styles.statusIndicator}>
          <span className={`${styles.dot} ${styles.running}`}></span>
          Auto-Updating
        </div>
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
        <h4>Last Updated</h4>
        <div className={styles.leagueGrid}>
          {Object.entries(leagueNames).map(([code, name]) => (
            <div key={code} className={styles.leagueItem}>
              <div className={styles.leagueHeader}>
                <span className={styles.leagueName}>{name}</span>
                <span className={styles.leagueCode}>{code}</span>
              </div>
              <div className={styles.lastUpdate}>{formatLastUpdate(code)}</div>
            </div>
          ))}
        </div>
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
        <p className={styles.note}>
          Data is automatically kept up-to-date. No manual intervention
          required.
        </p>
      </div>
    </div>
  );
};

export default AutoUpdateStatus;
