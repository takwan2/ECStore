import { useEffect, useState, useCallback } from "react";

type FetchFunction<T> = () => Promise<T>;

export function useFetch<T>(fetchFn: FetchFunction<T>, initialValue: T) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchData, setFetchData] = useState<T>(initialValue);

  const fetchDataFromApi = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await fetchFn();
      setFetchData(data);
      setError(null);
    } catch (error) {
      // setError({ message: error.message || 'サーバーとの通信に失敗しました。' });
      setError(error instanceof Error ? error : new Error('サーバーとの通信に失敗しました。'));
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
