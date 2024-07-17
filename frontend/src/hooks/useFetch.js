import { useEffect, useState, useCallback } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(initialValue);

  const fetchDataFromApi = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await fetchFn();
      setFetchData(data);
      setError(null);
    } catch (error) {
      setError({ message: error.message || 'サーバーとの通信に失敗しました。' });
    } finally {
      setIsFetching(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    console.log("Fetching data...");
    fetchDataFromApi();
  }, [fetchDataFromApi]);

  return {
    isFetching,
    fetchData,
    error,
    refetch: fetchDataFromApi,
  };
}