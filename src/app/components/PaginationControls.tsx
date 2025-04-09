// src/app/components/PaginationControls.tsx – Clientfreie (serverseitig renderbare) Komponente
import Link from "next/link";
import React from "react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  currentQuery: string;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                 currentPage,
                                                                 totalPages,
                                                                 baseUrl,
                                                                 currentQuery,
                                                               }) => {
  // Erzeuge URL mit page- und query-Parametern
  const createPageLink = (page: number) => {
    let url = `${baseUrl}?page=${page}`;
    if (currentQuery) {
      url += `&query=${encodeURIComponent(currentQuery)}`;
    }
    return url;
  };

  return (
      <div className="flex justify-center items-center mt-6 space-x-4">
        {currentPage > 1 ? (
            <Link
                href={createPageLink(currentPage - 1)}
                className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded"
            >
              Vorherige
            </Link>
        ) : (
            <span className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded opacity-50">
          Vorherige
        </span>
        )}
        <span>
        Seite {currentPage} von {totalPages}
      </span>
        {currentPage < totalPages ? (
            <Link
                href={createPageLink(currentPage + 1)}
                className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded"
            >
              Nächste
            </Link>
        ) : (
            <span className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded opacity-50">
          Nächste
        </span>
        )}
      </div>
  );
};

export default PaginationControls;
