"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
const LoginPage = () => {
  const heading = "Login";
  const subheading = "Welcome back";
  const logo = {
    url: "/",
    src: "https://res.cloudinary.com/dnfahcxo3/image/upload/v1745082558/9c2d1352-17cf-40b9-b71d-f6f2393ec6a0.png",
    alt: "Shadcnblocks",
  };
  const loginText = "Log in";
  const googleText = "Log in with Google";
  const signupText = "Don't have an account?";
  const signupUrl = "/signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitUserData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/app/api/users.php",
        {
          email,
          password,
        }
      );
      if (response.data.session_id) {
        localStorage.setItem("session_id", response.data.session_id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto bg-background w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <Link href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="max-h-20" alt={logo.alt} />
              </Link>
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div>
              <form onSubmit={handleSubmitUserData}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      value={password}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-muted-foreground"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password
                    </Link>
                  </div>
                  <Button type="submit" className="mt-2 cursor-pointer w-full">
                    {loginText}
                  </Button>
                  <Button variant="outline" className="w-full cursor-pointer">
                    <FcGoogle className="mr-2 size-5" />
                    {googleText}
                  </Button>
                </div>
              </form>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>{signupText}</p>
                <Link href={signupUrl} className="font-medium text-primary">
                  {signupText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
