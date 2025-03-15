"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Service = {
  name: string;
  description: string;
  image_url: string;
};

export default function ServiceDetails() {
  const { category } = useParams();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/services/servicesData.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredServices = data.services.filter((s: Service) => s.category === category);
        setServices(filteredServices);
      })
      .catch((error) => console.error("Fehler beim Laden der Services:", error));
  }, [category]);

  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-4">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="rounded-lg shadow-lg overflow-hidden">
            <Image src={service.image_url} alt={service.name} width={400} height={250} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
