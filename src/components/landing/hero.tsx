import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { getHeroOffers } from "@/lib/getHeroOffers";
import HeroDots from "./hero-dots";

// Make the component async to fetch data
async function CarouselComponent() {
    // Fetch hero offers
    const heroOffers = await getHeroOffers();

    if (heroOffers.length === 0) {
        return null; // Don't render anything if there are no offers
    }

    return (
        <div className="container m-auto p-4 w-[90%] relative">
            <Carousel className="">
                <CarouselContent className="">
                    {heroOffers.map((offer) => (
                        <CarouselItem className="overflow-hidden" key={offer.$id}>
                            <Image 
                                src={offer.image.url} 
                                width={1200} 
                                height={400} 
                                className="w-full max-h-[400px] object-cover rounded-xl" 
                                alt={offer.offerName}
                                priority // Add priority for hero images
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="translate-x-[-2rem] scale-150">
                    <span>Next</span>
                </CarouselNext>
                <CarouselPrevious className="translate-x-[2rem] scale-150">
                    <span>Previous</span>
                </CarouselPrevious>
                <HeroDots />
            </Carousel>
        </div>
    );
}

export default CarouselComponent;