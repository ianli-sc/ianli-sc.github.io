import Loading from "@/components/loading";
import SearchBar from "@/components/searchBar";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useSearchParams } from "umi";

import styles from "./detail.less";
import "swiper/less";
import "./swiper.less";

interface DetailProps {
  id: string;
}

export default function Detail() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetch(`/api/getDetail/${searchParams.get('id')}`, {
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
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };
  return (
    <div className={styles.detail}>
      {!data && !error ? <Loading /> : null}
      {error ? <div className={styles.error}>{error}</div> : null}
      {data ? (
        <div className={styles.item}>
          <SearchBar />
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={pagination}
            lazy={true}
            modules={[Navigation, Pagination]}
          >
            {data.Imgs
              ? data.Imgs.map((img, index) => {
                  return (
                    <SwiperSlide key={`slider-${index}`}>
                      <img src={img} className={styles.img} />
                    </SwiperSlide>
                  );
                })
              : null}
          </Swiper>
          <div className={styles.season}>{data?.Season}</div>
          <div className={styles.brand}>{data?.Brand}</div>
          <div className={styles.name}>{data?.Name}</div>
          <div className={styles.price}>{data?.Price}</div>
          <input type="button" className={styles.btn} value="Add to bag" />
        </div>
      ) : null}
    </div>
  );
}
