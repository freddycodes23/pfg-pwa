import Image from 'next/image';
import type { SVGProps } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface LogoProps extends React.ComponentPropsWithoutRef<typeof Image> {
  size?: number | string;
}

export function Logo({ 
  size, 
  width,
  height,
  className,
  ...props 
}: Omit<LogoProps, 'src' | 'alt'>) {
  // Use size prop if provided, otherwise fall back to width/height or default
  const finalWidth = size || width || 100;
  const finalHeight = size || height || 100;
  const logoImage = PlaceHolderImages.find(p => p.id === 'pyramid-nameplate');

  return (
    logoImage ? (
      <Image
        src={logoImage.imageUrl}
        alt={logoImage.description}
        width={Number(finalWidth)}
        height={Number(finalHeight)}
        className={className}
        data-ai-hint={logoImage.imageHint}
        {...props}
      />
    ) : null
  );
}
