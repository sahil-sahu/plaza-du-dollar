import { databases } from "@/appwrite_server";
import { categoryObj, Product } from "@/types";
import { Query } from "node-appwrite";
import { unstable_cache } from 'next/cache';

// Wrap the database fetch in a cached function
const fetchExpandedCategories = unstable_cache(
    async () => {
        try {
            // First fetch categories with showExpanded=true
            const { documents: categories } = await databases.listDocuments(
                "67b8c653002efe0cdbb2",
                "category",
                [
                    Query.equal("showExpanded", true)
                ]
            );

            // For each category, fetch its associated products
            const expandedCategories = await Promise.all(
                (categories as categoryObj[]).map(async (category) => {
                    const { documents: products } = await databases.listDocuments(
                        "67b8c653002efe0cdbb2",
                        "products",
                        [
                            Query.equal("category", category.$id),
                            Query.limit(5) // Limit to 5 products per category
                        ]
                    );

                    return {
                        ...category,
                        products: products as Product[]
                    };
                })
            );
            
            return expandedCategories;
        } catch (error) {
            console.error("Error fetching expanded categories:", error);
            return [];
        }
    },
    ['expanded-categories'], // Cache key
    {
        revalidate: 300, // 5 minutes in seconds
        tags: ['expanded-categories'] // Tag for cache invalidation
    }
);

export async function getExpandedCategories() {
    return fetchExpandedCategories();
} 