import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import useEmblaCarousel from "embla-carousel-react";
interface RegisterPageProps {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
  };
  loginText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}
const Register = ({
  heading = "Register",
  logo = {
    url: "/",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "Shadcnblocks",
  },
  loginText = "You already have account?",
  googleText = "Log in with Google",
  signupText = "Submit",
  signupUrl = "/signup",
}: RegisterPageProps) => {
  
    useEffect(()=>{
        
    })
   
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto bg-background w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <Link href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              </Link>
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
            </div>
            <div>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="mt-2 w-full">
                  {signupText}
                </Button>
                <Link href="#" className="text-sm text-center text-primary hover:underline">
                  {loginText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
