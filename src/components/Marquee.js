import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useCryptoContext } from "../context/CryptoContext";
import { TrendingCoins } from "../utils/Constants";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const PREFIX = "Marquee";

const classes = {
  marquee: `${PREFIX}-marquee`,
  marqueeItem: `${PREFIX}-marqueeItem`,
};

const DIV = styled("div")(() => ({
  [`&.${classes.marquee}`]: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

const Marquee = () => {
  const { currency, symbol } = useCryptoContext();

  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const commasGenerator = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`/coins/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol} &nbsp;
          <span
            style={{
              color: profit > 0 ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {commasGenerator(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <DIV className={classes.marquee}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayDuration={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </DIV>
  );
};

export default Marquee;
