import { GraphQLClient } from "graphql-request";

const SHOPIFY_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2025-01/graphql.json`;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN;

export const graphqlClient = new GraphQLClient(SHOPIFY_API_URL, {
    headers: {
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN!,
        "Content-Type": "application/json",
    },
});