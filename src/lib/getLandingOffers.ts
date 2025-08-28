import { databases } from "@/appwrite_server";
import { Offer } from "@/types";
import { Query } from "node-appwrite";
import { unstable_cache } from 'next/cache';

// Wrap the database fetch in a cached function
const fetchLandingOffers = unstable_cache(
    async () => {
        try {
            const { documents } = await databases.listDocuments(
                "67b8c653002efe0cdbb2",
                "offers",
                [
                    Query.equal("showOnLanding", true),
                    Query.select(["*", "image.*"]),
                ]
            );
            
            return documents as Offer[];
        } catch (error) {
            console.error("Error fetching landing offers:", error);
            return [];
        }
    },
    ['landing-offers'], // Cache key
    {
        revalidate: 300, // 5 minutes in seconds
        tags: ['landing-offers'] // Tag for cache invalidation
    }
);

export async function getLandingOffers() {
    return fetchLandingOffers();
} 