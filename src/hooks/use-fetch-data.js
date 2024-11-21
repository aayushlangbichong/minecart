import React from "react";
import { api, authApi } from "../lib/api";
import { toast } from "react-toastify";

const useFetchData = (url, config) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetcherApi = config?.useAuthApi ? authApi : api;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetcherApi.get(url);

      if (res?.data) {
        setData(res.data);
        config?.onSuccess?.(res?.data);
      }
    } catch (error) {
      setError(error);
      config?.onError?.(error);
      if (!config?.disableErrorToast) {
        toast.error(error?.response?.data?.message || "Unable to get data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => fetchData();

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useFetchData;
