import Image from "next/image";

const Card2 = ({img, name, description}:{img:string; link:string; name:string;description:string}) =>{
     return (
        <div className="rounded-xl relative card2">
            <Image src={img} alt={name} width={150} height={150} className="rounded-xl ease-in-out duration-150 m-auto object-cover p-2" />
            <div className="text-center">
                <h4 className="font-bold text-sm text-gray-500">{name}</h4>
                <p className="text-lg font-bold leading-4">{description}</p>
            </div>
        </div>
     )
}

export default Card2;
     