import Image from "next/image";
import Link from "next/link";

const Card1 = ({img, mrp, sp, name}:{img:string; mrp:number; sp:number; name:string}) =>{
     return (
        <Link href={'/product/demo'}>
            <div className="rounded-xl relative hover:border-my_green border-gray-300 ease-in-out duration-150 border-2 overflow-hidden">
            {sp < mrp ? (
                <div className="rounded-bl-xl absolute right-0 bg-my_green p-2 text-white origin-top-right top-0">
                    <span>{((mrp-sp)*100/ mrp).toFixed(0)}</span>
                    <span>%<br />OFF</span>
                </div>
            ):null}
            <Image src={img} alt={name} width={250} height={250} className="w-45 h-45 m-auto object-contains p-2" />
            <div className="divide-solid divide-gray-400 p-4">
                <div className="text-lg">
                    <h4 className="font-bold">{name}</h4>
                    {
                        sp < mrp ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold ">${sp}</span>
                                <span className="text-sm line-through">${mrp}</span>
                            </div>
                        ): (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">${mrp}</span>
                            </div>
                        )
                    }
                </div>
                {
                    sp < mrp? (
                        <p className="text-my_green text-xl font-bold">
                            <span>Save - &nbsp;
                            </span>
                            <span>${mrp-sp}</span>
                        </p>
                    ): null
                }
            </div>
        </div>
        </Link>
     )
}

export default Card1;
     