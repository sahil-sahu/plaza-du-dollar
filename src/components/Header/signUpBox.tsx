"use client"
import Image from 'next/image';
import profile from './assets/Profile.svg'
import Link from 'next/link';
import { account } from '@/app/appwrite';
import { useEffect, useState } from 'react';

const SignUpBox = () =>{
    const [logged, setLogin] = useState<string|undefined>();
    useEffect(()=>{
        const check = async () => {
            try {
                const user = await account.getSession('current');
                if (user && user.$id) {
                    // User is logged in
                    setLogin(user.$id);
                }

            } catch (error) {
                // console.log("Error fetching user info:", error);
                return;
            }
        }
        check();
    },[])
    if(logged != undefined){
        return (
        <Link href={"#"} onClick={()=>{
            account.deleteSession('current');
            setLogin(undefined);
        }} className='rounded flex items-center gap-2'>
            <Image src={profile} alt='Search' />
            <div>
                Sign Out
            </div>
        </Link>
        )
    }
    return (
        <Link href={"/auth/login"} className='rounded flex items-center gap-2'>
            <Image src={profile} alt='Search' />
            <div>
                Sign Up/Sign In
            </div>
        </Link>
    )
}

export default SignUpBox;