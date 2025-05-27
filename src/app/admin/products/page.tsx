import { databases } from "@/appwrite_server";
import PdtCard from "./components/pdtCard";
import { Product } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Products = async () => {
    try {
        const {total, documents} = await databases.listDocuments(
            "67b8c653002efe0cdbb2",
            "products"
        )
        const docs = documents as Product[];

        return (
            <section className="p-4">
                <h1>
                    Products
                </h1>
                <div className="my-4 flex justify-end">
                    <Link href={"/admin/products/add"}>
                        <Button variant={"secondary"}>
                            ADD NEW
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    { 
                        docs.map((pdt) => <PdtCard key={pdt.$id} id={pdt.$id} image={pdt.cover.url} name={pdt.name} category={pdt.category?.name ?? ""} cost={pdt.price} />)
                    }
                </div>
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