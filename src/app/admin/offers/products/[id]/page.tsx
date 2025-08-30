"use client"
import { databases } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product, Offer } from "@/types";
import { useRouter, useParams } from "next/navigation";
import { Models } from "appwrite";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import defaultImage from "@/defaultImages/box.png";

const OfferProducts = () => {
    const router = useRouter();
    const params = useParams();
    const offerId = params.id as string;
    
    const [offer, setOffer] = useState<(Models.Document & Offer) | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch offer details
                const offerData = await databases.getDocument(
                    "67b8c653002efe0cdbb2",
                    "offers",
                    offerId
                ) as Models.DefaultDocument & Offer;
                setOffer(offerData);
                
                // Fetch all products
                const { documents } = await databases.listDocuments(
                    "67b8c653002efe0cdbb2",
                    "products"
                );
                setAllProducts(documents as (Product & Models.DefaultRow)[]);
                
                // Set initially selected products
                setSelectedProducts(offerData.products?.map(p => p.$id) || []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert("Error fetching data");
                router.push("/admin/offers");
            }
        };
        
        if (offerId) {
            fetchData();
        }
    }, [offerId, router]);

    const handleProductToggle = async (productId: string) => {
        try {
            const newSelectedProducts = selectedProducts.includes(productId)
                ? selectedProducts.filter(id => id !== productId)
                : [...selectedProducts, productId];
            
            setSelectedProducts(newSelectedProducts);
            
            // Update the offer with new product list
            await databases.updateDocument(
                "67b8c653002efe0cdbb2",
                "offers",
                offerId,
                {
                    products: newSelectedProducts.map(id => ({
                        $id: id,
                    }))
                }
            );
        } catch (error) {
            console.error('Error updating products:', error);
            alert('Error updating products');
        }
    };

    if (loading || !offer) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products in {offer.offerName}</h1>
                <Button onClick={() => router.push('/admin/offers')} variant="outline">
                    Back to Offers
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProducts.map((product) => (
                    <div key={product.$id} className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                        <Checkbox
                            id={`product-${product.$id}`}
                            checked={selectedProducts.includes(product.$id)}
                            onCheckedChange={() => handleProductToggle(product.$id)}
                        />
                        <div className="flex-1">
                            <Image
                                src={product.cover?.url || defaultImage}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="rounded-md mb-2"
                            />
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OfferProducts; 