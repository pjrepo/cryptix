import React from "react";
import Hero from "../components/Hero";
import CoinsList from "../components/CoinsList";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <CoinsList />
    </React.Fragment>
  );
};

export default Home;
