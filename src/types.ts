import { Models } from "node-appwrite";
import {Models as AppwriteModels} from "appwrite";
export interface imgObj {
    name: string;
    url : string;
    id: string;
}
export interface categoryObj extends Models.Document, AppwriteModels.DefaultRow {
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

export interface Product extends Models.Document, AppwriteModels.DefaultRow {
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

export interface Offer extends Models.Document, AppwriteModels.DefaultRow {
    image: imgObj;
    offerName: string;
    showOnLanding?: boolean;
    showOnHero?: boolean;
    products: Product[];
}

export interface Cart extends Models.Document, AppwriteModels.DefaultRow {
    customer_id: string;
    product: Product;
    quantity: number;
}

export interface Order extends Models.Document, AppwriteModels.DefaultRow {
    total: number;
    paymentMethod: string;
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    // Add any other order-related fields as needed
}