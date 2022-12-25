import styles from "./home.less";
import Search from "@/components/search";
import { useState } from "react";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <Search placeHolder="Search CETTIRE" />
    </div>
  );
}
