import { storage } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { imgObj } from "@/types";
import Dropzone from "dropzone";
import Image from "next/image";
import { useEffect, useRef } from "react";

const FileUpload = ({id, maxFiles, imageUrls, setUrls}:{id:string ; maxFiles: number|undefined, imageUrls : imgObj[]; setUrls: React.Dispatch<React.SetStateAction<imgObj[]>>}) =>{
    const myDropZone = useRef<Dropzone>(null)
    
    useEffect(() =>{
        myDropZone.current = new Dropzone(`#${id}`, {
            url: "/admin/products/add/upload",
            init() {
                this.on('success', (e, res) =>{
                    setUrls(
                        (prev) => {
                            return [...prev, {name: e.name, url: res.toString(), id: res.toString().split("/files/")[1].split("/view")[0] ?? ""}]
                        }
                    )
                })
                this.on("complete", function(file) {
                    myDropZone.current?.removeFile(file);
                  });
            },
            maxFiles:maxFiles,
        })
        
        return () => {
            myDropZone.current?.destroy()
        }
        
    }, [id, maxFiles, imageUrls, setUrls])
    return (
        <>
            <div id={id} className="dropzone">
            <div className="previews"></div>
            
            </div>
            <ul>
                {
                    imageUrls.map((e, i) => (
                        <li key={i} className="flex gap-2 items-center p-2">
                                <Image className="rounded-xl" width={50} height={50} src={e.url}  alt="Gallery Image" />
                                <div className="flex flex-col">
                                    <h4>
                                        {e.name}
                                    </h4>
                                </div>
                                <Button onClick={(event)=>{
                                    event.preventDefault()
                                    storage.deleteFile("67f0f73300267604857c", e.id)
                                    setUrls((prev)=>{
                                        return prev.filter(ele => e.url !== ele.url);
                                    })
                                }} className="bg-red-500 text-white py-2 px-4 rounded-md">
                                    Delete
                                </Button>
                            </li>
                    ))
                }
            </ul>
        </>
    )
}

export default FileUpload;