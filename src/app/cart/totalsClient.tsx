'use client'
import { useCallback, useEffect, useMemo, useState } from "react";
import { account } from "@/app/appwrite";
import { getCartItemsByCustomerId } from "@/lib/getCartItem";
import type { Cart } from "@/types";

const TotalsClient = () => {
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

    const shipping = 0;
    const discount = 0;
    const tax = Math.round(subtotal * 0.00 * 100) / 100;
    const total = Math.round((subtotal + shipping - discount + tax) * 100) / 100;

    if (loading) {
        return (
            <div className="py-4">Calculating...</div>
        );
    }

    return (
        <>
            <ul className="sumTotal">
                <li>
                    <div>
                        Sub-total
                    </div>
                    <div>
                        ${subtotal}
                    </div>
                </li>
                <li>
                    <div>
                        Shipping
                    </div>
                    <div>
                        {shipping === 0 ? 'Free' : `$${shipping}`}
                    </div>
                </li>
                <li>
                    <div>
                        Discount
                    </div>
                    <div>
                        ${discount}
                    </div>
                </li>
                <li>
                    <div>
                        Tax
                    </div>
                    <div>
                        ${tax}
                    </div>
                </li>
            </ul>
            <div className="border-t border-t-gray-400 flex justify-between p-4">
                <div>
                    Total
                </div>
                <div>
                    ${total}USD
                </div>
            </div>
        </>
    );
}

export default TotalsClient;


