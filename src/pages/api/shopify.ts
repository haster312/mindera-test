import { NextApiRequest, NextApiResponse } from "next";
import { graphqlClient } from "@/lib/shopify-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const data = await graphqlClient.request(req.body.query, req.body.variables);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from Shopify" });
    }
}
