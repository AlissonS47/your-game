import { useState, useEffect } from "react"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

export const useFetchGame = (gamePK, endPoint) => {
  const [data, setData] = useState(null);

  const fetchData = async (url) => {
    const res = await fetch(url);
    const resData = await res.json();
    setData(resData);
  };

  useEffect(() => {
    setData(null);
    if (!endPoint) fetchData(`${gamesURL}/${gamePK}?${apiKey}`);
    else fetchData(`${gamesURL}/${gamePK}/${endPoint}?${apiKey}`);
  }, [gamePK]);

  return { data };
};
