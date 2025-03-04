import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ProductCarousel from "./productCarousel";
import Rating from "./rating";
import DetailedInfo from "./detailedInfo";
import { Copy, ShoppingCart } from "lucide-react";
import SimilarProducts from "./similarProducts";
import QuantityFiller from "@/components/quantityFiller";
const imgs = [
    "https://m.media-amazon.com/images/I/41HGx2QbIiL._SX300_SY300_QL70_FMwebp_.jpg",
    "https://m.media-amazon.com/images/I/61QO-CHa70L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/71iFKgkId0L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/61ysQ6qhLXL._SX679_.jpg"
];
const ProductPage = () => {
    return (
        <>
        <Header />
        <section className="container grid md:grid-cols-2 m-auto">
            <div className="p-5">
                <ProductCarousel imgs={imgs} />
            </div>
            <div className="pt-8 p-4">
                <Rating rate={4.5} review={2000} />
                {/* Product Details */}
                <h1 className="text-xl">Kushies Bowl and Spoon Set Pink</h1>
                <div className="grid grid-cols-2 text-gray-400 ">
                    <div>
                        Size: <span className="font-bold text-black">&nbsp; A2671</span>
                    </div>
                    <div>
                        Availibility: <span className="font-bold text-my_green">&nbsp;In Stock</span>
                    </div>
                    <div>
                        Brand : <span className="font-bold text-black">&nbsp; Kushia</span>
                    </div>
                    <div>
                        Category: <span className="font-bold text-black">&nbsp;Baby</span>
                    </div>
                </div>
                <div className="my-4">
                    <span className="text-lg text-cyan-500 font-bold">$4&nbsp; </span>
                    <span className="text-gray-400 line-through">$5</span>
                    <span className="mx-2 bg-yellow-500 font-bold p-2 text-sm">
                        20% OFF
                    </span>
                </div>
                <div className="text-lg flex justify-stretch gap-4">
                    <QuantityFiller />
                    <div className="flex-[30%] text-white text-lg bg-my_green flex items-center gap-4 justify-center p-5">
                        <span>
                            ADD TO CARD
                        </span>
                        <ShoppingCart />
                    </div>
                    <div className="w-full flex-1 text-my_green border-2 text-center border-my_green p-5">
                        BUY NOW
                    </div>
                </div>
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
        <section className="container m-auto my-8">
            <DetailedInfo />
        </section>
        <section className="container mx-auto my-10">
            <h2 className="text-lg font-bold p-2 mb-4 border-b-4 border-b-my_green w-[15rem]">
                Similar Products
            </h2>
            <SimilarProducts />
        </section>
        <Footer />
        </>
    );
}

export default ProductPage;