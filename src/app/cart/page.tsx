import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { ArrowRight } from "lucide-react";
import "./main.css"
import CartRowsClient from "./CartRowsClient";
import TotalsClient from "./totalsClient";
import Link from "next/link";
const Cart = () => {

    return (
        <>
        <Header />
        <section className="container mx-auto grid grid-cols-4 gap-4 min-h-[70vh] p-5">
            <div className="col-span-3 w-full h-fit bg-[#E7F6EF] border-gray-300 border-2">
                <h2 className="text-lg font-bold p-2">
                    Shopping Card
                </h2>
                <table className="border-spacing-8 w-full">
                    <thead className="uppercase bg-my_green font-light">
                        <tr>
                            <th>Product</th>
                            <th></th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    
                    <tbody className="">
                        <CartRowsClient />
                    </tbody>
                    {/* <br /> */}
                </table>
            </div>
            <div className="bg-[#E7F6EF] p-4 h-fit">
                <h2 className="font-bold">
                    Cart Totals
                </h2>
                <TotalsClient />
                <Link href="/checkout">
                    <button className="w-full py-4 text-white bg-my_green uppercase">
                        Proceed to Checkout <ArrowRight className="inline" />
                    </button>
                </Link>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Cart;