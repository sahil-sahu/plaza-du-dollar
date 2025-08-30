import { databases } from "@/app/appwrite";
import { Models } from "appwrite";
import { categoryObj } from "@/types";
import EditCategoryForm from "./EditCategoryForm";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  try {
    const id = (await params).id;
    const category = await databases.getDocument(
      "67b8c653002efe0cdbb2",
      "category",
      id
    ) as Models.Document & categoryObj;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
        <EditCategoryForm
          initialData={{
            id: category.$id,
            name: category.name,
            image_url: category.image_url,
            showOnLanding: category.showOnLanding || false,
            showExpanded: category.showExpanded || false,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    redirect("/admin/categories");
  }
}