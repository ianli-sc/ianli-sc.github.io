import styles from './index.less';
import { useState } from 'react';

export default function ADS() {
    const [btnText, setBtnText] = useState('More');
    const changeBtnText = () => {
        setBtnText(btnText === 'More' ? 'Less' : 'More');
    }
    return <div className={styles.ads}>
        <div className={btnText === 'Less' ? styles.text : styles['text-inline']}>
        BLACK FRIDAY SALE | Up to 50% off FW22 with an extra 10% off using code ‘BLACK10’ at checkout. <span className={styles.link}>T&Cs apply</span>
        </div>
        <div className={styles.btn} onClick={changeBtnText}>{btnText}</div>
    </div>
}