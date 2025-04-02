"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ZoomableImageProps extends ImageProps {}

export default function ZoomableImage(props: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpen} className="cursor-zoom-in">
        <Image {...props} />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div className="relative">
            <Image {...props} className="rounded-lg" />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
