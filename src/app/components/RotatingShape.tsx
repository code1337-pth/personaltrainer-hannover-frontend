import React from "react";
import Image from "next/image";

const RotatingShape = () => {
    return (
        <section className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-100 sm:h-100 lg:w-[500px] lg:h-[500px] mt-20 sm:mt-0">
                <Image
                    src="/hero-profile-shape.webp"
                    alt="Rotierendes Shape"
                    fill
                    sizes="(max-width: 661px) 80vw, 500px"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain hidden lg:flex [animation:spin_30s_linear_infinite]"
                />
                <Image
                    src="/markus-kaluza-tp.webp"
                    alt="Person"
                    fill
                    sizes="(max-width: 426px) 80vw, 400px"
                    priority
                    className="absolute inset-0 m-auto rounded-full object-cover border border-gray-800 border-dashed w-48 h-48 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]"
                />
            </div>
        </section>
    );
};

export default RotatingShape;