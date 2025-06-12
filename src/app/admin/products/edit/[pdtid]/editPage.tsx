'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CategoryBox from "../../add/categoryBox"
import React from 'react'
import { MuiChipsInput } from 'mui-chips-input'
import Image from "next/image"
import FileUpload from "../../add/fileUpload"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { imgObj, Product, productPayload } from "@/types"
import { databases, ID } from "@/app/appwrite"
import { redirect, useRouter } from 'next/navigation'
type ProductState = {
    error?: string;
    success?: string;
  };
const EditProduct = ({payload}:{payload:Product}) => {
    const [chips, setChips] = React.useState<string[]>(payload.chips ?? [])
    const [coverUrl, setCover] = React.useState<imgObj[]>([payload.cover]);
    const [imageUrls, setUrls] = React.useState<imgObj[]>(payload.gallery);
    const router = useRouter();
    const [categoryValue, setCategory] = React.useState(payload.category?.$id ?? "")

    async function productAction(prevState: ProductState, formData: FormData): Promise<ProductState> {
        const json = {
            ...Object.fromEntries(formData.entries()),
            cover: coverUrl.length > 0 ? coverUrl[0] : "",
            gallery: imageUrls,
            chips,
        };
        
        try {
            await databases.updateDocument(
                '67b8c653002efe0cdbb2',
                'products',
                payload.$id,
                {
                    name: formData.get("name"),
                    description: formData.get("description"),
                    additional: formData.get("additional"),
                    specification: formData.get("specification"),
                    
                    brand: formData.get("brand"),
                    sku: +(formData.get("sku") ?? 0),
                    stock: +(formData.get("stock") ?? 0),
                    regPrice: +(formData.get("Reg-price") ?? 0),
                    salePrice: +(formData.get("Sale-price") ?? 0),
                    cover: coverUrl.length > 0 ? coverUrl[0] : "",
                    gallery: imageUrls,
                    chips,
                }
            )
            router.push("/admin/products")
          return { success: "Product added successfully" };
        } catch (error: any) {
            alert(error.message)
          return { error: error.message || "Adding Product failed" };
        }
      }

    const [state, formAction] = React.useActionState<ProductState, FormData>(productAction, {});
    const handleChange = (newChips:string[]) => {
        setChips(newChips)
      }
    return (
        <section className="bg-gray-200 p-4 !w-full">
        <section>
            <h1 className="text-2xl">
                Add Product
            </h1>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Add Product</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </section>
        <section className="rounded-xl w-full">
            <form action={formAction} className="grid grid-cols-2 gap-5" >
                <div>
                    <div className="mb-4">
                        <Label htmlFor="name">Product Name</Label>
                        <Input type="text" defaultValue={payload.name} id="name" name="name" required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" defaultValue={payload.description} name="description" required></Textarea>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="additional">Additional</Label>
                        <Textarea id="additional" name="additional" required></Textarea>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="specification">Specification</Label>
                        <Textarea defaultValue={payload.specification ?? undefined} id="specification" name="specification" required></Textarea>
                    </div>
                    
                    <div>
                        <Label className="block my-1" htmlFor="category">Category</Label>
                        <CategoryBox value={categoryValue} setValue={setCategory} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input type="text" id="brand-name" defaultValue={payload.brand} name="brand" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4">
                            <Label htmlFor="sku">SKU</Label>
                            <Input type="number" defaultValue={payload.sku} id="sku" name="sku" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input type="number" defaultValue={payload.stock} id="stock" name="stock" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Reg-price">Regular Price</Label>
                            <Input type="number" defaultValue={payload.regPrice} id="Reg-price" name="Reg-price" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Sale-price">Sale Price</Label>
                            <Input type="number" defaultValue={payload.salePrice} id="sale-price" name="Sale-price" required />
                        </div>
                    </div>
                    <div className="w-full">
                        <MuiChipsInput className="!w-full" value={chips} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    {/* <Image src={"/"} width={200} height={200} alt="Cover Image" /> */}
                    <h2 className="text-xl">
                        Cover Image
                    </h2>
                    <FileUpload imageUrls={coverUrl} setUrls={setCover} maxFiles={1} id="coverImage" />
                    
                    <div>
                        <h2 className="text-xl">
                            Product Gallery
                        </h2>
                        <FileUpload imageUrls={imageUrls} setUrls={setUrls} maxFiles={100} id="GallerryUpload" />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Button type="submit" className="bg-my_green w-full text-white p-4 rounded-md text-sm">
                        Save
                    </Button>
                </div>
            </form>
        </section>
        </section>
    )
}

export default EditProduct;