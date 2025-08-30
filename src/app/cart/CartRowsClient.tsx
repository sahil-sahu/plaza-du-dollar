'use client'
import { useCallback, useEffect, useState } from "react";
import { account } from "@/app/appwrite";
import type { Cart } from "@/types";
import CartRow from "./CartRow";
import { getCartItemsByCustomerId } from "@/lib/getCartItem";
import { Models } from "appwrite";

const CartRowsClient = () => {
	const [items, setItems] = useState<(Cart & Models.DefaultRow)[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchCart = useCallback(async () => {
		try {
			setLoading(true);
			const user = await account.get();
			const cartItems = await getCartItemsByCustomerId(user.$id);
			setItems(cartItems);
			// notify others (e.g., totals) that cart has changed
			if (typeof window !== 'undefined') {
				window.dispatchEvent(new CustomEvent('cart:changed'));
			}
		} catch (error) {
			console.error("Failed to load cart items", error);
			setItems([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	return (
		<>
			<tr className="h-4"></tr>
			{loading ? (
				<tr>
					<td colSpan={5} className="text-center py-6">Loading...</td>
				</tr>
			) : items.length === 0 ? (
				<tr>
					<td colSpan={5} className="text-center py-6">Your cart is empty</td>
				</tr>
			) : (
				items.map((item) => (
					<CartRow key={item.$id} item={item} onChanged={fetchCart} />
				))
			)}
			<tr className="h-4"></tr>
		</>
	);
};

export default CartRowsClient;


