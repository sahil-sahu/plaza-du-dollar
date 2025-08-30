"use client"

import { CarouselApi } from "@/components/ui/carousel"
import { DotButton, useDotButton } from '@/components/ui/carouselDots';
import { useEffect, useState } from "react";

export default function HeroDots() {
    const [api] = useState<CarouselApi>()
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

    useEffect(() => {
        if (!api) {
            return
        }
        api.on("select", () => {
            // Do something on select.
        })
    }, [api])

    if (!api) return null;

    return (
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
    );
} 