import { databases } from "@/appwrite_server";
import OfferCard from "./offerCard";
import { Offer } from "@/types";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import { Query } from "node-appwrite";

const Offers = async () => {
    const offers = await databases.listDocuments(
        '67b8c653002efe0cdbb2',
        'offers',
        [
            Query.select(["*", "image.*"]),
        ]
    );
    return (
        <>
            <Header />
            <section className="container m-auto grid grid-cols-1 gap-4 my-8">
                {offers.documents.map((offer) => (
                    <OfferCard key={offer.$id} offer={offer as Offer} />
                ))}
            </section>
            <Footer />
        </>
    );
};

export default Offers;
