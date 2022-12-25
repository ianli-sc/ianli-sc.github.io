import styles from "./index.less";
import ellipse from "../../assets/ellipse.png";
import { useEffect, useState, useRef, useCallback } from "react";

interface ListProps {
  text: string;
}
interface Product {
  brand: string;
  productName: string;
}
type func = (e: any) => any;
const doSearch = (text: string, setList: func, setMore: func) => {
  fetch(`/api/getProduct?text=${text}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setList(data.list);
      setMore(data.more);
    })
    .catch((error) => {
      setList(null);
      setMore(false);
    });
};

export default function List({ text }: ListProps) {
  const [list, setList] = useState([]);
  const [more, setMore] = useState(false);
  const loadingEl = useRef(null);
  const loadMore = useCallback(() => {
    doSearch(
      text,
      (nextList) => {
        if (Array.isArray(nextList)) {
          setList(prev=>prev.concat(nextList));
        }
      },
      setMore
    );
  }, [list])
  useEffect(() => {
    if (text !== "") {
      doSearch(text, setList, setMore);
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.isVisible) {
            loadMore();
          }
        });
      }, options);
      setTimeout(() => {
        loadingEl.current && observer.observe(loadingEl.current);
      }, 100);
    } else {
      setList([]);
    }
  }, [text]);
  return (
    <div className={styles.list}>
      {list && Array.isArray(list) && list.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.title}>Products</div>
          {list.map((item: Product, index: number) => {
            return (
              <div
                className={styles.line}
                key={`${item.brand}${item.productName}${index}`}
              >
                {item.brand}&nbsp;{item.productName}
              </div>
            );
          })}
          {more ? (
            <div className={styles.loading} ref={loadingEl}>
              <img src={ellipse} className={styles.icon} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
