import Image from "next/image";
import SideBar from "./sideBar";

import logo from "@/components/assets/Logo.webp"
import SearchBar from "./searchBar";
import SignUpBox from "./signUpBox";
import CartBox from "./cartBox";
import SmallBar from "./smallBar";
import Link from "next/link";
const Header = () => {
    return (
        <header>
            <nav className="flex container mx-auto justify-between px-4 pt-5 items-center m-auto ">
                <SideBar />
                <Link href={"/"} className="brand">
                    <Image
                        src={logo}
                        alt="Plaza Du Dollar"
                        // width={100}
                        height={80}
                    />
                </Link>
                <SearchBar />
                <div className="divide-x divide-gray-400 flex justify-evenly gap-2">
                    <SignUpBox />
                    <Link href="/cart" className="pl-2">
                        <CartBox />
                    </Link>
                </div>
            </nav>
            <SmallBar />
        </header>
    )
}

export default Header;