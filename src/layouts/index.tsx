import { Outlet } from 'umi';
import ADS from '@/components/ads'
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.home}>
      <ADS />
      <Outlet />
    </div>
  );
}
