import React from "react";
import { styled } from "@mui/material/styles";

const Button = ({ children, selected, onClick }) => {
  const PREFIX = "Button";

  const classes = {
    button: `${PREFIX}-button`,
  };

  const SPAN = styled("span")(() => ({
    [`&.${classes.button}`]: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
    },
  }));
  return (
    <SPAN className={classes.button} onClick={onClick}>
      {children}
    </SPAN>
  );
};

export default Button;
