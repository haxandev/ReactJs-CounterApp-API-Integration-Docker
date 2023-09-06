import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { createUseStyles } from "react-jss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  },
  counterContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  listTitle: {
    fontWeight: "bold",
    marginRight: "10px",
  },
  listItems: {
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f3f3f3",
  },
  listValue: {
    width: "200px",
  },
  error: {
    background: "#f49b9b",
    padding: "10px",
  },
});

function Home() {
  const repos = [
    "eslint/eslint",
    "oakwood/front-end-questions",
    "babel/babel",
    "webpack/webpack",
    "storybooks/storybook",
    "facebook/react",
    "reactjs/redux",
    "expressjs/express",
  ];

  const [repoCount, setRepoCount] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const classes = useStyles();

  const getRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repos[repoCount]}`
      );
      setData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  const handleClick = (action) => {
    if (action === "increment") {
      repoCount < repos.length - 1
        ? setRepoCount(repoCount + 1)
        : toast.info(`Count cannot be more then ${repos.length - 1}`, {
            theme: "dark",
          });
    } else if (action === "decrement") {
      repoCount > 0
        ? setRepoCount(repoCount - 1)
        : toast.info(`Count cannot be less then 0`, { theme: "dark" });
    }
  };

  useEffect(() => {
    getRepositories();
  }, [repoCount]);

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
        <div className={classes.count}>Counter: {repoCount}</div>
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
      {error ? (
        <p className={classes.error}>
          <b>Error:</b> {error}
        </p>
      ) : data ? (
        <div className={classes.counterContainer}>
          <ul className={classes.list}>
            <li className={classes.listItems}>
              <span className={classes.listTitle}>Full Name:</span>
              <span className={classes.listValue}>{data?.full_name}</span>
            </li>
            <li className={classes.listItems}>
              <span className={classes.listTitle}>Description:</span>
              <span className={classes.listValue}>{data?.description}</span>
            </li>
            <li className={classes.listItems}>
              <span className={classes.listTitle}>Amount of Stars:</span>
              <span className={classes.listValue}>
                {data?.stargazers_count}
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
