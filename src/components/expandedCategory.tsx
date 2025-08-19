import { Product, categoryObj } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Card1 from "./card1";

interface ExpandedCategoryProps extends categoryObj {
    products: Product[];
}

const ExpandedCategory = ({ name, image_url, $id, products }: ExpandedCategoryProps) => {
    return (
        <section className="container m-auto">
            <div className="border-b-2 mt-16 border-gray-300 m-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-my_green">
                        <Image 
                            src={image_url} 
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                    </div>
                    <h2 className="text-gray-600 text-2xl font-bold">
                        {name}
                    </h2>
                </div>
                <Link href={`/category/${$id}`} className="float-end flex items-center hover:text-my_green transition-colors">
                    <span>View All</span>
                    <ChevronRight />
                </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 p-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Card1 
                            key={product.$id}
                            uid={product.$id}
                            name={product.name}
                            img={product.cover.url}
                            mrp={product.regPrice}
                            sp={product.salePrice}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">No products available</p>
                )}
            </div>
        </section>
    );
};

export default ExpandedCategory; 