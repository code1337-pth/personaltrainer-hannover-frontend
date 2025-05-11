// next-sitemap.config.js
const fetch = global.fetch || require('node-fetch')

// Umgebungsvariablen prüfen
;['SITE_URL', 'STRAPI_API_URL', 'STRAPI_TOKEN'].forEach(k => {
    if (!process.env[k]) {
        throw new Error(`❌ Bitte ${k} in .env.local definieren!`)
    }
})

const { SITE_URL, STRAPI_API_URL: API, STRAPI_TOKEN: TOKEN } = process.env
const PAGE_SIZE = 100

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    sitemapSize: 5000,
    outDir: './public',
    changefreq: 'daily',
    priority: 0.7,

    transform: async (config, path) => ({
        loc: path === '/' ? '/' : path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
    }),

    additionalPaths: async () => {
        const today = new Date().toISOString().split('T')[0]
        const result = []

        const params = page => new URLSearchParams({
            'pagination[pageSize]': PAGE_SIZE,
            'pagination[page]': page,
            populate: 'category',
            'filters[status][$eq]': 'published',
        })

        const fetchPage = async page => {
            const res = await fetch(`${API}/api/articles?${params(page)}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            })
            if (!res.ok) throw new Error(`Strapi-Fehler Seite ${page}: ${res.status}`)
            return (await res.json()).data
        }

        const firstPage = await fetchPage(1)
        const { pageCount } = (await fetch(`${API}/api/articles?${params(1)}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
        }).then(r => r.json())).meta.pagination

        const allArticles = [...firstPage]
        for (let p = 2; p <= pageCount; p++) {
            allArticles.push(...await fetchPage(p))
        }

        const getLastmod = item => item.updatedAt || item.publishedAt || item.createdAt || today

        const getMaxArticleDate = articles => {
            const dates = articles.map(a => new Date(getLastmod(a)).getTime())
            return new Date(Math.max(...dates)).toISOString().split('T')[0]
        }

        const serviceCats = allArticles.filter(a => a.category?.slug && a.category.active && a.blog_article === false)
        const serviceSlugs = [...new Set(serviceCats.map(a => a.category.slug))]

        for (const slug of serviceSlugs) {
            const catArticles = serviceCats.filter(a => a.category.slug === slug)
            const categoryDate = new Date(getLastmod(catArticles[0].category)).getTime()
            const articlesDate = new Date(getMaxArticleDate(catArticles)).getTime()
            const lastmod = new Date(Math.max(categoryDate, articlesDate)).toISOString().split('T')[0]
            result.push({ loc: `/service/${slug}`, changefreq: 'weekly', priority: 0.85, lastmod })
        }

        serviceCats.forEach(a => {
            result.push({ loc: `/service/${a.category.slug}/${a.slug}`, changefreq: 'weekly', priority: 0.8, lastmod: getLastmod(a) })
        })

        const blogCats = allArticles.filter(a => a.category?.slug && a.category.active && a.blog_article !== false)
        const blogSlugs = [...new Set(blogCats.map(a => a.category.slug))]

        for (const slug of blogSlugs) {
            const catArticles = blogCats.filter(a => a.category.slug === slug)
            const categoryDate = new Date(getLastmod(catArticles[0].category)).getTime()
            const articlesDate = new Date(getMaxArticleDate(catArticles)).getTime()
            const lastmod = new Date(Math.max(categoryDate, articlesDate)).toISOString().split('T')[0]
            result.push({ loc: `/blog/${slug}`, changefreq: 'weekly', priority: 0.85, lastmod })
        }

        blogCats.forEach(a => {
            result.push({ loc: `/blog/${a.category.slug}/${a.slug}`, changefreq: 'monthly', priority: 0.7, lastmod: getLastmod(a) })
        })

        return result
    },
}