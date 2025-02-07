import { useShopifyProduct} from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';
import { Button } from "@heroui/button";
import ProductItem from "@/components/product/product-item";

export default function ProductList() {
    const { products, fetchProducts, hasNextPage, loading } = useShopifyProduct();

    return (
        <div>
            <div className={styles.productList}>
                {products.map((product) => (
                    <ProductItem product={product} key={product.title}/>
                ))}
            </div>
            {
                hasNextPage ? <div className="text-center">
                    <Button color="primary" isDisabled={loading} isLoading={loading} onPress={() => fetchProducts(hasNextPage)}>
                        Load More
                    </Button>
                </div> : <></>
            }
        </div>
    );
}