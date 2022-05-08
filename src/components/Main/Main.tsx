import React from "react";
import AddTodo from "../Form/AddTodo.";
import Todos from "../Todos/Todos";
import styles from "./main.module.scss";

const Main = () => {
  return (
    <div className={styles.main__container}>
      <h1>Категория</h1>
      <div className={styles.todo__list}>
        <Todos />
        <AddTodo />
      </div>
    </div>
  );
};

export default Main;
