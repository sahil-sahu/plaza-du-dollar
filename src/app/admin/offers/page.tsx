"use client"
import { databases } from "@/app/appwrite";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Offer } from "@/types";
import OfferCard from "./offerCard";
import { useState, useEffect, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import { Query } from "appwrite";
import { Models } from "appwrite";

const Offers = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterShowOnLanding, setFilterShowOnLanding] = useState(false);
    const [filterShowOnHero, setFilterShowOnHero] = useState(false);

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        try {
            const {documents} = await databases.listDocuments(
                "67b8c653002efe0cdbb2",
                "offers",
                [Query.select(["*", "image.*"])],
            );
            setOffers(documents as (Offer & Models.DefaultRow)[]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    const handleFilterChange = async (type: 'landing' | 'hero', checked: boolean) => {
        if (type === 'landing') {
            setFilterShowOnLanding(checked);
        } else {
            setFilterShowOnHero(checked);
        }
        // Refetch offers when filters change
        await fetchOffers();
    };

    const filteredOffers = offers.filter(offer => {
        if (filterShowOnLanding && filterShowOnHero) {
            return offer.showOnLanding && offer.showOnHero;
        } else if (filterShowOnLanding) {
            return offer.showOnLanding;
        } else if (filterShowOnHero) {
            return offer.showOnHero;
        }
        return true;
    });

    if (loading) {
        return (
            <section className="p-4">
                <h1>Loading...</h1>
            </section>
        );
    }

    return (
        <section className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Offers
                </h1>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={fetchOffers}
                        title="Refresh offers"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Link href={"/admin/offers/add"}>
                        <Button variant={"secondary"}>
                            ADD NEW
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg mb-4">
                <h2 className="text-lg font-semibold mb-2">Filters</h2>
                <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="filterShowOnLanding"
                            checked={filterShowOnLanding}
                            onCheckedChange={(checked) => handleFilterChange('landing', checked as boolean)}
                        />
                        <Label htmlFor="filterShowOnLanding">Show Landing Page Offers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="filterShowOnHero"
                            checked={filterShowOnHero}
                            onCheckedChange={(checked) => handleFilterChange('hero', checked as boolean)}
                        />
                        <Label htmlFor="filterShowOnHero">Show Hero Section Offers</Label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOffers.map((offer) => (
                    <OfferCard 
                        key={offer.$id} 
                        id={offer.$id}
                        image={offer.image.url}
                        name={offer.offerName}
                        showOnLanding={offer.showOnLanding}
                        showOnHero={offer.showOnHero}
                    />
                ))}
            </div>

            {filteredOffers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No offers match the selected filters
                </div>
            )}
        </section>
    );
}

export default Offers; 