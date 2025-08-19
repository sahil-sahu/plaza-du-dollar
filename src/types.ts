import { Models } from "node-appwrite";

export interface imgObj {
    name: string;
    url : string;
    id: string;
}
export interface categoryObj extends Models.Document {
    name: string;
    image_url : string;
    image_id: string;
    showOnLanding?: boolean;
    showExpanded?: boolean;
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

export interface Offer extends Models.Document {
    image: imgObj;
    offerName: string;
    showOnLanding?: boolean;
    showOnHero?: boolean;
    products: Product[];
}

export interface Cart extends Models.Document {
    customer_id: string;
    product: Product;
    quantity: number;
}