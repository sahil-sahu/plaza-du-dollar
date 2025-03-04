import { Button } from "@/components/ui/button"
import Image from "next/image"
import ham from "./assets/ham.svg"

const SideBar = () => {
    return (
    <Button variant="secondary">
        <Image src={ham} alt="Menu"></Image>
    </Button>
    )
}

export default SideBar;