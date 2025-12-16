
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Phone, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsappIcon } from '@/components/common/WhatsappIcon';
import Link from 'next/link';

export default function GriefSupportPage() {
  const supportImage = PlaceHolderImages.find((p) => p.id === 'grief-support-main');
  const supportPhoneNumber = '0765113141';
  const whatsappLink = `https://wa.me/27${supportPhoneNumber.substring(1)}`;

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Grief Support</h2>
            <p className="text-muted-foreground">
            Navigating loss is a difficult journey. We are here to support you.
            </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          {supportImage && (
            <div className="relative min-h-[250px] md:min-h-full">
              <Image
                src={supportImage.imageUrl}
                alt={supportImage.description}
                fill
                className="object-cover"
                data-ai-hint={supportImage.imageHint}
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <h3 className="font-headline text-2xl font-semibold mb-4">Our Commitment to Your Well-being</h3>
            <p className="text-muted-foreground mb-4">
              The loss of a loved one can be one of the most challenging experiences in life. At Pyramid Group Funerals, our care extends beyond the funeral service. We offer aftercare programmes and resources to help you and your family cope with grief and begin the healing process.
            </p>
            <p className="text-muted-foreground">
              You are not alone. Our bereavement support is designed to provide a safe space for you to express your feelings and connect with others who understand what you are going through.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              24/7 Support Line
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our dedicated support line is available any time of day or night.
            </p>
            <p className="text-lg font-semibold mt-2">076 511 3141</p>
          </CardContent>
        </Card>
        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              Support Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Join one of our professionally-led support groups to share your experience in a confidential setting.
            </p>
          </CardContent>
        </Card>
        <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <WhatsappIcon className="h-7 w-7 text-primary" />
              Chat on WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Prefer to chat? Send us a message on WhatsApp for immediate assistance.
            </p>
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className='w-full'>
                    Open WhatsApp
                </Button>
            </Link>
          </CardContent>
        </Card>
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
