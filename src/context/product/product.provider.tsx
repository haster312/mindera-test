"use client";
import { createContext, ReactNode, useContext, useEffect, useState, useCallback, useRef } from "react";
import { ProductQueryDocument, ProductQueryQueryVariables, ProductSortKeys } from "@/generated/graphql";

type MoneyV2 = {
    amount: number,
    currencyCode: string,
}

interface Product {
    id: string;
    title: string;
    description: string;
    availableForSale: boolean;
    images: { edges: { node: { src: string; altText: string } }[] };
    variants: { edges: { node: { price: MoneyV2, compareAtPrice: MoneyV2 } }[] };
}

export interface ConvertProduct {
    id: string;
    title: string;
    description?: string;
    price: number;
    originalPrice?: number;
    currency: string;
    imageUrl?: string;
    altText?: string;
    tag?: string;
}

type SortOrder = "LOW_TO_HIGH" | "HIGH_TO_LOW" | "";

interface ShopifyProductContextType {
    products: ConvertProduct[];
    fetchProducts: (nextPage: boolean) => void;
    loading: boolean;
    sortOrder: SortOrder;
    changeFilter: (orderType: string) => void;
    hasNextPage: boolean;
}

const ShopifyProductContext = createContext<ShopifyProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [products, setProducts] = useState<ConvertProduct[]>([]);
    const [sortOrder, setSortOrder] = useState<SortOrder>("");
    const [loading, setLoading] = useState<boolean>(false);
    const cursorRef = useRef<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const changeFilter = async (orderType: string) => {
        // Always reset cursor if filter changed
        cursorRef.current = null;
        setSortOrder(orderType as SortOrder);
    }

    const fetchProducts = useCallback(async (nextPage = false) => {
        setLoading(true);
        try {
            const variables: ProductQueryQueryVariables = {
                first: 10,
                after: nextPage ? cursorRef.current : null,
                sortKey: sortOrder ? ProductSortKeys.Price : undefined,
                reverse: sortOrder === "HIGH_TO_LOW",
            };

            const response = await fetch("/api/shopify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: ProductQueryDocument, variables }),
            });

            const { products } = await response.json();

            const fetchedProducts: ConvertProduct[] = products.edges
                .filter((edge: { node: Product }) => edge.node.availableForSale)
                .map((edge: { node: Product }) => {
                    const node = edge.node;
                    return {
                        id: node.id,
                        title: node.title,
                        description: node.description,
                        price: node.variants.edges[0]?.node?.price.amount || 0,
                        originalPrice: node.variants.edges[0]?.node?.compareAtPrice?.amount || null,
                        currency: node.variants.edges[0]?.node?.price.currencyCode || "USD",
                        imageUrl: node.images.edges[0]?.node?.src || "",
                        altText: node.images.edges[0]?.node?.altText || "",
                    };
            });

            setProducts(p => nextPage ? [...p, ...fetchedProducts] : fetchedProducts);
            cursorRef.current = products.pageInfo.endCursor;

            setHasNextPage(products.pageInfo.hasNextPage);
        } catch (error) {
            console.error("Error fetching Shopify products:", error);
        } finally {
            setLoading(false);
        }
    }, [sortOrder]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ShopifyProductContext.Provider value={{
            products, fetchProducts, loading, sortOrder, changeFilter, hasNextPage
        }}>
            {children}
        </ShopifyProductContext.Provider>
    );
};

export const useShopifyProduct = () => {
    const context = useContext(ShopifyProductContext);
    if (!context) {
        throw new Error("useShopifyProduct must be used within a ProductProvider");
    }

    return context;
};