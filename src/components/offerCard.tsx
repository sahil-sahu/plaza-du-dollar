"use client"
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
  } from "@/components/ui/carousel"
import Image from "next/image";
import { DotButton, useDotButton } from '@/components/ui/carouselDots';
import { useEffect, useState } from "react";

interface Offer {img:string; link: string;}
const OfferCard = ({img, link}:Offer) =>{
     return (
        <Link href={link} className="relative rounded">
            
            <Image src={img} alt={""} width={500} height={282} className="w-full h-full m-auto object-fill" />
            
        </Link>
     )
}

const OfferCarousel = ({offerlist}: {offerlist:Offer[]}) =>{
    const [api, setApi] = useState<CarouselApi>()
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

    useEffect(() => {
        if (!api) {
        return
        }
        api.on("select", () => {
            // Do something on select.
        })
    }, [api])

    return(
        <div className="container m-auto p-4 relative">
        <Carousel setApi={setApi} className="">
            <CarouselContent className="">
            {
              offerlist.map((card, id) => (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3">
                    <OfferCard  link={card.link} img={card.img} />
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
            <div className="embla__dots gap-2 mt-2 flex justify-center">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'bg-my_green rounded-full w-1 h-1 ease-in-out duration-500 border-[3px] border-my_green embla__dot'.concat(
                        index === selectedIndex ? ' embla__dot--selected !w-2' : ''
                    )}
                    />
                ))}
            </div>
        </Carousel>
        </div>
    )
}
export default OfferCarousel;
     