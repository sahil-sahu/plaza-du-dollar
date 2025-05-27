"use client"

import Image from "next/image";
import plaza_img from "../plaza_blue.png"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { useActionState, useEffect } from "react";
import {  ArrowRight } from "lucide-react";
import Link from "next/link";
import { account } from "@/app/appwrite";
import { redirect } from "next/navigation";
type LoginState = {
    error?: string;
    success?: string;
  };
  
  
  const Login = () => {
    async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
      
        if (!email || !password) {
          return { error: "Both fields are required" };
        }
        // console.log(password)
        try {
          // console.log(await account.createEmailPasswordSession(email, password));
          await account.createEmailPasswordSession(email, password);
          setTimeout(() => {
            console.log("going to home");
            redirect('/');
          },10)
          return { success: "Login successful" };
        } catch (error: any) {
          return { error: error.message || "Login failed" };
        }
      }
    const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {});
    // console.log(state)
    return (
        <section className="grid grid-cols-3 h-screen justify-stretch">
            <div className="bg-my_green flex justify-center h-full items-center col-span-2">
                <Image className="brightness-[20%] scale-75" src={plaza_img} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-4 h-full items-center p-12">
                <form action={formAction} className="w-full">
                    <h1 className="text-2xl font-bold">
                        Login
                    </h1>
                    <span className="text-xs text-gray-400">
                        Forgot your password?
                    </span>
                    <Input className="my-2" name="email" type="email" placeholder="Email" />
                    <Input className="my-2" name="password" type="password" placeholder="Password" />
                    <button type="submit" className="bg-my_green w-full p-3 text-left text-white text-xs rounded flex justify-between items-center"><span>EMAIL LOGIN</span> <ArrowRight className="inline float-right" width={15} /></button>
                </form>
                <Link href="/auth/register" className="underline w-full text-sm">
                    Don't have a account register here
                </Link>
            </div>
        </section>
    )
}

export default Login;