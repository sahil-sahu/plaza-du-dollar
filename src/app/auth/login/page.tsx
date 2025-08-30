"use client";

import Image from "next/image";
import plaza_img from "../plaza_blue.png";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { account } from "@/app/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppwriteException } from "appwrite";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      await account.createEmailPasswordSession(email, password);
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof AppwriteException) {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-3 h-screen justify-stretch">
      <div className="bg-my_green flex justify-center h-full items-center col-span-2">
        <Image className="brightness-[20%] scale-75" src={plaza_img} alt="" />
      </div>
      <div className="flex flex-col justify-center gap-4 h-full items-center p-12">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="text-2xl font-bold">Login</h1>
          <span className="text-xs text-gray-400">
            Forgot your password?{' '}
            <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
              Reset it here
            </Link>
          </span>
          
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}