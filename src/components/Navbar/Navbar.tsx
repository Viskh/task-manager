import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { HomeFilled } from "@ant-design/icons";
import { logOut } from "../../redux/reducers/auth/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createCategory,
  loadCategories,
} from "../../redux/reducers/category/ActionCreators";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { loading, error, categories } = useAppSelector(
    (state) => state.categorySlice
  );

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const [category, setCategory] = useState<string>("");

  const handleExitAccount = () => {
    dispatch(logOut());
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    dispatch(createCategory(category));
    setCategory("");
  };


  return (
    <div className={styles.navbar}>
      <h1>Navbar</h1>
      <button onClick={handleExitAccount}>exit</button>
      <HomeFilled />
      <ul>
        {loading && <div>loading...</div>}
        {categories.map((categoryItem) => {
          if(loading) {
            
          }
          return <li key={categoryItem._id}>{categoryItem.name}</li>;
        })}
      </ul>
      <input
        value={category}
        onChange={(e) => handleChangeCategory(e)}
        type="text"
      />
      <button onClick={handleAddCategory}>+</button>
    </div>
  );
};

export default Navbar;
