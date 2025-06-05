import { databases } from "@/appwrite_server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Offer } from "@/types";
import OfferCard from "./offerCard";

export const dynamic = 'force-dynamic';

const Offers = async () => {
    try {
        const {total, documents} = await databases.listDocuments(
            "67b8c653002efe0cdbb2",
            "offers"
        )
        const docs = documents as Offer[];
        
        return (
            <section className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Offers
                </h1>
                <div className="my-4 flex justify-end">
                    <Link href={"/admin/offers/add"}>
                        <Button variant={"secondary"}>
                            ADD NEW
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map((offer) => (
                        <OfferCard 
                            key={offer.$id} 
                            id={offer.$id}
                            image={offer.image.url}
                            name={offer.offerName}
                            showOnLanding={offer.showOnLanding}
                        />
                    ))}
                </div>
            </section>
        )
    } catch (error) {
        console.log(error)
        return (
            <section>
                <h1>
                    Error
                </h1>
            </section>
        )
    }
}

export default Offers; 