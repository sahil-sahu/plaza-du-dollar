import { databases } from "@/appwrite_server";
import { Offer } from "@/types";
import { Query } from "node-appwrite";
import { unstable_cache } from 'next/cache';

// Wrap the database fetch in a cached function
const fetchHeroOffers = unstable_cache(
    async () => {
        try {
            const { documents } = await databases.listDocuments(
                "67b8c653002efe0cdbb2",
                "offers",
                [
                    Query.equal("showOnHero", true)
                ]
            );
            
            // Filter offers with showOnHero=true
            // const heroOffers = (documents as Offer[]).filter(offer => offer.showOnHero);
            
            return documents as Offer[];
        } catch (error) {
            console.error("Error fetching hero offers:", error);
            return [];
        }
    },
    ['hero-offers'], // Cache key
    {
        revalidate: 300, // 5 minutes in seconds
        tags: ['hero-offers'] // Tag for cache invalidation
    }
);

export async function getHeroOffers() {
    return fetchHeroOffers();
} 