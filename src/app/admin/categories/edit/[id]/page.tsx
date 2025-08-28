"use client"
import { databases } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUpload from "@/app/admin/products/add/fileUpload";
import { imgObj, categoryObj } from "@/types";
import { useRouter } from "next/navigation";
import { Models } from "appwrite";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const EditCategory = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState<imgObj[]>([]);
    const [showOnLanding, setShowOnLanding] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await databases.getDocument(
                    "67b8c653002efe0cdbb2",
                    "category",
                    resolvedParams.id
                ) as Models.Document & categoryObj;
                
                setName(category.name);
                setShowOnLanding(category.showOnLanding || false);
                setShowExpanded(category.showExpanded || false);
                if (category.image_url) {
                    setImageUrls([{
                        url: category.image_url,
                        name: "Current Image",
                        id: category.image_url.split("/files/")[1]?.split("/view")[0] || ""
                    }]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert("Error fetching category");
                router.push("/admin/categories");
            }
        };
        fetchCategory();
    }, [resolvedParams.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || imageUrls.length === 0) {
            alert("Please fill all fields");
            return;
        }

        try {
            await databases.updateDocument(
                "67b8c653002efe0cdbb2",
                "category",
                resolvedParams.id,
                {
                    name: name,
                    image_url: imageUrls[0].url,
                    showOnLanding: showOnLanding,
                    showExpanded: showExpanded
                }
            );
            router.push("/admin/categories");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error updating category");
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
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
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showOnLanding"
                            checked={showOnLanding}
                            onCheckedChange={(checked) => setShowOnLanding(checked as boolean)}
                        />
                        <Label htmlFor="showOnLanding">Show on Landing Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showExpanded"
                            checked={showExpanded}
                            onCheckedChange={(checked) => setShowExpanded(checked as boolean)}
                        />
                        <Label htmlFor="showExpanded">Show Expanded</Label>
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Update Category
                </Button>
            </form>
        </div>
    );
};

export default EditCategory; 