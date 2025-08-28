"use client"
import { databases } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUpload from "@/app/admin/products/add/fileUpload";
import { imgObj, Offer } from "@/types";
import { useRouter } from "next/navigation";
import { Models } from "appwrite";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const EditOffer = ({ params }: { params: Promise<{ id: string }> }) => {
    const [name, setName] = useState("");
    const [imageUrls, setImageUrls] = useState<imgObj[]>([]);
    const [showOnLanding, setShowOnLanding] = useState(false);
    const [showOnHero, setShowOnHero] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const offer = await databases.getDocument(
                    "67b8c653002efe0cdbb2",
                    "offers",
                    (await params).id
                ) as Models.Document & Offer;
                
                setName(offer.offerName);
                setShowOnLanding(offer.showOnLanding || false);
                setShowOnHero(offer.showOnHero || false);
                if (offer.image) {
                    setImageUrls([offer.image]);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                alert("Error fetching offer");
                router.push("/admin/offers");
            }
        };
        fetchOffer();
    }, [params]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || imageUrls.length === 0) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await databases.updateDocument(
                "67b8c653002efe0cdbb2",
                "offers",
                (await params).id,
                {
                    offerName: name,
                    image: imageUrls[0],
                    showOnLanding: showOnLanding,
                    showOnHero: showOnHero
                }
            );
            router.push("/admin/offers");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error updating offer");
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Offer</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Offer Name</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter offer name"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Offer Image</label>
                    <FileUpload
                        id="offerImage"
                        maxFiles={1}
                        imageUrls={imageUrls}
                        setUrls={setImageUrls}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showOnLanding"
                            checked={showOnLanding}
                            onCheckedChange={(checked) => setShowOnLanding(checked as boolean)}
                        />
                        <Label htmlFor="showOnLanding">Show on Landing Page</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showOnHero"
                            checked={showOnHero}
                            onCheckedChange={(checked) => setShowOnHero(checked as boolean)}
                        />
                        <Label htmlFor="showOnHero">Show on Hero Section</Label>
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Update Offer
                </Button>
            </form>
        </div>
    );
};

export default EditOffer; 