import search from "../../assets/search.png";
import searchGray from "../../assets/search-gray.png";
import styles from "./index.less";
import { useState } from "react";

interface props {
  placeHolder: string;
  onCancelClick: () => void;
  onSearch: (e:any)=> void
}

function debounce(func:(e:any)=>void, wait: number, immediate: boolean) {
  let timeout: any;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) { // timeout 不为null
      clearTimeout(timeout);
    }
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

export default function Search({ placeHolder, onCancelClick, onSearch }: props) {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState('');
  const changeActive = (active: boolean) => {
    return () => {
      setInputActive(value !== '' || active);
    };
  };
  const debounceSearch = debounce(onSearch, 500, false);
  return (
    <div className={styles.form}>
      <label className={styles.search}>
        <img src={inputActive ? search : searchGray} className={styles.img} />
        <input
          value={value}
          onFocus={changeActive(true)}
          onBlur={changeActive(false)}
          onInput={(e) => {
            const text = e?.target?.value.trim();
            setValue(text);
            debounceSearch(text);
          }}
          className={styles.input}
          type="search"
          placeholder={placeHolder}
        />
      </label>
      {inputActive ? (
        <div className={styles.btn} onClick={()=> {
          setValue('');
          setInputActive(false);
          onCancelClick();
        }}>
          Cancel
        </div>
      ) : null}
    </div>
  );
}
