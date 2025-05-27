import { Models } from "node-appwrite";

export interface imgObj {
    name: string;
    url : string;
    id: string;
}
export interface categoryObj {
    name: string;
    image_url : string;
    image_id: string;
}
export interface productPayload {
    name:string;
    description: string;
    price: number;
    brand: number;
    sku: number;
    stock: number;
    regPrice: number;
    salePrice: number;
    cover: imgObj;
    gallery: imgObj;
    chips: string;
}

export interface Product extends Models.Document {
    name: string;
    description: string;
    price: number;
    brand: number;
    sku: number;
    stock: number;
    regPrice: number;
    salePrice: number;
    cover: imgObj;
    gallery: imgObj[];
    chips: string[];
    category: categoryObj|null;
    additional: string|null;
    specification: string|null;
}