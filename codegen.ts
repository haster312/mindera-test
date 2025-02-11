import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
dotenv.config();

const SHOPIFY_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2025-01/graphql.json` as string;
const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN as string;
const config: CodegenConfig = {
    schema: [
        {
            [SHOPIFY_API_URL]: {
                headers: {
                    "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
                },
            },
        },
    ],
    documents: "src/graphql/**/*.graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
            config: {
                rawRequest: true,
                skipTypename: true,
            },
        },
    },
};

export default config;