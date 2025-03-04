import Card1 from "@/components/card1";
import Card2 from "@/components/card2";
import CategoryCard from "@/components/categoryCard";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import CarouselComponent from "@/components/landing/hero";
import OfferCarousel from "@/components/offerCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { dummyCard,dummyCategory, dummyOffers } from "@/dummyData";

export default function Home() {
  return (
    <>
      <Header />
      <CarouselComponent />
      <section className="container m-auto">
          <div className="border-b-2 mt-16 border-gray-300 m-auto flex justify-between">
            <h2 className="text-gray-600 text-2xl font-bold px-2 border-b border-b-3 border-my_green inline">
              Grab the best deal on
              <span className="text-my_green">&nbsp;Best Sellers</span>
            </h2>
            <Link href={"#"} className="float-end flex">
            <span>View All</span>
            <ChevronRight className="text-my_green" />
            </Link>
          </div>
          {/* //products */}
          <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4 p-4">
            {
              dummyCard.map((card) => (
                <Card1 key={card.id} mrp={card.mrp} sp={card.price} name={card.name} img={card.image}></Card1>
              ))
            }
          </div>
      </section>
      <section className="container m-auto">
          <div className="border-b-2 mt-16 border-gray-300 m-auto flex justify-between">
            <h2 className="text-gray-600 text-2xl font-bold px-2 border-b border-b-5 border-my_green inline">
              Shop From 
              <span className="text-my_green">&nbsp;Top Categories</span>
            </h2>
            <Link href={"#"} className="float-end flex">
            <span>View All</span>
            <ChevronRight className="text-my_green" />
            </Link>
          </div>
          {/* //products */}
          <div className="flex justify-center items-center gap-4 p-4">
            {
              dummyCategory.map((card) => (
                <CategoryCard key={card.id} link="#" name={card.name} img={card.image} />
              ))
            }
          </div>
      </section>
      <section className="container m-auto">
          <div className="border-b-2 mt-16 border-gray-300 m-auto flex justify-between">
            <h2 className="text-gray-600 text-2xl font-bold px-2 border-b border-b-5 border-my_green inline">
              Top
              <span className="text-my_green">&nbsp;Offers</span>
            </h2>
            <Link href={"#"} className="float-end flex">
            <span>View All</span>
            <ChevronRight className="text-my_green" />
            </Link>
          </div>
          {/* //products */}
          <OfferCarousel offerlist={dummyOffers}/>
      </section>
      <section className="container m-auto">
          <div className="border-b-2 mt-16 border-gray-300 m-auto flex justify-between">
            <h2 className="text-gray-600 text-2xl font-bold px-2 border-b border-b-5 border-my_green inline">
              Daily
              <span className="text-my_green">&nbsp;Essential</span>
            </h2>
            <Link href={"#"} className="float-end flex">
            <span>View All</span>
            <ChevronRight className="text-my_green" />
            </Link>
          </div>
          {/* //products */}
          <div className="flex items-center overflow-x-auto gap-4 p-4">
            {
              dummyCard.map((card) => (
                <Card2 key={card.id} link="#" description="Upto 50%" name={card.name} img={card.image}></Card2>
              ))
            }
          </div>
      </section>
      <Footer />
    </>
  );
}
