import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { QuantityFiller_small } from "@/components/quantityFiller";
import { tablesDB } from "@/app/appwrite";
import { Cart } from "@/types";
import { Models } from "appwrite";
import CartImg from "@/components/CartImg";
interface CartRowProps {
	item: Cart & Models.DefaultRow;
	onChanged?: () => void | Promise<void>;
}

const CartRow = ({ item, onChanged }: CartRowProps) => {
    // console.log(item);
	const product = item.product;
	const quantity = item.quantity;
	const unitPrice = product.salePrice ?? product.price;
	const subtotal = unitPrice * quantity;
	
	const handleQuantityChange = async (next: number) => {
		// fetch latest for safety (find by customer_id+product)
		

		if (next <= 0) {
			await tablesDB.deleteRow("67b8c653002efe0cdbb2", "cart", item.$id);
			await onChanged?.();
			return;
		}
		await tablesDB.updateRow(
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
					await tablesDB.deleteRow("67b8c653002efe0cdbb2", "cart", item.$id);
					await onChanged?.();
				}} className="rotate-45 cursor-pointer text-gray-400 hover:text-red-700" />
					<Link href={`/product/${product.$id}`}>
						<CartImg img={product.cover} />
					</Link>
				</div>
			</td>
			<td>
				<Link href={`/product/${product.$id}`} className="hover:underline "><div className="text-overflow-ellipsis max-w-[50vw] max-h-[20px] overflow-hidden">{product.name}</div></Link>
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


