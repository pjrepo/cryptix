import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import Marquee from "./Marquee";

const PREFIX = "Hero";

const classes = {
  hero: `${PREFIX}-hero`,
  tagline: `${PREFIX}-tagline`,
};

const DIV1 = styled("div")(() => ({
  [`&.${classes.hero}`]: {
    background: "black",
  },
}));

const DIV2 = styled("div")(() => ({
  [`&.${classes.tagline}`]: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Hero = () => {
  return (
    <DIV1 className={classes.hero}>
      <Container
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 15,
          justifyContent: "space-around",
        }}
      >
        <DIV2 className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Cryptix
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </DIV2>
        <Marquee />
      </Container>
    </DIV1>
  );
};

export default Hero;
