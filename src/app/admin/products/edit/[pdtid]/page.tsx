import { Product } from "@/types";
import EditProduct from "./editPage";
import { databases } from "@/appwrite_server";


const AsyncWrapProduct = async ({
    params,
  }: {
    params: Promise<{ pdtid: string }>
  }) => {
    try {
        const { pdtid } = await params;
        const doc:Product = await databases.getDocument('67b8c653002efe0cdbb2', 'products', pdtid);
        return (
            <EditProduct payload={doc} />
        )
    } catch (error) {
        return (
            <section>
                <h1>
                    Error in Loading Product
                </h1>
            </section>
        )
    }
}

export default AsyncWrapProduct;