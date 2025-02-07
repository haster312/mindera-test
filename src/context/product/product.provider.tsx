"use client";
import {createContext, ReactNode, useContext, useEffect, useState, useCallback, useRef} from "react";
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
    storeDomain: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com`,
    apiVersion: '2025-04',
    publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN!,
    retries: 2,
});

type MoneyV2 = {
    amount: number,
    currencyCode: string,
}

interface Product {
    id: string;
    title: string;
    description: string;
    images: { edges: { node: { src: string; altText: string } }[] };
    variants: { edges: { node: { price: MoneyV2 } }[] };
}

export interface ConvertProduct {
    id: string;
    title: string;
    description?: string;
    price: number;
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

type QueryVariable = {
    first: number;
    after: string | null;
    sortKey?: string | null;
    reverse?: boolean;
}
export const ProductProvider = ({children}: { children: ReactNode }) => {
    const [products, setProducts] = useState<ConvertProduct[]>([]);
    const [sortOrder, setSortOrder] = useState<SortOrder>("");
    const [loading, setLoading] = useState<boolean>(false);
    const cursorRef = useRef<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    const changeFilter = async (orderType: string) => {
        try {
            // Always reset cursor if filter changed
            cursorRef.current = null;
            setSortOrder(orderType as SortOrder);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    const fetchProducts = useCallback(async (nextPage = false) => {
        setLoading(true);
        try {
            const productQuery = `
              query ProductQuery($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
                products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
                  edges {
                    node {
                      id
                      title
                      description
                      images(first: 1) {
                        edges {
                          node {
                            src
                            altText
                          }
                        }
                      }
                      variants(first: 1) {
                        edges {
                          node {
                            price {
                               amount
                               currencyCode 
                            }
                          }
                        }
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            `;

            const variables: QueryVariable = {
                first: 10,
                after: nextPage ? cursorRef.current : null,
                sortKey: sortOrder ? "PRICE" : undefined,
                reverse: sortOrder === "HIGH_TO_LOW",
            };

            const { data, errors } = await client.request(productQuery, { variables });
            if (errors) return;

            const fetchedProducts: ConvertProduct[] = data.products.edges.map((edge: { node: Product }) => {
                const node = edge.node;
                return {
                    id: node.id,
                    title: node.title,
                    description: node.description,
                    price: node.variants.edges[0]?.node?.price.amount || 0,
                    currency: node.variants.edges[0]?.node?.price.currencyCode || "USD",
                    imageUrl: node.images.edges[0]?.node?.src || "",
                    altText: node.images.edges[0]?.node?.altText || "",
                };
            });

            setProducts(p => nextPage ? [...p, ...fetchedProducts] : fetchedProducts);
            cursorRef.current = data.products.pageInfo.endCursor;

            setHasNextPage(data.products.pageInfo.hasNextPage);
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