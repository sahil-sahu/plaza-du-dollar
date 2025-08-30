"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import plaza_img from "../plaza_blue.png"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import {  ArrowRight } from "lucide-react";
import Link from "next/link";
import { account, ID } from "@/app/appwrite";
import { useActionState } from 'react';
import { AppwriteException } from 'appwrite';
type LoginState = {
    error?: string;
    success?: string;
  };

async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
  
    if (!email || !password || !name) {
      return { error: "All fields are required" };
    }
    try {
        await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password)
        setTimeout(() => {
            console.log("going to home");
            redirect('/');
          },10)
      return { success: "Regsitartion successful" };
    } catch (error: unknown) {
        if(error instanceof AppwriteException){
            return { error: error.message };
        }
        return { error: "Registeration failed" };
    }
  }  
const Register = () => {
    const formAction = useActionState<LoginState, FormData>(loginAction, {})[1];
    return (
        <section className="grid grid-cols-3 h-screen justify-stretch">
            <div className="bg-my_green flex justify-center h-full items-center col-span-2">
                <Image className="brightness-[20%] scale-75" src={plaza_img} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-4 h-full items-center p-12">
                <h1 className="text-3xl font-bold text-left w-full">
                    Register
                </h1>
                <form action={formAction} className="w-full">
                    <h3 className="text-xl font-bold">
                        Your Name
                    </h3>
                    <Input className="my-2" type="text" name="name" placeholder="Full Name" />
                    <h3 className="text-xl font-bold">
                        Login Details
                    </h3>
                    <Input className="my-2" name="email" type="email" placeholder="Email" />
                    <Input className="my-2" name="password" type="password" placeholder="Password" />
                    <div className="flex items-center space-x-2 my-4">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            By clicking &apos;Log In&apos; you agree to our website Terms & Conditions.
                        </label>
                    </div>
                    <button type="submit" className="bg-my_green w-full p-3 text-left text-white text-xs rounded flex justify-between items-center"><span>REGISTER</span> <ArrowRight className="inline float-right" width={15} /></button>
                </form>
                <Link href="/auth/login" className="underline w-full text-sm">
                    Already have account login here
                </Link>
            </div>
        </section>
    )
}

export default Register;