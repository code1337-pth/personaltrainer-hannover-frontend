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
            </div>
        </section>
    );
};

export default RotatingShape;