import { Button } from "@/components/ui/button"
import Image from "next/image"
import ham from "./assets/ham.svg"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
const SideBar = () => {
    return (
        <Sheet>
        <SheetTrigger className="rounded-xl bg-gray-100 p-4"><Image src={ham} alt="Menu"></Image></SheetTrigger>
        <SheetContent side={"left"}>
            <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
    )
}

export default SideBar;