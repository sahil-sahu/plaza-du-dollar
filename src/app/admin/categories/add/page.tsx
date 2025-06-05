"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FileUpload from "@/app/admin/products/add/fileUpload";
import { imgObj } from "@/types";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { databases } from "@/app/appwrite";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState<imgObj[]>([]);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || imageUrls.length === 0) {
            alert("Please fill all fields");
            return;
        }

        try {
            await databases.createDocument(
                "67b8c653002efe0cdbb2",
                "category",
                ID.unique(),
                {
                    name: name,
                    image_url: imageUrls[0].url,
                    image_id: imageUrls[0].id
                }
            );
            router.push("/admin/categories");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error creating category");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Category Name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Category Image</label>
                    <FileUpload
                        id="categoryImage"
                        maxFiles={1}
                        imageUrls={imageUrls}
                        setUrls={setImageUrls}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Create Category
                </Button>
            </form>
        </div>
    );
};

export default AddCategory; 