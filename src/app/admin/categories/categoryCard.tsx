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

const CatCard = (payload:{
    image: string;
    name: string;
    id: string;
    showOnLanding?: boolean;
}) =>{
    const router = useRouter();
    const deleteProduct = async () => {
        const res = await databases.deleteDocument('67b8c653002efe0cdbb2',
                'category',
                payload.id,)
        router.refresh()
    }

    const toggleShowOnLanding = async () => {
        try {
            await databases.updateDocument(
                '67b8c653002efe0cdbb2',
                'category',
                payload.id,
                {
                    showOnLanding: !payload.showOnLanding
                }
            );
            router.refresh();
        } catch (error) {
            console.error('Error updating showOnLanding:', error);
        }
    };

    return(
        <div className="rounded-xl p-4 bg-white">
            <div className="grid grid-cols-3 items-center">
                <Image src={payload.image} width={100} height={100} className="overflow-hidden" alt={payload.name}></Image>
                <div className="flex flex-col gap-2">
                    <h4>
                        {payload.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id={`showOnLanding-${payload.id}`}
                            checked={payload.showOnLanding}
                            onCheckedChange={toggleShowOnLanding}
                        />
                        <Label htmlFor={`showOnLanding-${payload.id} text-xs`}>Show on Landing</Label>
                    </div>
                </div>
                <div>
                <Popover>
                    <PopoverTrigger className="float-right w-24 p-4 rounded-xl bg-slate-100">
                            <Ellipsis className="m-auto"/>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-4 items-center">
                        <Link className="w-min" href={`/admin/categories/edit/${payload.id}`}>
                            <Button className="float-right w-24" variant="secondary">
                                Edit
                            </Button>
                        </Link>
                        <Link className="w-min" href={`/admin/products?category=${payload.id}`}>
                            <Button className="float-right w-24 flex gap-2 items-center" variant="secondary">
                                <Eye className="w-4 h-4" />
                                View
                            </Button>
                        </Link>
                        <Button onClick={deleteProduct} className="float-right w-24" variant="secondary">
                            Delete
                        </Button>
                    </PopoverContent>
                </Popover>    
                </div>
            </div>
        </div>
    )
}

export default CatCard;