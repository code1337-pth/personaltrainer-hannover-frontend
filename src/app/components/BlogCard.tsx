import Image from "next/image";
import Link from "next/link";

interface BlogItemProps {
  item: {
    name: string;
    description: string;
    image_url: string;
    link: string;
    published_date?: string;
  };
}

const BlogCard = ({ item }: BlogItemProps) => {
  return (
    <div className="border-1 p-5 border-solid border-(--border-thin-color) shadow-md rounded-lg overflow-hidden flex flex-col">
      <Link href={item.link}>
        <Image
          src={item.image_url}
          alt={item.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
      </Link>
      {item.published_date && (
          <p className="text-sm mt-5 text-center">
            Veröffentlicht am {new Date(item.published_date).toLocaleDateString("de-DE")}
          </p>
        )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="text-gray-600">{item.description}</p>


        <Link
          href={item.link}
          className="text-[var(--foreground)] font-semibold text-lg mt-auto pt-4"
        >
          Mehr lesen →
        </Link>
      </div>
    </div>
  );
};


export default BlogCard;
