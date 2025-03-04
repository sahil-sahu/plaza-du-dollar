import logo from "@/components/assets/Logo.webp"
import Image from "next/image";
import whatsapp from"./whatsapp.svg"
import call from "./Call.svg"
const Footer = () => {
    return (
        <footer className="bg-[#212844] p-10 pb-1 text-white">
            <div className="container gap-3 m-auto grid md:grid-cols-2 lg:grid-cols-3">
                <div className="text-sm">
                    <div className="brand">
                        <Image
                            src={logo}
                            alt="Plaza Du Dollar"
                            // width={100}
                            className="inline mx-1"
                            height={60}
                        />
                    </div>
                    <ul className="flex  flex-col gap-4">
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                <div className="inline mx-1">
                                    <Image className="inline" src={whatsapp} alt=""></Image>
                                </div>
                                <span>
                                    WhatsApp
                                </span>
                                <div>
                                    +1 202-918-2132
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                <div className="inline">
                                    <Image className="inline" src={call} alt=""></Image>
                                </div>
                                <span>
                                    Call Us
                                </span>
                                <div>
                                    +1 202-918-2132
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-white py-2 font-bold border-white border-b-2">
                        Most Popular Categories
                    </h2>
                    <ul className="list-disc text-sm pl-5 py-2">
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Electronics
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Clothing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Home & Garden
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Furniture
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Books
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-white font-bold border-white py-2 border-b-2">
                        Customer Service
                    </h2>
                    <ul className="list-disc text-sm pl-5 py-2">
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Returns & Exchanges
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:text-gray-300">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="flex justify-evenly p-5 text-sm">
                &copy; 2025 Plaza Du Dollar. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;