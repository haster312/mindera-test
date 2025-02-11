import { ConvertProduct } from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';
import Image from "next/image";
import ProductPrice from "@/components/product/product-price";

export default function ProductItem({ product }: { product: ConvertProduct}) {
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
            <h3 className={styles.productTitle}>{product.title}</h3>
            <ProductPrice product={product} />
        </div>
    )
}