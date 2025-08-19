import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import DetailedInfo from "./detailedInfo";
import SimilarProducts from "./similarProducts";
import { databases } from "@/appwrite_server";
import { Product } from "@/types";
import ProductContent from "./ProductContent";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  try {
    const product = await databases.getDocument(
      "67b8c653002efe0cdbb2",
      "products",
      (await params).productId
    ) as Product;
    // You can pass product to child components as needed
    // console.log(product);
    return (
      <>
        <Header />
        <ProductContent product={product} />
        <section className="container m-auto my-8">
          <DetailedInfo product={product} />
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
  } catch (error) {
    return (
      <section className="container m-auto my-8">
        <h1 className="text-red-500 text-xl">Error loading product.</h1>
      </section>
    );
  }
};

export default ProductPage;