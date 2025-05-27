"use client"
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation';
import { databases } from "@/app/appwrite";

const PdtCard = (payload:{
    image: string;
    name: string;
    category: string;
    cost:number;
    id:string;
}) =>{
    const router = useRouter();
    const deleteProduct = async () => {
        const res = await databases.deleteDocument('67b8c653002efe0cdbb2',
                'products',
                payload.id,)
        router.refresh()
    }
    return(
        <div className="rounded-xl p-4 bg-white">
            <div className="grid grid-cols-3 items-center">
                <Image src={payload.image} width={50} height={50} className="overflow-hidden" alt={payload.name}></Image>
                <div>
                    <h4>
                        {payload.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                        {payload.category}
                    </p>
                </div>
                <div>
                <Popover>
                    <PopoverTrigger className="float-right w-24 p-4 rounded-xl bg-slate-100">
                            <Ellipsis className="m-auto"/>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-4 items-center">
                        <Link className="w-min" href={`/admin/products/edit/${payload.id}`}>
                            <Button className="float-right w-24" variant="secondary">
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={deleteProduct} className="float-right w-24" variant="secondary">
                            Delete
                        </Button>
                    </PopoverContent>
                </Popover>    
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-xl">
                    Summary
                </h3>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, doloribus!
                </p>
            </div>
            <table className="border rounded text-gray-500 w-full p-4">
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <th>
                            Sales
                        </th>
                        <th>
                            {100}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Remaining Products
                        </th>
                        <th>
                            {1269}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default PdtCard;