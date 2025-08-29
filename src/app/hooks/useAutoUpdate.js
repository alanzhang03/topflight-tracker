import { useState, useEffect, useCallback } from "react";

export const useAutoUpdate = () => {
  const [status, setStatus] = useState({
    isRunning: false,
    lastUpdate: {},
    activeMatchDays: [],
    nextUpdate: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current status
  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auto-update");
      const data = await response.json();

      if (data.success) {
        setStatus(data.status);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Start auto-update service
  const startService = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auto-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchStatus(); // Refresh status
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  // Stop auto-update service
  const stopService = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auto-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchStatus(); // Refresh status
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchStatus]);

  // Force update for specific league or all leagues
  const forceUpdate = useCallback(
    async (leagueCode = null) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/auto-update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "force-update",
            leagueCode,
          }),
        });

        const data = await response.json();

        if (data.success) {
          await fetchStatus();
          return true;
        } else {
          setError(data.error);
          return false;
        }
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchStatus]
  );

  useEffect(() => {
    fetchStatus();

    if (status.isRunning) {
      const interval = setInterval(fetchStatus, 30000);
      return () => clearInterval(interval);
    }
  }, [fetchStatus, status.isRunning]);

  const formatLastUpdate = useCallback(
    (leagueCode) => {
      const lastUpdate = status.lastUpdate[leagueCode];
      if (!lastUpdate) return "Never";

      const date = new Date(lastUpdate);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;

      return date.toLocaleDateString();
    },
    [status.lastUpdate]
  );

  const getNextUpdateTime = useCallback(() => {
    if (!status.nextUpdate) return "Not scheduled";

    const nextUpdate = new Date(status.nextUpdate);
    const now = new Date();
    const diffMs = nextUpdate - now;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Due now";
    if (diffMins < 60) return `in ${diffMins}m`;

    const diffHours = Math.floor(diffMs / 3600000);
    return `in ${diffHours}h`;
  }, [status.nextUpdate]);

  return {
    status,
    loading,
    error,
    startService,
    stopService,
    forceUpdate,
    fetchStatus,
    formatLastUpdate,
    getNextUpdateTime,
  };
};
