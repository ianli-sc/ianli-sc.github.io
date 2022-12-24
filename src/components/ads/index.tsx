import styles from './index.less';
import { useState } from 'react';

export default function ADS() {
    const [btnText, setBtnText] = useState('more');
    const changeBtnText = () => {
        setBtnText(btnText === 'more' ? 'less' : 'more');
    }
    return <div className={styles.ads}>
        <div className={styles.text}>
        BLACK FRIDAY SALE | Up to 50% off FW22 with an extra 10% off using code ‘BLACK10’ at checkout. T&Cs apply
        </div>
        <div className={styles.btn} onClick={changeBtnText}>{btnText}</div>
    </div>
}