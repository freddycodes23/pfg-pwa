
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight, Coins, Compass, UserCog, LogOut } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BranchLocator } from '@/components/branch-locator';
import { PaymentsForm } from '@/components/payments-form';
import { AccountManagementForm } from '@/components/account-form';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();

  const WelcomeMessage = () => {
    if (isUserLoading) {
      return <Skeleton className="h-9 w-64" />;
    }
    return (
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Welcome Back{user?.displayName ? `, ${user.displayName}` : ''}
      </h2>
    );
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-2">
        <div className="space-y-2">
          <WelcomeMessage />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
           <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <UserCog className="mr-2 h-4 w-4" />
                  Manage Account
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] md:h-5/6 flex flex-col">
                 <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight font-headline">Manage Account</DialogTitle>
                    <DialogDescription>
                        Manage your account, policy, and dependants.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow min-h-0 overflow-y-auto">
                    <AccountManagementForm />
                </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Coins className="mr-2 h-4 w-4" />
                    Make Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                 <DialogHeader>
                    <DialogTitle className="text-2xl font-bold tracking-tight font-headline">Make a Payment</DialogTitle>
                    <DialogDescription>
                        Manage your payments and billing information.
                    </DialogDescription>
                </DialogHeader>
                <PaymentsForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Responsive Grid for Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Plan</CardTitle>
            <div className="text-sm font-bold text-muted-foreground">ZAR</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Khomakhwatsi Lite</div>
            <p className="text-xs text-muted-foreground">
              Next payment due in 15 days
            </p>
          </CardContent>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
             <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nearest Branch</CardTitle>
                <Compass className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Find a Branch</div>
                <p className="text-xs text-muted-foreground">
                  Click here to locate a branch near you.
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
           <DialogContent className="max-w-4xl h-[90vh] md:h-5/6 flex flex-col">
              <DialogHeader>
                  <DialogTitle className="text-2xl font-bold tracking-tight font-headline">Branch Locator</DialogTitle>
                  <DialogDescription>
                      Find a Pyramid Group Funerals branch near you.
                  </DialogDescription>
              </DialogHeader>
              <div className="flex-grow min-h-0">
                <BranchLocator />
              </div>
          </DialogContent>
        </Dialog>


        <Card className="lg:col-span-1 md:col-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Explore Our Services</CardTitle>
            <CardDescription>
                Discover the comprehensive support we offer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/services">
              <Button className="w-full">
                View All Services
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

       <div className="mt-8">
            <Link href="/">
              <Button variant="destructive" className="w-full md:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </Link>
        </div>
    </div>
  );
}
