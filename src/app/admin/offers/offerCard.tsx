"use client"
import { Button } from "@/components/ui/button";
import { Ellipsis, Eye } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation';
import { databases } from "@/app/appwrite";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const OfferCard = (payload:{
    image: string;
    name: string;
    id: string;
    showOnLanding?: boolean;
    showOnHero?: boolean;
}) =>{
    const router = useRouter();
    const [isShowOnLanding, setIsShowOnLanding] = useState(payload.showOnLanding || false);
    const [isShowOnHero, setIsShowOnHero] = useState(payload.showOnHero || false);

    const deleteOffer = async () => {
        try {
            await databases.deleteDocument(
                '67b8c653002efe0cdbb2',
                'offers',
                payload.id
            );
            router.refresh();
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    }

    const toggleShowOnLanding = async () => {
        const newValue = !isShowOnLanding;
        try {
            setIsShowOnLanding(newValue); // Update local state immediately

            await databases.updateDocument(
                '67b8c653002efe0cdbb2',
                'offers',
                payload.id,
                {
                    showOnLanding: newValue
                }
            );
        } catch (error) {
            console.error('Error updating showOnLanding:', error);
            setIsShowOnLanding(!newValue); // Revert local state if update fails
        }
    };

    const toggleShowOnHero = async () => {
        const newValue = !isShowOnHero;
        try {
            setIsShowOnHero(newValue); // Update local state immediately

            await databases.updateDocument(
                '67b8c653002efe0cdbb2',
                'offers',
                payload.id,
                {
                    showOnHero: newValue
                }
            );
        } catch (error) {
            console.error('Error updating showOnHero:', error);
            setIsShowOnHero(!newValue); // Revert local state if update fails
        }
    };

    return(
        <div className="rounded-xl p-4 bg-white">
            <div className="grid grid-cols-1 gap-4">
                <Image 
                    src={payload.image} 
                    width={400} 
                    height={200} 
                    className="w-full h-48 object-cover rounded-lg" 
                    alt={payload.name}
                />
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">
                        {payload.name}
                    </h4>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id={`showOnLanding-${payload.id}`}
                                checked={isShowOnLanding}
                                onCheckedChange={toggleShowOnLanding}
                            />
                            <Label htmlFor={`showOnLanding-${payload.id}`}>Show on Landing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                id={`showOnHero-${payload.id}`}
                                checked={isShowOnHero}
                                onCheckedChange={toggleShowOnHero}
                            />
                            <Label htmlFor={`showOnHero-${payload.id}`}>Show on Hero Section</Label>
                        </div>
                    </div>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger className="float-right w-24 p-4 rounded-xl bg-slate-100">
                            <Ellipsis className="m-auto"/>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-4 items-center">
                            <Link className="w-min" href={`/admin/offers/edit/${payload.id}`}>
                                <Button className="float-right w-24" variant="secondary">
                                    Edit
                                </Button>
                            </Link>
                            <Link className="w-min" href={`/admin/offers/products/${payload.id}`}>
                                <Button className="float-right w-24 flex gap-2 items-center" variant="secondary">
                                    <Eye className="w-4 h-4" />
                                    Products
                                </Button>
                            </Link>
                            <Button onClick={deleteOffer} className="float-right w-24" variant="secondary">
                                Delete
                            </Button>
                        </PopoverContent>
                    </Popover>    
                </div>
            </div>
        </div>
    )
}

export default OfferCard; 