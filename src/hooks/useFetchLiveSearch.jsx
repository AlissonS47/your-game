import { useState, useEffect } from "react"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

export const useFetchLiveSearch = (query, forceFetch) => {
  const [data, setData] = useState(null);
  const [firstRender, setFirstRender] = useState(true);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    setData(resData);
    console.log(resData);
  };

  useEffect(() => {
    setData(null);
    if (firstRender) {
      setFirstRender(false);
      return;
    };
    fetchData(`${gamesURL}?${apiKey}&search=${query}`);
  }, [forceFetch]);

  return { data };
};
