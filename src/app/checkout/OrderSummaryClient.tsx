'use client'
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { account, databases } from "@/app/appwrite";
import { getCartItemsByCustomerId } from "@/lib/getCartItem";
import type { Cart } from "@/types";

const OrderSummaryClient = () => {
    const [items, setItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const user = await account.get();
            const cartItems = await getCartItemsByCustomerId(user.$id);
            setItems(cartItems);
        } catch (e) {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        const handler = () => fetchCart();
        window.addEventListener('cart:changed', handler as EventListener);
        return () => window.removeEventListener('cart:changed', handler as EventListener);
    }, [fetchCart]);

    const subtotal = useMemo(() => {
        return items.reduce((sum, it) => {
            const unit = (it.product.salePrice ?? it.product.price) || 0;
            return sum + unit * (it.quantity || 0);
        }, 0);
    }, [items]);

    const shipping = 0; // Adjust as needed
    const tax = Math.round(subtotal * 0.15 * 100) / 100; // Adjust tax rate as needed
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;

    if (loading) {
        return <div className="py-4">Loading...</div>;
    }

    return (
        <>
            <div>
                <ul>
                    {items.map((it) => {
                        const img = it.product.cover?.url || it.product.gallery?.[0]?.url || "";
                        const unit = (it.product.salePrice ?? it.product.price) || 0;
                        return (
                            <li key={it.$id} className="flex p-2">
                                <Image width={40} height={40} alt={it.product.name} src={img} />
                                <div className="">
                                    <h4>{it.product.name}</h4>
                                    <div>
                                        <span className="text-gray-400">x {it.quantity}</span>
                                        <span className="mx-2 font-bold text-blue-400">${unit}</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="border-t-2 border-gray-200 p-4">
                <div className="flex justify-between items-center">
                    <h3>Subtotal</h3>
                    <span className="text-gray-400">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                    <h3>Shipping</h3>
                    <span className="text-gray-400">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between items-center">
                    <h3>Tax</h3>
                    <span className="text-gray-400">${tax}</span>
                </div>
            </div>
            <div className="border-t-2 border-gray-200 p-4">
                <h3 className="inline">Total</h3>
                <span className="text-lg float-right font-bold text-gray-800">${total}</span>
            </div>
        </>
    );
}

export default OrderSummaryClient;


