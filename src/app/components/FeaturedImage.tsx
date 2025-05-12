// src/app/components/FeaturedImage.tsx
'use client';

import Image, { ImageLoaderProps } from 'next/image';
import { Media } from '@/app/types/strapi';
import { strapiImageLoader } from '@/app/lib/strapiImageLoader';

interface FeaturedImageProps {
    img: Media;
    alt?: string;
    /** Wenn true, verwendet next/image fill statt width/height */
    fill?: boolean;
    /** Feste Breite für das Bild (überschreibt img.width) */
    width?: number;
    /** Feste Höhe für das Bild (überschreibt img.height) */
    height?: number;
    /** Size-Attribute für responsive SrcSet (überschreibt default) */
    sizes?: string;
    /** Bild-Qualität (0-100) für next/image */
    quality?: number;
    /** Klassen für das <Image> selbst */
    className?: string;
    /** Klassen für den Wrapper-Container */
    containerClassName?: string;
}

const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw'

export default function FeaturedImage({
                                          img,
                                          alt,
                                          fill = false,
                                          width,
                                          height,
                                          sizes,
                                          quality,
                                          className = '',
                                          containerClassName = ''
                                      }: FeaturedImageProps) {
    const loader = ({ width: w }: ImageLoaderProps) => strapiImageLoader(img)({ width: w });

    // Wrapper-Klassen je nach Modus
    const containerClass = containerClassName
        ? containerClassName
        : fill
            ? 'relative w-full h-64 overflow-hidden rounded-lg'
            : 'flex justify-center mb-6 overflow-hidden rounded-lg';

    // Klassen für <Image>
    const imageClass = className
        ? className
        : fill
            ? 'object-cover object-center'
            : 'zoom-effect max-h-[500px] w-auto object-contain';

    // Default sizes, kann überschrieben werden
    const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw';

    return (
        <div className={containerClass}>
            {fill ? (
                <Image
                    loader={loader}
                    src={img.url}
                    alt={alt ?? img.alternativeText ?? ''}
                    fill
                    sizes={sizes ?? defaultSizes}
                    loading="lazy"
                    quality={quality}
                    className={imageClass}
                />
            ) : (
                <Image
                    loader={loader}
                    src={img.url}
                    alt={alt ?? img.alternativeText ?? ''}
                    width={width ?? img.width!}
                    height={height ?? img.height!}
                    sizes={sizes ?? defaultSizes}
                    loading="lazy"
                    quality={quality}
                    className={imageClass}
                />
            )}
        </div>
    );
}
