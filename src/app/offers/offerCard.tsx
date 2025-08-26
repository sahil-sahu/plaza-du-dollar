// "use client";

import Image from "next/image";
import { Offer } from "@/types";
import Link from "next/link";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  // Take only first 4 products for the 2x2 grid
  const displayedProducts = offer.products.slice(0, 4);

  return (
    <div className="w-full max-h-[50vh] bg-white rounded-lg shadow-md border border-gray-100">
      <div className="md:flex">
        {/* Left side - Offer Image */}
        <div className="md:w-1/2 relative">
          <Image
            src={offer.image.url}
            alt={offer.offerName}
            width={600}
            height={400}
            className="object-cover max-h-[50vh]"
            priority
          />
        </div>

        {/* Right side - Products Grid */}
        <div className="p-4 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{offer.offerName}</h2>
          <div className="grid items-center h-max grid-cols-2 gap-4">
            {displayedProducts.map((product) => (
              <Link 
                href={`/product/${product.$id}`} 
                key={product.$id} 
                className="block border rounded-lg p-3 hover:shadow-md transition-shadow hover:border-blue-200"
              >
                <div className="relative h-24 mb-2">
                  <Image
                    src={product.cover.url}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 200px max-height: 200px) 100vw, 200px"
                  />
                </div>
                <h3 className="font-medium text-sm line-clamp-1 text-gray-700">{product.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-green-600 font-semibold">
                    ${product.salePrice?.toFixed(2)}
                  </span>
                  {product.regPrice && product.regPrice > product.salePrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${product.regPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.chips && product.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.chips.slice(0, 2).map((chip, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;