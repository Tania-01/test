import React, {JSX} from 'react';

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        let pages: JSX.Element[] = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`page-item ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            {renderPageNumbers()}
        </div>
    );
};

export default Pagination;
