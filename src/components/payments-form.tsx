
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Landmark, Zap } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function GooglePayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M20.25 8.68a5.21 5.21 0 00-7.8-5.46l-2.6 2.6a1.24 1.24 0 01-1.76 0l-2.6-2.6A5.21 5.21 0 00.25 8.68v.29a5.21 5.21 0 002.92 4.63l2.84 1.42a1.24 1.24 0 01.88 1.14v3.29a1.24 1.24 0 001.24 1.24h5.2a1.24 1.24 0 001.24-1.24v-3.29a1.24 1.24 0 01.88-1.14l2.84-1.42a5.21 5.21 0 002.92-4.63v-.29zm-8.69 4.4a3.14 3.14 0 01-3.12-3.12V8.21a3.14 3.14 0 013.12-3.12h5.2a3.14 3.14 0 013.12 3.12v1.75a3.14 3.14 0 01-3.12 3.12h-5.2z" fill="#4285F4"/>
        <path d="M12.92 10.93a1.24 1.24 0 00-1.24-1.24h-5.2a1.24 1.24 0 100 2.48h5.2a1.24 1.24 0 001.24-1.24z" fill="#FFBC00"/>
        <path d="M11.56 18.32l-2.84-1.42a1.24 1.24 0 01-.88-1.14V12.5a3.14 3.14 0 00-1.87-2.84A5.21 5.21 0 01.25 8.68V8.4a5.21 5.21 0 018.04-4.83l2.6 2.6a1.24 1.24 0 001.76 0l2.6-2.6a5.21 5.21 0 018.04 4.83v.29a5.21 5.21 0 01-2.92 4.63l-2.84 1.42a1.24 1.24 0 00-.88 1.14v3.29a1.24 1.24 0 01-1.24 1.24h-5.2a1.24 1.24 0 01-1.24-1.24v-3.29a1.24 1.24 0 00-.88-1.14z" fill="none"/>
        <path d="M8.44 9.68a3.14 3.14 0 013.12-3.12h5.2a3.14 3.14 0 013.12 3.12v1.75a3.14 3.14 0 01-3.12 3.12h-5.2a3.14 3.14 0 01-3.12-3.12V9.68z" fill="#34A853"/>
        <path d="M11.56 12.17H6.36a1.24 1.24 0 100 2.48h5.2a1.24 1.24 0 100-2.48z" fill="#EA4335"/>
        <path d="M18.04 9.68a3.14 3.14 0 00-3.12-3.12h-5.2A3.14 3.14 0 006.6 9.68v.29a3.14 3.14 0 001.87 2.84l2.84 1.42a1.24 1.24 0 01.88 1.14v3.29a1.24 1.24 0 001.24 1.24h5.2a1.24 1.24 0 001.24-1.24v-3.29a1.24 1.24 0 01.88-1.14l2.84-1.42a3.14 3.14 0 001.87-2.84v-.29z" fill="none"/>
      </svg>
    )
}

function PayAtIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path fill="#00AEEF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path fill="#00AEEF" d="M13.42 15.56c-.39.39-1.02.39-1.41 0l-2.12-2.12c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0l2.12 2.12c.39.39.39 1.02 0 1.41l-2.12 2.12zm-1.41-4.95L10 12l2.01 2.01L14.02 12l-2.01-1.39z"/>
      <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#0033A0">PAY@</text>
    </svg>
  );
}


export function PaymentsForm() {
    const { toast } = useToast();

    const handlePayment = (method: string) => {
        toast({
            title: "Payment Successful",
            description: `Your payment with ${method} was processed.`,
        });
    }

  return (
    <div className="grid gap-8">
        <Tabs defaultValue="card" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="card">
                <CreditCard className="mr-2 h-4 w-4" />
                Card
            </TabsTrigger>
            <TabsTrigger value="voucher">
                <Zap className="mr-2 h-4 w-4" />
                1Voucher
            </TabsTrigger>
            <TabsTrigger value="pay-at">
                <PayAtIcon className="mr-2 h-5 w-5" />
                Pay@
            </TabsTrigger>
            <TabsTrigger value="gpay">
                <GooglePayIcon className="mr-2 h-5 w-5" />
                G-Pay
            </TabsTrigger>
            </TabsList>
            <TabsContent value="card" className="pt-6">
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                    Your card payments are securely processed by <strong>PayFast</strong>. 
                    We do not store your card details on our servers.
                </p>
                <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="card-holder">Cardholder Name</Label>
                <Input id="card-holder" placeholder="John Doe" />
                </div>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="w-full">Pay with Card</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to make a payment via PayFast. Please note that a standard transaction fee may be applied by the payment gateway at your expense. Do you want to continue?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handlePayment('Card via PayFast')}>
                        Proceed
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
            </TabsContent>
            <TabsContent value="voucher" className="pt-6">
            <div className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="voucher-pin">1Voucher PIN</Label>
                <Input id="voucher-pin" placeholder="Enter your voucher PIN" />
                </div>
                <Button className="w-full" onClick={() => handlePayment('1Voucher')}>Redeem 1Voucher</Button>
            </div>
            </TabsContent>
            <TabsContent value="pay-at" className="pt-6">
            <div className="space-y-4">
                <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                    Enter your Pay@ reference number below and click "pay now"
                </p>
                </div>
                <div className="space-y-2">
                <Label htmlFor="pay-at-reference">Pay@ Reference Number</Label>
                <Input
                    id="pay-at-reference"
                    placeholder="Enter your Pay@ reference number"
                    type="text"
                />
                </div>
                <Button className="w-full" onClick={() => handlePayment('Pay@')}>Pay Now</Button>
            </div>
            </TabsContent>
            <TabsContent value="gpay" className="pt-6">
                <div className="space-y-4 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">Click the button below to complete your payment securely with Google Pay.</p>
                    <Button className="w-full max-w-xs bg-black text-white hover:bg-black/80" onClick={() => handlePayment('Google Pay')}>
                        <GooglePayIcon className="mr-2 -ml-2" />
                        Pay with Google
                    </Button>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
