import { Link } from 'umi';
import search from '@/assets/search.png';
import bag from '@/assets/shopping-bag.png';
import styles from './index.less';

export default function SearchBar() {
    return <div className={styles.bar}>
        <Link to='/'>
            <img src={search} className={styles.search} />
        </Link>
        <img src={bag} className={styles.bag} />
    </div>
}