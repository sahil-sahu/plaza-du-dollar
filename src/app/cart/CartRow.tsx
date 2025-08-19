import Image from "next/image";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { QuantityFiller_small } from "@/components/quantityFiller";
import { databases } from "@/app/appwrite";
import { Cart } from "@/types";

interface CartRowProps {
	item: Cart;
	onChanged?: () => void | Promise<void>;
}

const CartRow = ({ item, onChanged }: CartRowProps) => {
    // console.log(item);
	const product = item.product;
	const quantity = item.quantity;
	const unitPrice = product.salePrice ?? product.price;
	const subtotal = unitPrice * quantity;
	const imageUrl = product.cover?.url || product.gallery?.[0]?.url || "";
    
	const handleQuantityChange = async (next: number) => {
		// fetch latest for safety (find by customer_id+product)
		

		if (next <= 0) {
			await databases.deleteDocument("67b8c653002efe0cdbb2", "cart", item.$id);
			await onChanged?.();
			return;
		}
		await databases.updateDocument(
			"67b8c653002efe0cdbb2",
			"cart",
			item.$id,
			{ quantity: next }
		);
		await onChanged?.();
	};

	return (
		<tr className="py-4">
			<td>
				<div  className="justify-evenly items-center flex">
					<CirclePlus onClick={async ()=>{
					await databases.deleteDocument("67b8c653002efe0cdbb2", "cart", item.$id);
					await onChanged?.();
				}} className="rotate-45 cursor-pointer text-gray-400 hover:text-red-700" />
					<Link href={`/product/${product.$id}`}>
						<Image width={50} height={50} alt={product.name} src={imageUrl} className="cursor-pointer" />
					</Link>
				</div>
			</td>
			<td>
				<Link href={`/product/${product.$id}`} className="hover:underline">{product.name}</Link>
			</td>
			<td className="text-center">
				${unitPrice}
			</td>
			<td className="text-center">
				<QuantityFiller_small value={quantity} onChange={handleQuantityChange} />
			</td>
			<td className="text-center">
				${subtotal}
			</td>
		</tr>
	);
};

export default CartRow;


