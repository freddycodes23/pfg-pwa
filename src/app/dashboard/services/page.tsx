
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartHandshake, Home, Users, Car, Crosshair, ClipboardList, Bed, Flower2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "Khomakhwatsi: Main Package",
    description: "Cover up to 12 family members - Children over the age of 21 are covered - Children or dependents with different surnames covered - No age limit - Two family cars and hearse provided - Tent, 40 chairs, and 2 tables at home - 50 colour programs - Full decoration at graveyard - Grave marker - R3000 cash back if funeral is not rendered by Pyramid - R1000 condolence payout - 3 months waiting period for burial only",
    icon: Home,
  },
  {
    title: "Khomakhwatsi: Lite Package",
    description: " Cover up to 6 family members - Children over the age of 21 are covered - Children or dependents with different surnames covered - No age limit - Two family cars and hearse provided - Tent, 40 chairs, and 2 tables at home - 50 colour programs - Full decoration at graveyard - Grave marker - R3000 cash back if funeral is not rendered by Pyramid - R1000 condolence payout - 3 months waiting period for burial only",
    icon: HeartHandshake,
  },
  {
    title: "Grocery Benefit",
    description: "2x 12.5kg Sugar, 1x 80kg Mealie Meal, 3x 10kg Mabele, 2x 10kg Rice, 2x 5Litre Cooking Oil, 200 Loose Tea Bags, 6x Packets of Candles, 1x 750g Coffee, 160x Rooibos Tea Bags, 2x 1kg Table Salt, 4x 5kg Chicken Mixed Portions, 2 Bags of Potatoes, 4x 6L Fresh Milk, 1 Box of Tomatoes, 1 Bag of Onions, 10 Cabbages. R65 per month. 3 months waiting period.",
    icon: ShoppingCart,
  },
  {
    title: "Burial Services",
    description: "Complete management of burial proceedings with dignity and respect.",
    icon: Flower2,
    href: "/dashboard/services/burial"
  },
  {
    title: "Mortuary Services",
    description: "Professional and respectful mortuary facilities and care.",
    icon: Bed,
  },
  {
    title: "Pick-up & Deliver",
    description: "Reliable transportation services for the deceased, available 24/7.",
    icon: Crosshair,
  },
  {
    title: "Death Registrations",
    description: "Assistance with all the necessary legal paperwork and death registration.",
    icon: ClipboardList,
  },
  {
    title: "Hearse & Family Car",
    description: "A fleet of elegant hearses and comfortable family cars for the service.",
    icon: Car,
    href: "/dashboard/services/vehicles"
  },
  {
    title: "Bereavement Support",
    description: "Guidance and support programs to help you through the grieving process.",
    icon: Users,
    href: "/dashboard/grief-support"
  },
];

export default function ServicesPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">
            Our Services
            </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const ServiceCard = (
            <Card 
              key={service.title} 
              className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-md mt-1">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className='flex-1'>
                    <CardTitle className="font-headline text-lg">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          );
          
          if (service.href) {
            return (
              <Link href={service.href} key={service.title} className="flex flex-col h-full">
                {ServiceCard}
              </Link>
            )
          }

          return ServiceCard;
        })}
      </div>
      <div className="mt-8">
        <Link href="/dashboard">
            <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
        </Link>
      </div>
    </div>
  );
}
