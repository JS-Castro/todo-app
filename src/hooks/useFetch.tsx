/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";

const UseFetch = (url: string) => {
  const { setItems, setLoading, setMessage } = useTodoContext();

  const fetchTodos = useCallback(async (url: string) => {
    setLoading(true);

    await fetch(url)
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
    fetchTodos(url);
  }, [fetchTodos, url]);
};

export default UseFetch;
