import { databases } from "@/appwrite_server";
import { categoryObj } from "@/types";
import { Query } from "node-appwrite";
import { unstable_cache } from 'next/cache';

// Wrap the database fetch in a cached function
const fetchLandingCategories = unstable_cache(
    async () => {
        try {
            const { documents } = await databases.listDocuments(
                "67b8c653002efe0cdbb2",
                "category",
                [
                    Query.equal("showOnLanding", true),
                    Query.select(["*", "products.*", "products.cover.*", "products.gallery.*", "products.category.*"]),
                ]
            );
            
            return documents as categoryObj[];
        } catch (error) {
            console.error("Error fetching landing categories:", error);
            return [];
        }
    },
    ['landing-categories'], // Cache key
    {
        revalidate: 300, // 5 minutes in seconds
        tags: ['landing-categories'] // Tag for cache invalidation
    }
);

export async function getLandingCategories() {
    return fetchLandingCategories();
} 