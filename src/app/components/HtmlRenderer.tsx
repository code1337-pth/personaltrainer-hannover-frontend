// components/HtmlRenderer.tsx
'use client';

import parse, { domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    html: string;
}

export default function HtmlRenderer({ html }: Props) {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                // === <img> → <Image />
                if (domNode.name === 'Image' || domNode.name === 'img') {
                    const src = domNode.attribs.src;
                    if (!src) return null;

                    const width = parseInt(domNode.attribs.width || '600');
                    const height = parseInt(domNode.attribs.height || '400');
                    const alt = domNode.attribs.alt || '';

                    return (
                        <Image
                            src={src}
                            width={width}
                            height={height}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    );
                }

                // === <Link> oder <a href="/..."> → <Link />
                if (domNode.name === 'Link' || (domNode.name === 'a' && domNode.attribs.href?.startsWith('/'))) {
                    const href = domNode.attribs.href;
                    return <Link href={href}>{domToReact(domNode.children as any, options)}</Link>;
                }

                // === Externe <a> Links aufwerten
                if (domNode.name === 'a' && domNode.attribs.href?.startsWith('http')) {
                    return (
                        <a
                            href={domNode.attribs.href}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            {domToReact(domNode.children, options)}
                        </a>
                    );
                }
            }
        },
    };

    return <>{parse(html, options)}</>;
}
