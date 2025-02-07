import { ConvertProduct } from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';

export default function ProductPrice({ product }: { product: ConvertProduct}) {
    const formatPrice = (price: number) => {

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.currency,
            minimumFractionDigits: 0,  // No trailing zeros
            maximumFractionDigits: 2,  // Show up to 2 decimal places if needed
        });

        return formatter.format(price);
    }
    return (
        <div className={styles.productPrice}>
            {
                product.originalPrice ?
                    <div>
                        <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                        <span>{formatPrice(product.price)}</span>
                    </div>
                    : <div><span>{formatPrice(product.price)}</span></div>
            }
        </div>
    );
}