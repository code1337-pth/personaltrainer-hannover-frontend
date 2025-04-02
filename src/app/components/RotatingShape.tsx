// components/RotatingShape.tsx

import React from "react";

const RotatingShape = () => {
  return (
    <section className="relative flex items-center justify-center ">
      <div className="relative w-[500px] h-[500px]">
        <img
          src="/hero-profile-shape.png"
          alt="Rotating shape"
          className="absolute inset-0 w-full h-full object-contain hidden lg:flex [animation:spin_30s_linear_infinite]"
        />
        <img
          src="/markus-kaluza-tp.png"
          alt="Person"
          className="absolute inset-0 w-[400px] h-[400px] m-auto rounded-full object-cover border-1 border-gray-800 border-dashed"
        />
    </div>
    </section>
  );
};

export default RotatingShape;
