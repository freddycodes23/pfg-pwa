
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Package, Flower2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const burialPackages = [
    {
        name: "Standard Casket",
        description: "A dignified and simple casket, crafted from solid pine.",
        price: "R 11,000",
    },
    {
        name: "Deluxe Casket",
        description: "An elegant casket with premium finishes and detailed craftsmanship.",
        price: "R 26,500",
    },
    {
        name: "Premium Dome Casket",
        description: "Our finest offering, featuring a domed lid and luxurious interior.",
        price: "R 42,000",
    }
];

export default function BurialServicesPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            Burial Services Catalogue
            </h2>
            <p className="text-muted-foreground">
            Choose from our selection of caskets to honor your loved one.
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {burialPackages.map(pkg => {
            return (
                <Card key={pkg.name} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-primary" />
                            {pkg.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                        <CardDescription>{pkg.description}</CardDescription>
                        <p className="mt-4 text-lg font-semibold text-right">{pkg.price}</p>
                    </CardContent>
                </Card>
            )
        })}
      </div>
       <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Flower2 className="h-6 w-6 text-primary" />
                    Additional Services
                </CardTitle>
                <CardDescription>We also offer a range of additional services to personalize the ceremony.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Floral Arrangements</li>
                    <li>Customized Programs</li>
                    <li>Grave Site Preparation</li>
                    <li>And more...</li>
                </ul>
            </CardContent>
       </Card>
       <div className="mt-8">
            <Link href="/dashboard/services">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </Link>
        </div>
    </div>
  );
}
