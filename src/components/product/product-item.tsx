import { ConvertProduct } from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';
import Image from "next/image";
import ProductPrice from "@/components/product/product-price";

export default function ProductItem({ product }: { product: ConvertProduct}) {
    return (
        <div key={product.id} className={styles.productItem}>
            <Image
                src={product.imageUrl || "/images/product-placeholder.jpg"}
                width="250"
                height="250"
                alt={product.altText ?? "Product image"}
                className={styles.productImage}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <ProductPrice product={product} />
        </div>
    )
}