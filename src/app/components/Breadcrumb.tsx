import Link from "next/link";

interface BreadcrumbProps {
  paths: { name: string; link?: string }[];
}

const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          {path.link ? (
            <Link hrefLang="de" href={path.link} className="hover:text-[var(--color-gold)]">
              {path.name}
            </Link>
          ) : (
            <span className="text-gray-800">{path.name}</span>
          )}
          {index < paths.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
