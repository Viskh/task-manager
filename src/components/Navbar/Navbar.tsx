import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { DeleteFilled, HomeFilled } from "@ant-design/icons";
import { logOut } from "../../redux/reducers/auth/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createCategory,
  loadCategories,
  removeCategory,
} from "../../redux/reducers/category/ActionCreators";
import { Link } from "react-router-dom";

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

  const handleRemoveCategory = (id: string) => {
    dispatch(removeCategory(id));
  };

  return (
    <div className={styles.navbar}>
      <h1>Navbar</h1>
      <button onClick={handleExitAccount}>exit</button>
      <HomeFilled />
      <ul>
        <li>
          <Link to={"/"}>Все дела</Link>
        </li>
        {loading && <div>loading...</div>}
        {error && <div>{error}</div>}
        {categories.map((categoryItem) => {
          return (
            <li key={categoryItem._id}>
              <h3>
                <Link to={`/category/${categoryItem._id}`}>
                  {categoryItem.name}
                </Link>
              </h3>
              <span onClick={() => handleRemoveCategory(categoryItem._id)}>
                <DeleteFilled />
              </span>
            </li>
          );
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
