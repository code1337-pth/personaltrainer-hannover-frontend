const STRAPI_HOST = process.env.STRAPI_API_URL || '';

export function transformHtmlContent(html: string): string {
    // 1. Normalize <img> Tags: Entferne Zeilenumbrüche, Tabs etc. aus den Attributwerten
    const normalized = html.replace(/<img\b[^>]*>/gi, (tag) => {
        // Ersetze in jedem Attribut alle \r, \n, \t, \v, \f durch ein Leerzeichen und reduziere Mehrfachleerzeichen
        return tag.replace(/(\w+)\s*=\s*"([^"]*?)"/g, (_full, key, value) => {
            const cleaned = value.replace(/[\r\n\t\v\f]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
            return `${key}="${cleaned}"`;
        });
    });

    // 2. Ersetze alle <img ...> durch <Image ...>
    const imageReplaced = normalized.replace(/<img\b([^>]*)>/gi, (_match, attrString) => {
        // Extrahiere den src-Wert
        const srcMatch = attrString.match(/src\s*=\s*"([^"]+)"/i);
        if (!srcMatch) return _match;
        let srcValue = srcMatch[1];
        if (!srcValue.startsWith('http')) {
            srcValue = STRAPI_HOST + srcValue;
        }
        // Prüfe, ob width und height schon vorhanden sind
        const hasWidth = /width\s*=/.test(attrString);
        const hasHeight = /height\s*=/.test(attrString);
        // Behalte andere Attribute (z. B. alt) – entferne aber den alten src-Teil
        let newAttr = attrString.replace(/src\s*=\s*"[^"]+"/i, '').trim();
        if (newAttr && !newAttr.startsWith(' ')) {
            newAttr = ' ' + newAttr;
        }
        const widthStr = hasWidth ? '' : ' width="600"';
        const heightStr = hasHeight ? '' : ' height="400"';
        return `<Image src="${srcValue}"${widthStr}${heightStr}${newAttr} loading="lazy"   />`;
    });

    // 3. Ersetze interne <a> Tags mit <Link> und sichere externe <a>
    return imageReplaced.replace(
        /<a\b([^>]*)href\s*=\s*"([^"]+)"([^>]*)>(.*?)<\/a>/gi,
        (_match, pre, href, post, inner) => {
            if (href.startsWith('/')) {
                return `<Link hrefLang="de" href="${href}"${pre}${post}>${inner}</Link>`;
            } else {
                const hasTarget = /target=/.test(pre + post);
                const hasRel = /rel=/.test(pre + post);
                return `<a href="${href}"${hasTarget ? '' : ' target="_blank"'}${hasRel ? '' : ' rel="noopener noreferrer nofollow"'}${pre}${post}>${inner}</a>`;
            }
        }
    );
}