import styles from "./home.less";
import Search from "@/components/search";
import List from "@/components/list";
import { useState } from "react";

export default function HomePage() {
  const [list, setList] = useState(null);
  return (
    <div className={styles.home}>
      <Search placeHolder="Search CETTIRE" onSearch={(text)=> {
        fetch("/api/getProduct", {
          method: "get", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", setList(data.list));
          })
          .catch((error) => {
            console.error("Error:", setList(null));
          });
      }} onCancelClick={()=>{}}/>
      <List data={list} />
    </div>
  );
}
