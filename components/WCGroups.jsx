"use client";
import { useState, useEffect } from "react";
import styles from "./styles/WCGroups.module.scss";

function groupLabel(raw) {
  return raw?.replace("GROUP_", "Group ") ?? raw;
}

export default function WCGroups() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/world-cup/standings")
      .then((r) => r.json())
      .then((data) => {
        if (data.groups) setGroups(data.groups);
        else setError(data.error || "Failed to load standings");
      })
      .catch(() => setError("Failed to load standings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.status}>Loading group standings...</p>;
  if (error) return <p className={styles.statusError}>{error}</p>;
  if (!groups.length) return <p className={styles.status}>No group data available yet.</p>;

  return (
    <div className={styles.container}>
      <h1>2026 World Cup - Group Stage</h1>
      <div className={styles.grid}>
        {groups.map((group) => (
          <div key={group.group} className={styles.groupCard}>
            <h2 className={styles.groupTitle}>{groupLabel(group.group)}</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.teamCol}>Team</th>
                  <th title="Played">MP</th>
                  <th title="Won">W</th>
                  <th title="Drawn">D</th>
                  <th title="Lost">L</th>
                  <th title="Goal Difference">GD</th>
                  <th title="Points">Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.table.map((row, i) => (
                  <tr key={row.team.id} className={i < 2 ? styles.qualify : ""}>
                    <td className={styles.teamCell}>
                      <span className={styles.pos}>{row.position}</span>
                      <img
                        src={row.team.crest}
                        alt={row.team.name}
                        className={styles.crest}
                      />
                      <span className={styles.teamName}>{row.team.name}</span>
                    </td>
                    <td>{row.playedGames}</td>
                    <td>{row.won}</td>
                    <td>{row.draw}</td>
                    <td>{row.lost}</td>
                    <td>{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                    <td className={styles.pts}>{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
