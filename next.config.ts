import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
                pathname: '**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
        NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
