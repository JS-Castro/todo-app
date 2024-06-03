/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";

const UseFetch = (url: string) => {
  const { setItems, setLoading, setMessage } = useTodoContext();

  const fetchTodos = useCallback(async (url: string, signal: AbortSignal) => {
    setLoading(true);

    await fetch(url, { signal })
      .then((res) => res.json())
      .then((data: any) => {
        setItems(data);
        setMessage({
          text: "Data fetch successfully",
          shouldShow: false,
        });
      })
      .catch(() => {
        setMessage({
          text: "Something went wrong",
          shouldShow: true,
        });
      });

    setLoading(false);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchTodos(url, signal);

    return () => {
      abortController.abort();
    };
  }, [fetchTodos, url]);
};

export default UseFetch;
