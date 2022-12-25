import styles from "./home.less";
import Search from "@/components/search";
import List from "@/components/list";
import { useState } from "react";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className={styles.home}>
      <Search
        placeHolder="Search CETTIRE"
        onSearch={(text) => setSearchText(text)}
        onCancelClick={() => setSearchText('')}
      />
      <List text={searchText} />
    </div>
  );
}
