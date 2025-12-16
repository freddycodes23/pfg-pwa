'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const router = useRouter();
  const logoImage = PlaceHolderImages.find(p => p.id === 'pyramid-logo-square');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background">
      <main className="flex flex-1 flex-col items-center justify-center text-center p-4">
        <div className="flex flex-col justify-center items-center space-y-4 animate-pulse">
          {logoImage && (
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={150}
              height={150}
              className="object-contain"
              priority
              data-ai-hint={logoImage.imageHint}
            />
          )}
        </div>
      </main>
    </div>
  );
}
