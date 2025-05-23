import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <nav className="flex items-center justify-center space-x-2 my-8" aria-label="Пагинация">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        <FiChevronLeft className="mr-1 h-5 w-5" />
        Назад
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={`px-4 py-2 rounded-md hover:bg-sky-700 transition-colors ${1 === currentPage ? 'bg-sky-600 text-white font-semibold' : 'bg-slate-700 text-slate-200'}`}>1</button>
          {startPage > 2 && <span className="text-slate-400 px-2">...</span>}
        </>
      )}

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md hover:bg-sky-700 transition-colors ${page === currentPage ? 'bg-sky-600 text-white font-semibold' : 'bg-slate-700 text-slate-200'}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages -1 && <span className="text-slate-400 px-2">...</span>}
          <button onClick={() => onPageChange(totalPages)} className={`px-4 py-2 rounded-md hover:bg-sky-700 transition-colors ${totalPages === currentPage ? 'bg-sky-600 text-white font-semibold' : 'bg-slate-700 text-slate-200'}`}>{totalPages}</button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
      >
        Вперед
        <FiChevronRight className="ml-1 h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;