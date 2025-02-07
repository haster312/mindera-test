"use client";
import ProductFilter from "@/components/product/product-filter";
import ProductList from "@/components/product/product-list";
import {ProductProvider} from "@/context/product/product.provider";

export default function Page() {
    return (
        <ProductProvider>
            <ProductFilter/>
            <ProductList/>
        </ProductProvider>
    )
}