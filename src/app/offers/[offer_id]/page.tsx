import { databases } from "@/appwrite_server";
import { Offer, Product } from "@/types";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import Card1 from "@/components/card1";

async function getOffer(offerId: string): Promise<Offer | null> {
  try {
    const offer = await databases.getDocument(
      '67b8c653002efe0cdbb2',
      'offers',
      offerId
    );
    return offer as unknown as Offer;
  } catch (error) {
    console.error('Error fetching offer:', error);
    return null;
  }
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ offer_id: string }>;
}) {
  const offer = await getOffer((await params).offer_id);

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Offer not found</h1>
            <p className="mt-2 text-gray-600">The requested offer could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Offer Header */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {offer.offerName}
            </h1>
            
            {/* Offer Image */}
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={offer.image.url}
                alt={offer.offerName}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Products Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Products in this offer
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {offer.products.map((product: Product) => (
                  <Card1
                    key={product.$id}
                    img={product.cover.url}
                    mrp={product.regPrice || 0}
                    sp={product.salePrice || 0}
                    name={product.name}
                    uid={product.$id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}