"use client"
import Image from 'next/image';
import profile from './assets/Profile.svg'
import Link from 'next/link';
import { account } from '@/app/appwrite';
import { useLayoutEffect, useState } from 'react';

const SignUpBox = () =>{
    const [logged, setLogin] = useState<string|undefined>();
    useLayoutEffect(()=>{
        const fetchUser = async () => {
            try {
                const user = await account.get();
                if (user) {
                    setLogin(user.$id);
                }
            } catch {
                // User not logged in
                return;
            }
        };
        fetchUser();
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