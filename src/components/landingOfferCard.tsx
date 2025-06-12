import Image from "next/image";
import Link from "next/link";

interface LandingOfferProps {
    image: string;
    name: string;
    link: string;
}

const LandingOfferCard = ({ image, name, link }: LandingOfferProps) => {
    return (
        <Link href={link} className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-[300px] h-[200px]">
                <Image 
                    src={image} 
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 300px) 100vw, 300px"
                />
            </div>
            <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            </div>
        </Link>
    );
};

export default LandingOfferCard; 