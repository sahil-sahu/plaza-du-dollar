import ProductCarousel from "./productCarousel";
import Rating from "./rating";
import { Copy } from "lucide-react";
import { Product } from "@/types";
import AddToCartControls from "./AddToCartControls";

interface ProductContentProps {
  product: Product;
}

const ProductContent = ({ product }: ProductContentProps) => {
  return (
    <section className="container grid md:grid-cols-2 m-auto">
      <div className="p-5">
        <ProductCarousel imgs={[...(product.gallery?.map(img => img.url)), product.cover.url]} />
      </div>
      <div className="pt-8 p-4">
        <Rating rate={4.5} review={2000} />
        {/* Product Details */}
        <h1 className="text-xl">{product.name}</h1>
        <div className="grid grid-cols-2 text-gray-400 ">
          <div>
            Size: <span className="font-bold text-black">&nbsp; {product.sku}</span>
          </div>
          <div>
            Availibility: <span className="font-bold text-my_green">&nbsp;{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
          </div>
          <div>
            Brand : <span className="font-bold text-black">&nbsp; {product.brand}</span>
          </div>
          <div>
            Category: <span className="font-bold text-black">&nbsp;{product.category?.name ?? ""}</span>
          </div>
        </div>
        <div className="my-4">
          <span className="text-lg text-cyan-500 font-bold">${product.salePrice}&nbsp; </span>
          <span className="text-gray-400 line-through">${product.regPrice}</span>
          {product.regPrice > product.salePrice && (
            <span className="mx-2 bg-yellow-500 font-bold p-2 text-sm">
              {Math.round(((product.regPrice - product.salePrice) / product.regPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <AddToCartControls product={product} />
        <div className="text-gray-600 flex items-center gap-4 my-4">
          <div>
            Share Product:
          </div>
          <div>
            <Copy />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductContent;


