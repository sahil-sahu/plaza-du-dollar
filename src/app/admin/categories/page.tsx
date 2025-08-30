import { databases } from "@/appwrite_server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { categoryObj } from "@/types";
import CatCard from "./categoryCard";

export const dynamic = 'force-dynamic';

const Categories = async () => {
    try {
        const { documents } = await databases.listDocuments(
            "67b8c653002efe0cdbb2",
            "category"
        )
        const docs = documents as categoryObj[];

        return (
            <section className="p-4">
                <h1>
                    Categories
                </h1>
                <div className="my-4 flex justify-end">
                    <Link href={"/admin/categories/add"}>
                        <Button variant={"secondary"}>
                            ADD NEW
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    { 
                        docs.map((cat) => (
                            <CatCard 
                                key={cat.$id} 
                                id={cat.$id} 
                                image={cat.image_url} 
                                name={cat.name}
                                showOnLanding={cat.showOnLanding}
                                showExpanded={cat.showExpanded}
                            />
                        ))
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

export default Categories;