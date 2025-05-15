"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import useEmblaCarousel from "embla-carousel-react";
import { UsersRegister } from "@/lib/types";
import { log } from "console";
import axios from "axios";

const Register = () => {
 const heading = "Register";
 const logo = {
    url: "/",
    src: "https://res.cloudinary.com/dnfahcxo3/image/upload/v1745082558/9c2d1352-17cf-40b9-b71d-f6f2393ec6a0.png",
    alt: "Keystone Logo",
  };
 const loginText = "You already have account?";
 const googleText = "Log in with Google";
 const signupText = "Submit";
 const loginUrl = '/login';

 const [form, setForm] = useState<UsersRegister>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const handlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/app/api/users.php",form);

      // Axios puts response data in response.data
      console.log("Registration successful:", response.data);
      // You can redirect or show a success message here
    } catch (error: any) {
      // Handle error (e.g., show error message)
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      // Optionally show error to user
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto bg-background w-[50rem] rounded-md p-[30px_50px_50px_50px] shadow">
            <div className="mb-6 flex flex-col items-center">
              <Link href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="w-[100px]" alt={logo.alt} />
              </Link>
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
            </div>
            <div className="flex justify-between flex-row items-center gap-[30px]">
              <form
                onSubmit={HandleSubmit}
                className="gap-4 flex flex-col w-[50%]"
              >
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    onChange={handlChange}
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handlChange}
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handlChange}
                    type="tel"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    value={form.password}
                    onChange={handlChange}
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="mt-2 w-full">
                  {signupText}
                </Button>
                <Link
                  href={loginUrl}
                  className="text-sm  text-center text-primary hover:underline"
                >
                  {loginText}
                </Link>
              </form>

              <h1 className="font-monospace flex justify-center items-center flex-col font-bold text-[20px] before:content-[''] before:w-[2px] before:h-[150px] before:bg-black before:block after:content-[''] after:w-[2px] after:h-[150px] after:bg-black after:block">
                <span className="flex justify-center "> Or</span>
              </h1>

              <div className="w-[50%]  gap-4 ">
                <a
                  href="#"
                  className="flex gap-[20px] items-center border rounded-[10px] p-[10px_30px]"
                >
                  <FcGoogle /> {googleText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
