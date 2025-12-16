
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const vehicles = [
    {
        name: "Mercedes-Benz Hearse",
        description: "A classic and elegant choice for a dignified final journey.",
    },
    {
        name: "Luxury Family Sedan",
        description: "Comfortable and spacious transportation for the immediate family.",
    },
    {
        name: "Family SUV",
        description: "A larger vehicle to accommodate more family members.",
    }
];

export default function VehicleSelectionPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            Our Vehicle Selection
            </h2>
            <p className="text-muted-foreground">
                We provide a fleet of well-maintained and elegant vehicles for the funeral service.
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map(vehicle => {
             return (
                <Card key={vehicle.name} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-6 w-6 text-primary" />
                            {vehicle.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{vehicle.description}</CardDescription>
                    </CardContent>
                </Card>
             )
        })}
      </div>
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
