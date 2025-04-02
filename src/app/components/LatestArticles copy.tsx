// components/LatestArticles.tsx
import Link from "next/link";
import StrapiCache, { CacheKey } from "@/app/lib/strapiCache";
import { Article } from "../types/strapi";


export default async function LatestArticles({ count = 3 }: { count?: number }) {
  const articles = await StrapiCache.fetchData<Article>("articles", CacheKey.Articles);

  const sorted = articles
    .filter((a) => a.status === "published" && a.published_date)
    .sort(
      (a, b) =>
        new Date(b.published_date!).getTime() -
        new Date(a.published_date!).getTime()
    );

  const latest = sorted.slice(0, count);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Neueste Blogposts</h2>
      <ul className="space-y-2">
        {latest.map((article) => {
          const categorySlug = article.category?.slug || "uncategorized";
          return (
            <li key={article.id}>
              <Link
                href={`/blog/${categorySlug}/${article.slug}`}
                className="text-blue-600 hover:underline"
              >
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
