import React from "react";
import Image from "next/image";

const RotatingShape = () => {
    const BLUR_DARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAUAAWgmWQ0AAAAASUVORK5CYII=";

    return (
        <section className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-100 sm:h-100 lg:w-[500px] lg:h-[500px] mt-20 sm:mt-0">
                <Image
                    src="/hero-profile-shape.avif"
                    alt="Rotierendes Shape"
                    fill
                    sizes="(max-width: 661px) 80vw, 500px"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain hidden lg:flex [animation:spin_30s_linear_infinite]"
                />
                <Image
                    src="/markus-kaluza-tp.avif"
                    alt="Markus Kaluza - Personal Trainer"
                    fill
                    sizes="(max-width: 400px) 70vw, 380px"
                    priority={true}
                    quality={50}
                    className="absolute inset-0 m-auto rounded-full object-cover border border-gray-800 border-dashed w-48 h-48 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px]"
                />
            </div>
        </section>
    );
};

export default RotatingShape;