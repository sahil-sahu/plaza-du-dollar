"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { databases } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUpload from "@/app/admin/products/add/fileUpload";
import { imgObj } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EditCategoryFormProps {
  initialData: {
    id: string;
    name: string;
    image_url?: string;
    showOnLanding: boolean;
    showExpanded: boolean;
  };
}

export default function EditCategoryForm({ initialData }: EditCategoryFormProps) {
  const [name, setName] = useState(initialData.name);
  const [imageUrls, setImageUrls] = useState<imgObj[]>([]);
  const [showOnLanding, setShowOnLanding] = useState(initialData.showOnLanding);
  const [showExpanded, setShowExpanded] = useState(initialData.showExpanded);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialData.image_url) {
      setImageUrls([{
        url: initialData.image_url,
        name: "Current Image",
        id: initialData.image_url.split("/files/")[1]?.split("/view")[0] || ""
      }]);
    }
  }, [initialData.image_url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await databases.updateDocument(
        "67b8c653002efe0cdbb2",
        "category",
        initialData.id,
        {
          name,
          image_url: imageUrls[0]?.url || "",
          showOnLanding,
          showExpanded
        }
      );
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error updating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label>Category Image</Label>
        <FileUpload
          id="category-image-upload"
          maxFiles={1}
          imageUrls={imageUrls}
          setUrls={setImageUrls}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="showOnLanding"
          checked={showOnLanding}
          onCheckedChange={(checked) => setShowOnLanding(!!checked)}
        />
        <Label htmlFor="showOnLanding">Show on landing page</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="showExpanded"
          checked={showExpanded}
          onCheckedChange={(checked) => setShowExpanded(!!checked)}
        />
        <Label htmlFor="showExpanded">Show expanded by default</Label>
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
