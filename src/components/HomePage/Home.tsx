import React from "react";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Main />
    </div>
  );
};

export default Home;
