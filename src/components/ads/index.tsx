import styles from './index.less';
import { useState, useEffect } from 'react';

function checkNeedMore() {
    return window.innerWidth <= 714;
}
function throttle(fun:()=>void, delay: number) {
    let last: number, deferTimer: any;
    return function (args: any) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
          last = now;
          fun.apply(that, _args);
        }
    }
}


export default function ADS() {
    const [btnText, setBtnText] = useState('More');
    const changeBtnText = () => {
        setBtnText(btnText === 'More' ? 'Less' : 'More');
    }
    const [needMore, setNeedMore] = useState(checkNeedMore());
    const throttleResize = throttle(()=> {
        setNeedMore(checkNeedMore())
    }, 1000)
    useEffect(()=> {
        window.addEventListener("resize", ()=> {
            throttleResize(null)
        })
    }, [])
    return <div className={styles.ads}>
        <div className={btnText === 'Less' ? styles.text : styles['text-inline']}>
        BLACK FRIDAY SALE | Up to 50% off FW22 with an extra 10% off using code ‘BLACK10’ at checkout. <span className={styles.link}>T&Cs apply</span>
        </div>
        {
            needMore ? <div className={styles.btn} onClick={changeBtnText}>{btnText}</div> : null
        }
    </div>
}