
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "The Mkhize Family",
    quote: "Pyramid Group Funerals handled everything with such grace and professionalism. During our darkest hours, they were a beacon of light. We are eternally grateful for their support.",
    imageId: "testimonial-1",
  },
  {
    id: 2,
    name: "Johnathan P.",
    quote: "The aftercare and grief support program was invaluable. It helped me navigate a very difficult time. Their compassion is truly genuine.",
    imageId: "testimonial-2",
  },
  {
    id: 3,
    name: "Sarah Naidoo",
    quote: "From the first call to the final arrangements, the process was seamless. They took care of every detail, allowing us to focus on honoring our mother.",
    imageId: "testimonial-3",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Words of Comfort</h2>
        <p className="text-muted-foreground">
          Hear from families we have had the privilege to serve.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => {
          const image = PlaceHolderImages.find((p) => p.id === testimonial.imageId);
          return (
            <Card key={testimonial.id} className="overflow-hidden group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                    ))}
                </div>
                <blockquote className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <p className="mt-4 font-semibold text-right text-foreground">
                  - {testimonial.name}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
