import styles from './index.less';

interface ListProps {
    data: Array<Product> | null
}
interface Product {
    brand: string,
    productName: string,
}
export default function List(props: ListProps) {
    const { data } = props;
  return <div className={styles.list}>{
    data ? data.map((item: Product, index: number)=> {
        return <div className={styles.line} key={`${item.brand}${item.productName}${index}`}>{item.brand}&nbsp;{item.productName}</div>
    }) : null
  }</div>;
}