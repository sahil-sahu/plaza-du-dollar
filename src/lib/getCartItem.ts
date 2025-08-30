import { tablesDB } from "@/app/appwrite";
import { Cart } from "@/types";
import { Query } from "appwrite";
import { Models } from "appwrite";

// Fetch cart items for a given customer_id
export async function getCartItemsByCustomerId(customerId: string): Promise<(Cart & Models.DefaultRow)[]> {
	try {
		const { rows:documents } = await tablesDB.listRows(
			"67b8c653002efe0cdbb2",
			"cart",
			[
				Query.equal("customer_id", customerId),
				Query.select(["*", "product.*", "product.cover.*", "product.cover.url", "product.gallery.*", "product.gallery.url"]),
			]
		);
        // console.log(documents);
		return documents as (Cart & Models.DefaultRow)[];
	} catch (error) {
		console.error("Error fetching cart items:", error);
		return [];
	}
}

//