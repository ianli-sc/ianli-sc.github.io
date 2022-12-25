import styles from "./index.less";
import { useEffect, useState } from "react";

interface ListProps {
  text: string;
}
interface Product {
  brand: string;
  productName: string;
}
const doSearch = (text: string, callback: (e: any) => any) => {
  fetch(`/api/getProduct?text=${text}`, {
    method: "get", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data.list);
    })
    .catch((error) => {
      callback(null);
    });
};
export default function List({ text }: ListProps) {
  const [list, setList] = useState(null);
  useEffect(() => {
    if(text !== '') {
        doSearch(text, setList);
    } else {
        setList(null);
    }
  }, [text]);
  return (
    <div className={styles.list}>
      {list
        ? list.map((item: Product, index: number) => {
            return (
              <div
                className={styles.line}
                key={`${item.brand}${item.productName}${index}`}
              >
                {item.brand}&nbsp;{item.productName}
              </div>
            );
          })
        : null}
    </div>
  );
}
