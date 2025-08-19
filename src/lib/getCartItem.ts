import { databases } from "@/app/appwrite";
import { Cart } from "@/types";
import { Query } from "appwrite";


// Fetch cart items for a given customer_id
export async function getCartItemsByCustomerId(customerId: string): Promise<Cart[]> {
	try {
		const { documents } = await databases.listDocuments(
			"67b8c653002efe0cdbb2",
			"cart",
			[
				Query.equal("customer_id", customerId)
			]
		);
        console.log(documents);
		return documents as Cart[];
	} catch (error) {
		console.error("Error fetching cart items:", error);
		return [];
	}
}

//