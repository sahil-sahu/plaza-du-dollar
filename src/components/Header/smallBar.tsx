"use client"

import { Headset, Info, MapPin, PhoneOutgoing } from "lucide-react";
import TakeAwayToggle from "./takeAwayToggle"
import { usePathname } from 'next/navigation'
const SmallBar = () => {
    const pathname = usePathname();
    if(pathname.length > 1){
        return (
            <nav className="w-full bg-[#E7F6EF]">
                <div className="container m-auto p-4 text-gray-600 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4 text-gray-600">
                        <div>
                            <MapPin className="inline" />&nbsp; Track Order
                        </div>
                        <div>
                            <Headset className="inline" />&nbsp; Customer Suport
                        </div>
                        <div>
                            <Info className="inline" />&nbsp; Need Help
                        </div>
                    </div>
                    <div>
                        <PhoneOutgoing className="inline" />&nbsp;+1-222-555-3000
                    </div>
                </div>
            </nav>
        )
    }
    return (
        <nav className="w-full bg-[#E7F6EF]">
            <div className="container m-auto p-4 ">
                <TakeAwayToggle />
            </div>
        </nav>
    )
}

export default SmallBar;