import { useState } from "react";
import { useShopifyProduct } from "@/context/product/product.provider";
import styles from '@/app/product/product.module.scss';

export default function ProductFilter() {
    const { sortOrder, changeFilter } = useShopifyProduct();
    const [isSortVisible, setIsSortVisible] = useState(false);

    const sortOptions = [
        { key: "", label: "Sort by Price" },
        { key: "HIGH_TO_LOW", label: "Price Highest to Lowest" },
        { key: "LOW_TO_HIGH", label: "Price Lowest to Highest" },
    ];

    const showSortText = (): string => {
        switch (sortOrder) {
            case "HIGH_TO_LOW":
                return "Price Highest to Lowest";
            case "LOW_TO_HIGH":
                return "Price Lowest to Highest";
            default:
                return "";
        }
    }

    return (
        <div className={styles.productFilter}>
            <div className={styles.sort}>
                <span onClick={() => setIsSortVisible(!isSortVisible)}>Sort: { showSortText() }</span>
                {
                    isSortVisible ?
                        <div className={styles.sortOption}>
                            <select
                                className="border-1 p-2 border-black"
                                value={sortOrder}
                                onChange={(e) => {
                                    setIsSortVisible(!isSortVisible);
                                    changeFilter(e.target.value);
                                }}>
                                {sortOptions.map((option) => (
                                    <option key={option.label} value={option.key}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    : null
                }
            </div>
        </div>
    );
}