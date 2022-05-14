import React, { FC, useState } from "react";
import AddTodo from "../Form/AddTodo.";
import Todos from "../Todos/Todos";
import styles from "./main.module.scss";

const Main: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className={styles.main__container}>
      <h1>Категория</h1>
      <div className={styles.todo__list}>
        <Todos />
        <button onClick={() => setOpenModal(!openModal)}>+</button>
      </div>
      {openModal && <AddTodo setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Main;
