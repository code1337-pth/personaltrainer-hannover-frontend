// components/RotatingShape.tsx
import React from "react";
import Image from "next/image";

const RotatingShape = () => {
    return (
        <section className="relative flex items-center justify-center">
            <div className="relative w-[500px] h-[500px]">
                <Image
                    src="/hero-profile-shape.webp"
                    alt="Rotating shape"
                    fill
                    sizes="(max-width: 1024px) 80vw, 500px"
                    priority
                    className="absolute inset-0 object-contain hidden lg:flex [animation:spin_30s_linear_infinite]"
                />
                <Image
                    src="/markus-kaluza-tp.webp"
                    alt="Person"
                    fill
                    sizes="(max-width: 1024px) 80vw, 400px"
                    loading="lazy"
                    className="absolute inset-0 m-auto rounded-full object-cover border border-gray-800 border-dashed"
                />
            </div>
        </section>
    );
};

export default RotatingShape;
