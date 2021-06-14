import useSWR from 'swr';
import api from '../services/apiClient';

export function useFetch<Data = any, Error = any>(url: string, params = {}) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url, params);

    return response.data;
  })

  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  }
}
