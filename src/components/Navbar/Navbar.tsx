import React from "react";
import styles from "./navbar.module.scss";
import { HomeFilled } from "@ant-design/icons";
import { logOut } from "../../redux/reducers/auth/ActionCreators";
import { useAppDispatch } from "../../hooks/reduxHooks";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const handleExitAccount = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.navbar}>
      <h1>Navbar</h1>
      <button onClick={handleExitAccount}>exit</button>
      <ul>
        <li>
          <HomeFilled />
          Категория1
        </li>
        <li>Категория2</li>
        <li>Категория3</li>
        <li>Категория4</li>
        <li>Категория5</li>
      </ul>
    </div>
  );
};

export default Navbar;
