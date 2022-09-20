import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router";
import { useCryptoContext } from "../context/CryptoContext";
import { SingleCoin } from "../utils/Constants";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { Typography, LinearProgress } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

const PREFIX = "Coin";

const classes = {
  container: `${PREFIX}-container`,
  sidebar: `${PREFIX}-sidebar`,
  marketData: `${PREFIX}-marketData`,
};

const DIV1 = styled("div")(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const DIV2 = styled("div")(({ theme }) => ({
  [`&.${classes.sidebar}`]: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
}));

const DIV3 = styled("div")(({ theme }) => ({
  [`&.${classes.marketData}`]: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const commasGenerator = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Coin = () => {
  const { id } = useParams();

  const { currency, symbol } = useCryptoContext();

  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <DIV1 className={classes.container}>
      <DIV2 className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 4,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 2,
            paddingBottom: 2,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <DIV3 className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 4,
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {commasGenerator(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 4,
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {commasGenerator(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: 4,
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {commasGenerator(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </DIV3>
      </DIV2>
      <CoinInfo coin={coin} />
    </DIV1>
  );
};

export default Coin;
