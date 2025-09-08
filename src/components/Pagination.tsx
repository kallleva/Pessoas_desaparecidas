import React from 'react';

const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (p: number) => void }> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const prev = () => onPageChange(Math.max(1, currentPage - 1));
  const next = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>«</button>
      <button onClick={prev} disabled={currentPage === 1}>‹</button>
      <span className="page-info">{currentPage} / {totalPages}</span>
      <button onClick={next} disabled={currentPage === totalPages}>›</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
    </div>
  );
};

export default Pagination;
