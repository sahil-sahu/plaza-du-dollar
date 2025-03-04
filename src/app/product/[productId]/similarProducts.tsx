"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { dummyCard } from "@/dummyData";
import Card1 from "@/components/card1";
const SimilarProducts = () => {
    return (
        <Carousel className="">
            <CarouselContent className="">
            {
              dummyCard.map((card) => (
                <CarouselItem className="md:basis-1/3 lg:basis-1/4" key={card.id}>
                    <Card1  mrp={card.mrp} sp={card.price} name={card.name} img={card.image}></Card1>
                </CarouselItem>
              ))
            }
            </CarouselContent>
            <CarouselNext className="translate-x-[-2rem] scale-150">
                <span>Next</span>
            </CarouselNext>
            <CarouselPrevious className="translate-x-[2rem] scale-150">
                <span>Previous</span>
            </CarouselPrevious>
        </Carousel>
    )
}

export default SimilarProducts;