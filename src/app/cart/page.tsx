import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import { QuantityFiller_small } from "@/components/quantityFiller";
import { ArrowRight, CirclePlus } from "lucide-react";
import Image from "next/image";
import "./main.css"
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
                        <tr className="h-4"></tr>
                        <tr className="py-4">
                            <td>
                                <div className="justify-evenly items-center flex">
                                    <CirclePlus className="rotate-45 text-gray-400 hover:text-red-700" />
                                    <Image width={50} height={50} alt="" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/496996a.jpg?ts=1690814374" />
                                </div>
                            </td>
                            <td>
                                Kushies Bowl and Spoon Set Pink Silicone 4in Bowl
                            </td>
                            <td className="text-center">
                                $5
                            </td>
                            <td className="text-center">
                                <QuantityFiller_small />
                            </td>
                            <td className="text-center">
                                $5
                            </td>
                        </tr>
                        <tr className="h-4"></tr>
                    </tbody>
                    {/* <br /> */}
                </table>
            </div>
            <div className="bg-[#E7F6EF] p-4 h-fit">
                <h2 className="font-bold">
                    Cart Totals
                </h2>
                <ul className="sumTotal">
                    <li>
                        <div>
                            Sub-total
                        </div>
                        <div>
                            $8
                        </div>
                    </li>
                    <li>
                        <div>
                            Shipping
                        </div>
                        <div>
                            Free
                        </div>
                    </li>
                    <li>
                        <div>
                            Discount
                        </div>
                        <div>
                            $0
                        </div>
                    </li>
                    <li>
                        <div>
                            Tax
                        </div>
                        <div>
                            $8.5
                        </div>
                    </li>
                </ul>
                <div className="border-t border-t-gray-400 flex justify-between p-4">
                    <div>
                        Total
                    </div>
                    <div>
                        $8.5USD
                    </div>
                </div>
                <button className="w-full py-4 text-white bg-my_green uppercase">
                    Proceed to Checkout <ArrowRight className="inline" />
                </button>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Cart;