import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({img, name}:{img:string; link: string; name:string}) =>{
     return (
        <Link href={"#"} className="rounded-full w-[170px] h-[170px] relative hover:shadow flex justify-center items-center flex-col hover:border-my_green border-gray-300 ease-in-out duration-150 border-2 overflow-hidden">
            
            <Image src={img} alt={name} width={125} height={125} className="w-45 h-45 m-auto object-cover p-2" />
            <div className="divide-solid divide-gray-400 mb-5 p-2">
                <div className="text-sm">
                    <h4 className="font-bold">{name}</h4>
                </div>
            </div>
        </Link>
     )
}

export default CategoryCard;
     