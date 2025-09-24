import { useState, useEffect } from "react";
import { Summary } from "../types";
import { api } from "../api";

export function useSummary() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const summary = await api.getSummary();
      setData(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { data, loading, error, refetch: fetchSummary };
}
