'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useSupabase } from "@/components/supabase-provider";

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { supabase } = useSupabase();
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const logoImage = PlaceHolderImages.find(p => p.id === 'pyramid-logo-square');


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const fullName = formData.get("full-name") as string;
        const phone = formData.get("phone") as string;

        // Note: For phone auth, you need to configure an SMS provider in Supabase.
        // Here we are using Email/Password signup.
        
        if (!email || !password) {
             toast({
                title: "Error",
                description: "Email and Password are required for signup.",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                }
            }
        });

        setIsLoading(false);

        if (error) {
            toast({
                title: "Signup Failed",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Account Created",
                description: "Your account has been successfully created. Please check your email for verification.",
            });
            router.push("/login");
        }
    }

    const handleSendOtp = () => {
      setIsSendingOtp(true);
      // Simulate API call to send OTP
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: "A one-time pin has been sent to your phone number.",
        });
        setIsSendingOtp(false);
      }, 1500);
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background relative">
      <Card className="mx-auto max-w-sm w-full z-10">
        <CardHeader className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
              <Link href="/" className="flex justify-center">
                {logoImage && (
                  <Image
                      src={logoImage.imageUrl}
                      alt={logoImage.description}
                      width={80}
                      height={80}
                      className="object-contain"
                      data-ai-hint={logoImage.imageHint}
                    />
                )}
              </Link>
          </div>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSignup}>
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" name="full-name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center w-full">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground h-10">
                      +27
                    </span>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="72 123 4567"
                      required
                      className="rounded-l-none"
                    />
                  </div>
                   <Button type="button" variant="outline" onClick={handleSendOtp} disabled={isSendingOtp}>
                      {isSendingOtp ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span className="sr-only">Send OTP</span>
                    </Button>
                </div>
              </div>
             <div className="grid gap-2">
              <Label htmlFor="otp">OTP (Optional)</Label>
              <Input id="otp" type="text" placeholder="Enter OTP" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-light">
                    I agree to the{" "}
                    <Link href="/terms" className="underline font-medium hover:text-primary">
                    terms and conditions of use
                    </Link>
                </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
