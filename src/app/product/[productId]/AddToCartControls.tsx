'use client'
import { useState, useCallback } from "react";
import { Cart, Product } from "@/types";
import QuantityFiller from "@/components/quantityFiller";
import { ShoppingCart } from "lucide-react";
import { account, databases, ID } from "@/app/appwrite";
import { Permission, Query, Role } from "appwrite";

interface AddToCartControlsProps {
	product: Product;
}

const AddToCartControls = ({ product }: AddToCartControlsProps) => {
	const [qty, setQty] = useState<number>(1);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [toast, setToast] = useState<string | null>(null);

	const addToCart = useCallback(async () => {
		try {
			setSubmitting(true);
			const user = await account.get();
			// account.session
			// account.sessio
			console.log(user.$id);
			// find existing cart item for this product + customer
			const { documents } = await databases.listDocuments(
				"67b8c653002efe0cdbb2",
				"cart",
				[
					Query.equal("customer_id", user.$id),
					Query.equal("product", product.$id)
				]
			);
			console.log(documents);
			const existing = documents.length > 0 ? documents[0] as Cart : undefined;
			if (existing) {
				const nextQty = (existing.quantity || 0) + qty;
				if (nextQty <= 0) {
					await databases.deleteDocument("67b8c653002efe0cdbb2", "cart", existing.$id);
				} else {
					await databases.updateDocument(
						"67b8c653002efe0cdbb2",
						"cart",
						existing.$id,
						{ quantity: nextQty }
					);
				}
			} else {
				if (qty > 0) {
					await databases.createDocument(
						'67b8c653002efe0cdbb2',
						'cart',
						ID.unique(),
						{
							customer_id: user.$id,
							product: product.$id,
							quantity: qty
						},
						[
							// 'user:' + user.$id,
							// Permission.read(Role.label("admin")),
							Permission.read(Role.user(user.$id)),
							Permission.update(Role.user(user.$id)),
							Permission.delete(Role.user(user.$id)),

							// Permission.write(Role.label("admin"))
						]

					);
				}
			}
			// Toast success
			setToast('Added to cart');
			setTimeout(() => setToast(null), 2000);
		} finally {
			setSubmitting(false);
		}
	}, [product, qty]);

	const buyNow = useCallback(async () => {
		await addToCart();
		// Optionally navigate to checkout
		// router.push('/checkout')
	}, [addToCart]);

	return (
		<div className="text-lg flex justify-stretch gap-4">
			<QuantityFiller value={qty} onChange={setQty} min={1} max={product.stock} />
			<button
				type="button"
				disabled={submitting}
				className="flex-[30%] text-white text-lg bg-my_green flex items-center gap-4 justify-center p-5"
				onClick={addToCart}
			>
				<span>ADD TO CART</span>
				<ShoppingCart />
			</button>
			<button
				type="button"
				disabled={submitting}
				className="w-full flex-1 text-my_green border-2 text-center border-my_green p-5"
				onClick={buyNow}
			>
				BUY NOW
			</button>
			{toast && (
				<div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow-lg z-50">
					{toast}
				</div>
			)}
		</div>
	);
};

export default AddToCartControls;


