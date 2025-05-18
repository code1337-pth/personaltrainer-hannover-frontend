// src/app/components/HtmlRenderer.tsx
'use client';

import React from 'react';
import parse, {DOMNode, domToReact, Element, HTMLReactParserOptions} from 'html-react-parser';
import Link from 'next/link';
import Image from "next/image";

interface Props {
    html: string;
}

export default function HtmlRenderer({html}: Props) {
    let liCounter = 0;

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                // <img> → <Image>
                if (domNode.name === 'img') {
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
                        />
                    );
                }

                // Interne Links als <Link>
                if (domNode.name === 'a' && domNode.attribs.href && domNode.attribs.href.startsWith('/')) {
                    const href = domNode.attribs.href;
                    return <Link href={href}>{domToReact(domNode.children as DOMNode[], options)}</Link>;
                }

                // Externe Links absichern
                if (domNode.name === 'a' && domNode.attribs.href && domNode.attribs.href.startsWith('http')) {
                    const href = domNode.attribs.href;
                    const extraProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};
                    if (!domNode.attribs.target) {
                        extraProps.target = "_blank";
                    }
                    if (!domNode.attribs.rel) {
                        extraProps.rel = "noopener noreferrer nofollow";
                    }
                    return (
                        <a href={href} {...extraProps}>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </a>
                    );
                }

                // <li> mit eindeutigen Keys
                if (domNode.name === 'li') {
                    liCounter++;
                    return (
                        <li key={`li-${liCounter}`}>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </li>
                    );
                }
            }
        },
    };

    return <>{parse(html, options)}</>;
}
