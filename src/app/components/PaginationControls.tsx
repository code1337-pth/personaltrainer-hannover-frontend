"use client";

import React from "react";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded disabled:opacity-50"
      >
        Vorherige
      </button>
      <span>
        Seite {currentPage} von {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-(--button-bg-color) text-(--button-text-color) rounded disabled:opacity-50"
      >
        Nächste
      </button>
    </div>
  );
};

export default PaginationControls;
