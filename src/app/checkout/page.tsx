"use client"
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
import OrderSummaryClient from "@/app/checkout/OrderSummaryClient"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const CheckoutSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    company: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "Region/State is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(4, "ZIP/Postal code is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone is required"),
    shipToThis: z.boolean(),
    paymentMethod: z.enum(["cod", "paypal", "square"]).refine(
        (val) => val !== undefined,
        { message: "Payment method is required" }
      ),
    notes: z.string().optional(),
});

const CheckoutPage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof CheckoutSchema>>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            company: "",
            address: "",
            country: "",
            state: "",
            city: "",
            zip: "",
            email: "",
            phone: "",
            shipToThis: false,
            paymentMethod: "paypal",
            notes: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CheckoutSchema>) => {
        console.log("Checkout submit", values);
    };

    return (
        <>
        <Header />
        <section className="grid grid-cols-3 p-4 gap-4">
            <div className="col-span-2 bg-green-100">
                <h2>
                    Billing Information
                </h2>
                <form id="checkoutForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-4 ">
                        <div>
                            <Label htmlFor="firstName">User name</Label>
                            <Input id="firstName" placeholder="First Name" {...register("firstName")} />
                            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Last Name" {...register("lastName")} />
                            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="company">Company Name <span className="text-gray-400">(Optional)</span></Label>
                            <Input id="company" {...register("company")} />
                        </div>
                        <div className="col-span-4">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" placeholder="" {...register("address")} />
                            {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select.." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
                        </div>
                        <div>
                            <Label>Region/State</Label>
                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select.." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Quebec">Quebec</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.state && <p className="text-red-600 text-sm">{errors.state.message}</p>}
                        </div>
                        <div>
                            <Label>City</Label>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select.." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {quebecCities.map((city) => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="zip">Zip Code</Label>
                            <Input id="zip" placeholder="" {...register("zip")} />
                            {errors.zip && <p className="text-red-600 text-sm">{errors.zip.message}</p>}
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="" type="email" {...register("email")} />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="" {...register("phone")} />
                            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
                        </div>
                        <div className="col-span-4">
                            <Controller
                                name="shipToThis"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Checkbox id="shiptothis" checked={!!field.value} onCheckedChange={(checked) => field.onChange(!!checked)} />
                                        <label
                                            htmlFor="shiptothis"
                                            className="text-sm font-medium leading-none p-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Ship to this Address
                                        </label>
                                    </>
                                )}
                            />
                        </div>
                        <div className="col-span-4 border text-lg bg-white">
                            <h2 className="border-b bg-white p-4">Payment Option</h2>
                            <div className="w-full p-2">
                                <Controller
                                    name="paymentMethod"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup value={field.value} onValueChange={field.onChange} className=" bg-white flex justify-evenly">
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
                                    )}
                                />
                                {errors.paymentMethod && <p className="text-red-600 text-sm">{errors.paymentMethod.message}</p>}
                            </div>
                        </div>
                        <div className="col-span-4">
                            <h2>
                                Additional Information
                            </h2>
                            <Label htmlFor="notes">Order Notes <span className="text-gray-400">(optional)</span></Label>
                            <Textarea placeholder="" id="notes" {...register("notes")} />
                        </div>
                    </div>
                </form>  
            </div>
            <div className="bg-green-50 p-4">
                <h2 className="text-lg font-bold">
                    Order Summary
                </h2>
                <OrderSummaryClient />
                <div className="flex justify-end gap-4 w-full">
                    <button form="checkoutForm" type="submit" className="bg-my_green w-full text-white p-4 rounded-md text-sm font-medium">
                        PLACE ORDER
                    </button>
                </div>                
            </div>
        </section>
        </>
    )
}

export default CheckoutPage