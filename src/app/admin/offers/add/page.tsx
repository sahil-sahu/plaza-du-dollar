"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FileUpload from "@/app/admin/products/add/fileUpload";
import { imgObj } from "@/types";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { databases } from "@/app/appwrite";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AddOffer = () => {
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState<imgObj[]>([]);
    const [showOnLanding, setShowOnLanding] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || imageUrls.length === 0) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await databases.createDocument(
                "67b8c653002efe0cdbb2",
                "offers",
                ID.unique(),
                {
                    offerName: name,
                    image: imageUrls[0],
                    showOnLanding: showOnLanding,
                    products: []
                }
            );
            router.push("/admin/offers");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error creating offer");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Offer</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Offer Name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter offer name"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Offer Image</label>
                    <FileUpload
                        id="offerImage"
                        maxFiles={1}
                        imageUrls={imageUrls}
                        setUrls={setImageUrls}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="showOnLanding"
                        checked={showOnLanding}
                        onCheckedChange={(checked) => setShowOnLanding(checked as boolean)}
                    />
                    <Label htmlFor="showOnLanding">Show on Landing Page</Label>
                </div>
                <Button type="submit" className="w-full">
                    Create Offer
                </Button>
            </form>
        </div>
    );
};

export default AddOffer; 