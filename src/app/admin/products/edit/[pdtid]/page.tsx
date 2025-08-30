import { Product } from "@/types";
import EditProduct from "./editPage";
import { databases } from "@/appwrite_server";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";

const AsyncWrapProduct = async ({
    params,
  }: {
    params: Promise<{ pdtid: string }>
  }) => {
    try {
        const { pdtid } = await params;
        const doc:Product = await databases.getDocument('67b8c653002efe0cdbb2', 'products', pdtid, [Query.select(["*", "cover.*", "gallery.*", "category.*"])]);
        return (
            <EditProduct payload={doc} />
        )
    } catch {
        redirect("/admin/products");
    }
}

export default AsyncWrapProduct;