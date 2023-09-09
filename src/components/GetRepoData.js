import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { API_BASE_URL } from "../constants";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "32%",
  },
  counterContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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

function GetRepoData({ repoName }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/repos/${repoName}`);
        setData(response.data);
        setError(null); // Clear any previous errors
        setLoading(false);
      } catch (error) {
        // console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [repoName]);

  return (
    <div className={classes.container}>
      {loading ? (
        // Show a loader while loading
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="hotpink"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : error ? (
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
        ""
      )}
    </div>
  );
}

export default GetRepoData;
