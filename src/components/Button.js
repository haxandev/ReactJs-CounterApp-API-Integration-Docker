import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  button: (props) => ({
    borderRadius: "25px",
    padding: "15px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "background-color 0.2s ease-in-out",
    backgroundColor: props.backgroundColor,
    border: props.border,
    color: props.color || "initial",

    "&:hover": {
      backgroundColor:
        props.hoverBackground || theme.hoverBackground || "initial",
      color: props.hoverColor || theme.hoverColor || "initial",
    },
  }),
  icon: {
    marginRight: "5px",
  },
}));

const Button = ({
  text,
  icon,
  backgroundColor,
  border,
  color,
  hoverColor,
  hoverBackground,
  onClick
}) => {
  const classes = useStyles({
    backgroundColor,
    border,
    color,
    hoverBackground,
    hoverColor,
  });

  return (
    <div className={classes.button} onClick={onClick}>
      <div className={classes.icon}>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default Button;
