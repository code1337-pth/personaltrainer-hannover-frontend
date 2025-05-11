// components/RotatingShape.tsx

import React from "react";
import Image from "next/image";

const RotatingShape = () => {
    return (
        <section className="relative flex items-center justify-center ">
            <div className="relative w-[500px] h-[500px]">
                <Image
                    src="/hero-profile-shape.png"
                    alt="Rotating shape"
                    fill
                    className="absolute inset-0 w-full h-full object-contain hidden lg:flex [animation:spin_30s_linear_infinite]"
                />
                <Image
                    src="/markus-kaluza-tp.png"
                    alt="Person"
                    fill
                    className="absolute inset-0 w-[400px] h-[400px] m-auto rounded-full object-cover border-1 border-gray-800 border-dashed"
                />
            </div>
        </section>
    );
};

export default RotatingShape;
