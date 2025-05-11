"use client";
import React, {JSX, useState} from "react";
import Image, {ImageProps} from "next/image";

// Alt-Text jetzt erforderlich, alle anderen ImageProps bleiben erhalten
type ZoomableImageProps = Omit<ImageProps, "alt"> & {
    alt: string;
};

export default function ZoomableImage({alt, ...rest}: ZoomableImageProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <div onClick={handleOpen} className="cursor-zoom-in inline-block">
                <Image alt={alt} {...rest} />
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={handleClose}
                >
                    <div className="relative">
                        <Image alt={alt} {...rest} className="rounded-lg"/>
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-white text-2xl"
                            aria-label="Schließen"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
