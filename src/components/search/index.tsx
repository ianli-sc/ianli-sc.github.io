import search from "../../assets/search.png";
import searchGray from "../../assets/search-gray.png";
import styles from "./index.less";
import { useState } from "react";

interface props {
  placeHolder: string;
  onCancelClick: () => void;
}

export default function Search({ placeHolder, onCancelClick }: props) {
  const [inputActive, setInputActive] = useState(false);
  const changeActive = (active: boolean) => {
    return () => {
      setInputActive(active);
    };
  };
  return (
    <div className={styles.form}>
      <label className={styles.search}>
        <img src={inputActive ? search : searchGray} className={styles.img} />
        <input
          onFocus={changeActive(true)}
          onBlur={changeActive(false)}
          className={styles.input}
          type="search"
          placeholder={placeHolder}
        />
      </label>
      {inputActive ? <div className={styles.btn} onClick={onCancelClick}>Cancel</div> : null}
    </div>
  );
}
