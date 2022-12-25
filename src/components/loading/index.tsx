import styles from './index.less';
import React from 'react';
import ellipse from "../../assets/ellipse.png";

export default React.forwardRef((props, ref) => {
  return (
    <div className={styles.loading} ref={ref}>
      <img src={ellipse} className={styles.icon} />
    </div>
  );
});