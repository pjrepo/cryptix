import React, { useState, useEffect, useContext, createContext } from "react";
import { CoinList } from "../utils/Constants";
import axios from "axios";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => useContext(CryptoContext);
