import { imgObj } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { tablesDB } from "@/app/appwrite";
import defaultImg from "@/defaultImages/box.png"
const CartImg = ({img}: {img?:imgObj}) => {
    const [imgUrl, setImgUrl] = useState<string|undefined>(img?.url);
    useEffect(() => {
        if(img && !img.url){
            tablesDB.getRow("67b8c653002efe0cdbb2", "67fba05e003a732c656a", String(img))
                .then((row) => {
                    setImgUrl(row.url);
                })
        }
    }, [img]);
    return (
        <Image width={40} className="object-cover" height={40} alt={img?.name || ""} src={imgUrl || defaultImg} />
    )
}

export default CartImg;

    