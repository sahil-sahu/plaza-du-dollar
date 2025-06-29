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
import CategoryBox from "./categoryBox"
import React from 'react'
import { MuiChipsInput } from 'mui-chips-input'
import Image from "next/image"
import FileUpload from "./fileUpload"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { imgObj, productPayload } from "@/types"
import { databases, ID } from "@/app/appwrite"
type ProductState = {
    error?: string;
    success?: string;
  };
const AddProduct = () => {
    const [chips, setChips] = React.useState<string[]>([])
    const [coverUrl, setCover] = React.useState<imgObj[]>([]);
    const [imageUrls, setUrls] = React.useState<imgObj[]>([]);
    const [categoryId, setCategoryId] = React.useState("")

    async function productAction(prevState: ProductState, formData: FormData): Promise<ProductState> {
        // if (!categoryId) {
        //     return { error: "Please select a category" };
        // }

        try {
            await databases.createDocument(
                '67b8c653002efe0cdbb2',
                'products',
                ID.unique(),
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
                    category: categoryId
                }
            )
            setCover([])
            setUrls([])
            setChips([])
            setCategoryId("")
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
                        <Input type="text" id="name" name="name" required />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" required></Textarea>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="additional">Additional</Label>
                        <Textarea id="additional" name="additional" required></Textarea>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="specification">Specification</Label>
                        <Textarea id="specification" name="specification" required></Textarea>
                    </div>
                    
                    <div>
                        <Label className="block my-1" htmlFor="category">Category</Label>
                        <CategoryBox value={categoryId} setValue={setCategoryId} />
                        {state.error && state.error.includes("category") && (
                            <p className="text-red-500 text-sm mt-1">{state.error}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input type="text" id="brand-name" name="brand" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4">
                            <Label htmlFor="sku">SKU</Label>
                            <Input type="number" id="sku" name="sku" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input type="number" id="stock" name="stock" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Reg-price">Regular Price</Label>
                            <Input type="number" id="Reg-price" name="Reg-price" required />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="Sale-price">Sale Price</Label>
                            <Input type="number" id="sale-price" name="Sale-price" required />
                        </div>
                    </div>
                    <div className="w-full">
                        <MuiChipsInput className="!w-full" value={chips} onChange={handleChange} />
                    </div>
                </div>
                <div>
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

export default AddProduct