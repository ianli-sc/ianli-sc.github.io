import styles from "./detail.less";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

interface DetailProps {
  id: string;
}

export default function Detail({ id }: DetailProps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`/api/getDetail?id=${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setError(null);
        setData(data);
      })
      .catch((error) => {
        setError("Please try again later");
      });
  }, []);
  return <div className={styles.detail}>
    {
        !data && !error ? <Loading /> : null
    }
    {
        error ? <div className={styles.error}>{error}</div>: null
    }
    {
        data ? <div>123</div> : null
    }
  </div>;
}
