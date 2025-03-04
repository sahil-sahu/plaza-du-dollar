"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
  } from "@/components/ui/carousel"
import caro_img from "../assets/Carousel.png"
import Image from "next/image";
import { DotButton, useDotButton } from '@/components/ui/carouselDots';
import { useEffect, useState } from "react";
const CarouselComponent = () => {
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

return (
    <div className="container m-auto p-4 w-[90%] relative">
        <Carousel setApi={setApi} className="">
            <CarouselContent className="">
                <CarouselItem>
                <Image src={caro_img} className="w-full" alt="Carousel text" />
                </CarouselItem>
                <CarouselItem>
                <Image src={caro_img} className="w-full" alt="Carousel text" />
                </CarouselItem>
                <CarouselItem>
                <Image src={caro_img} className="w-full" alt="Carousel text" />
                </CarouselItem>
            </CarouselContent>
            <CarouselNext className="translate-x-[-2rem] scale-150">
                <span>Next</span>
            </CarouselNext>
            <CarouselPrevious className="translate-x-[2rem] scale-150">
                <span>Previous</span>
            </CarouselPrevious>
            <div className="embla__dots gap-1 absolute bottom-10 left-20 flex justify-center">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'bg-white rounded-full w-3 h-3 ease-in-out duration-500 border-[3px] border-white embla__dot'.concat(
                        index === selectedIndex ? ' embla__dot--selected !w-6' : ''
                    )}
                    />
                ))}
            </div>
        </Carousel>
    </div>
)
}

export default CarouselComponent;