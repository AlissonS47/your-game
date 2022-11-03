import { useState, useEffect } from "react"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

export const useFetchGames = (page, query, forceFetch) => {
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    if (page > 1) {
      resData.results = data.results.concat(resData.results);
    }
    setData(resData);
  };

  useEffect(() => {
    if (page === 1) setData(null);
    if (!query) fetchData(`${gamesURL}?${apiKey}&page=${page}`);
    else fetchData(`${gamesURL}?${apiKey}&search=${query}&page=${page}`);
  }, [page, forceFetch]);

  return { data };
};
