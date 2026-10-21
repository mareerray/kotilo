type PaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

function Pagination({ page, totalPages, onChange }: PaginationProps) {
    if (totalPages <= 1) return null;
    return (
        <nav className="pagination" aria-label="Pagination">
            <button className="btn" onClick={() => onChange(page - 1)} disabled={page === 1}>
                ← Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button className="btn" onClick={() => onChange(page + 1)} disabled={page === totalPages}>
                Next →
            </button>
        </nav>
    );
}

export default Pagination;