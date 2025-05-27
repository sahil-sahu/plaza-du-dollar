import Header from "@/components/Header/header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { quebecCities } from "@/dummyData"
import Image from "next/image"
import cod_img from "./icons/CurrencyDollar.png"
import paypal_img from "./icons/paypal.png"
import square_img from "./icons/square.svg"
import { Textarea } from "@/components/ui/textarea"

const CheckoutPage = () => {
    return (
        <>
        <Header />
        <section className="grid grid-cols-3 p-4 gap-4">
            <div className="col-span-2 bg-green-100">
                <h2>
                    Billing Information
                </h2>
                <div className="grid grid-cols-4 gap-4 ">
                    <div>
                        <Label htmlFor="username">User name</Label>
                        <Input placeholder="First Name" />
                    </div>
                    <div>
                        <Label htmlFor="username">Last Name</Label>
                        <Input placeholder="Last Name" />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="">Company Name <span className="text-gray-400">(Optional)</span></Label>
                        <Input />
                    </div>
                    <div className="col-span-4">
                        <Label htmlFor="">Address</Label>
                        <Input placeholder="" />
                    </div>
                    <div>
                        <Label>Country</Label>
                        <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select.." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Canada">Canada</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                    <Label>Region/State</Label>
                        <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select.." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Quebec">Quebec</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>City</Label>
                        <Select>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select.." />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    quebecCities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Zip Code</Label>
                        <Input placeholder="" />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="">Email</Label>
                        <Input placeholder="" />
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="">Phone</Label>
                        <Input placeholder="" />
                    </div>           
                    <div className="col-span-4">
                        <Checkbox id="shiptothis" />
                        <label
                            htmlFor="shiptothis"
                            className="text-sm font-medium leading-none p-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Ship to this Address
                        </label>       
                    </div>
                    <div className="col-span-4 border text-lg bg-white">
                        <h2 className="border-b bg-white p-4">Payment Option</h2>
                        <div className="w-full p-2">
                        <RadioGroup defaultValue="paypal" className=" bg-white flex justify-evenly">
                            <div className="flex flex-col gap-2 justify-end items-center space-x-2">
                                <Label className="" htmlFor="cod">
                                    <Image className="m-auto" src={cod_img} alt="" />
                                    Pay on Delivery</Label>
                                <RadioGroupItem value="cod" id="cod" />
                            </div>
                            <div className="border-l  w-1 h-24"></div>
                            <div className="flex flex-col gap-2 justify-end items-center space-x-2">
                                <Label className="" htmlFor="paypal">
                                <Image className="m-auto" src={paypal_img} alt="" />
                                    Paypal</Label>
                                <RadioGroupItem value="paypal" id="paypal" />
                            </div>
                            <div className="border-l  w-1 h-24"></div>
                            <div className="flex flex-col gap-2 justify-end items-center space-x-2">
                                <Label className="" htmlFor="square">
                                    <Image className="m-auto" src={square_img} alt="" />
                                    Square
                                </Label>
                                <RadioGroupItem value="square" id="square" />
                            </div>
                        </RadioGroup>
                        </div>     
                    </div>  
                    <div className="col-span-4">
                        <h2>
                            Additional Information
                        </h2>
                        <Label htmlFor="notes">Order Notes <span className="text-gray-400">(optional)</span></Label>
                        <Textarea placeholder="" id="notes" />
                    </div>            
                </div>  
            </div>
            <div className="bg-green-50 p-4">
                <h2 className="text-lg font-bold">
                    Order Summary
                </h2>
                <div>
                    <ul>
                        <li className="flex p-2">
                            <Image width={40} height={40} alt="" src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/496996a.jpg?ts=1690814374" />
                            <div className="">
                                <h4>
                                    Kushies Bowl and Spoon Set Pink Silicone 4in Bowl
                                </h4>
                                <div>
                                <span className="text-gray-400">x 2</span>
                                <span className="mx-2 font-bold text-blue-400">$10.00</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
                <div className="border-t-2 border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                        <h3>
                            Subtotal
                        </h3>
                        <span className="text-gray-400">$20.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3>
                            Shipping
                        </h3>
                        <span className="text-gray-400">$5.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3>
                            Tax
                        </h3>
                        <span className="text-gray-400">$3.00</span>
                    </div>
                </div>
                <div className="border-t-2 border-gray-200 p-4">
                    <h3 className="inline">
                        Total
                    </h3>
                    <span className="text-lg float-right font-bold text-gray-800">$28.00</span>
                </div>
                <div className="flex justify-end gap-4 w-full">
                    <button className="bg-my_green w-full text-white p-4 rounded-md text-sm font-medium">
                        PLACE ORDER
                    </button>
                </div>                
            </div>
        </section>
        </>
    )
}

export default CheckoutPage