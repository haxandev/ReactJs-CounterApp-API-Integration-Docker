import React, { useState } from "react";
import Button from "./Button";
import GetRepoData from "./GetRepoData";
import { FaMinus, FaPlus } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { repos } from "../constants";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    flexDirection: "column",
  },
  count: {
    padding: "0px 30px",
    textAlign: "center",
    "@media (max-width: 768px)": {
      padding: "20px 0px",
      fontSize: "16px",
    },
  },
  content: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 768px)": {
      display: "initial",
    },
  },
  counterContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
});

function Counter() {
  const [repoIndex, setRepoIndex] = useState(0);
  const classes = useStyles();

  const handleClick = (action) => {
    if (action === "increment") {
      repoIndex < repos.length - 1
        ? setRepoIndex(repoIndex + 1)
        : toast.info(`Count cannot be more then ${repos.length - 1}`, {
            theme: "dark",
          });
    } else if (action === "decrement") {
      repoIndex > 0
        ? setRepoIndex(repoIndex - 1)
        : toast.info(`Count cannot be less then 0`, { theme: "dark" });
    }
  };

  return (
    <div className={classes.container}>
      <h4>Counter with GitHub API to fetch Repo Data</h4>
      <div className={classes.content}>
        <Button
          text="Decrement"
          icon={<FaMinus />}
          border="2px solid black"
          backgroundColor="transparent"
          hoverBackground="black"
          hoverColor="white"
          color="black"
          onClick={() => handleClick("decrement")}
        />
        <div className={classes.count}>Counter: {repoIndex}</div>
        <Button
          text="Increment"
          icon={<FaPlus />}
          backgroundColor="hotpink"
          hoverBackground="rebeccapurple"
          hoverColor="white"
          color="white"
          onClick={() => handleClick("increment")}
        />
      </div>
      <GetRepoData repoName={repos[repoIndex]} />
      <ToastContainer />
    </div>
  );
}

export default Counter;
