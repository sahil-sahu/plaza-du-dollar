import { databases } from "@/appwrite_server";

import PdtCard from "./components/pdtCard";
import { Product, categoryObj } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Query } from "node-appwrite";

// Make the page dynamic to handle searchParams
export const dynamic = 'force-dynamic';

const Products = async ({ searchParams : searchParams_ }: { searchParams: Promise<{ category?: string }> }) => {
    try {
        let queries = [];
        queries.push(Query.select(["*", "cover.*", "gallery.*", "category.*"]));
        const searchParams = await searchParams_;
        // Add category filter if provided
        if (searchParams.category) {
            queries.push(Query.equal('category', searchParams.category));
            
            // Fetch category details for the header
            const category = await databases.getDocument(
                "67b8c653002efe0cdbb2",
                "category",
                searchParams.category
            ) as categoryObj;
        }

        const {total, documents} = await databases.listDocuments(
            "67b8c653002efe0cdbb2",
            "products",
            queries.length > 0 ? queries : undefined
        );
        // console.log(documents)
        const docs = documents as Product[];

        return (
            <section className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Products
                            {searchParams.category && (
                                <span className="ml-2 text-gray-500">
                                    filtered by category
                                </span>
                            )}
                        </h1>
                        {searchParams.category && (
                            <Link href="/admin/products" className="text-blue-500 hover:underline">
                                Clear filter
                            </Link>
                        )}
                    </div>
                    <div className="my-4 flex justify-end">
                        <Link href={"/admin/products/add"}>
                            <Button variant={"secondary"}>
                                ADD NEW
                            </Button>
                        </Link>
                    </div>
                </div>
                {docs.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No products found</p>
                        {searchParams.category && (
                            <Link href="/admin/products" className="text-blue-500 hover:underline">
                                View all products
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {docs.map((pdt) => (
                            <PdtCard 
                                key={pdt.$id} 
                                id={pdt.$id} 
                                image={pdt.cover.url} 
                                name={pdt.name} 
                                category={pdt.category?.name ?? ""} 
                                cost={pdt.price} 
                            />
                        ))}
                    </div>
                )}
            </section>
        )
    } catch (error) {
        console.log(error)
        return (
            <section>
                <h1>
                    Error
                </h1>
            </section>
        )
    }
}

export default Products;