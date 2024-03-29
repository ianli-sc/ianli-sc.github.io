import styles from "./index.less";
import { Link } from "umi";
import Loading from '@/components/loading';
import { useEffect, useState, useRef, useCallback } from "react";

interface ListProps {
  text: string;
}
interface Product {
  brand: string;
  productName: string;
  id: string;
}
type func = (e: any) => any;
const doSearch = (text: string, setList: func, setMore: func, callback?: func) => {
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
      callback && callback(1);
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
      doSearch(text, setList, setMore, ()=>{
        setTimeout(()=> {
          loadingEl.current && observer.observe(loadingEl.current)
        }, 100)
      });
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
              <Link to={`/Detail?id=${item.id}`}
                className={styles.line}
                key={`${item.brand}${item.productName}${index}`}
              >
                {item.brand}&nbsp;{item.productName}
              </Link>
            );
          })}
          {more ? (
            <Loading ref={loadingEl} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
