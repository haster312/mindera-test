import { ConvertProduct } from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';
import Image from "next/image";

export default function ProductItem({ product }: { product: ConvertProduct}) {
    const formatPrice = (price: number, currency: string) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,  // No trailing zeros
            maximumFractionDigits: 2,  // Show up to 2 decimal places if needed
        });

        return formatter.format(price);
    }

    return (
        <div key={product.id} className={styles.productItem}>
            {product.imageUrl ?
                <Image
                    src={product.imageUrl}
                    width="250"
                    height="250"
                    alt={product.altText ?? ""}
                    className={styles.productImage}
                /> : "abc"}
            <h3>{product.title}</h3>
            <span>{formatPrice(product.price, product.currency)}</span>
        </div>
    )
}