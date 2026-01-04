class Pagination {
    static constraints = {
        defaultPage: 1,
        defaultTotalPages: 1,
        defaultLimit: 10
    };

    static init(searchParams, setSearchParams) {
        const page = parseInt(searchParams.get('page'));
        const limit = parseInt(searchParams.get('limit'));

        if (!page || !limit) {
            const params = new URLSearchParams(searchParams);
            if (!page) params.set('page', this.constraints.defaultPage);
            if (!limit) params.set('limit', this.constraints.defaultLimit);
            setSearchParams(params, { replace: true });
            return false; // Indicates params were updated
        }
        return true;
    }

    static changePage(newPage, searchParams, setSearchParams) {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    }

    static resetPage(searchParams, setSearchParams) {
        const params = new URLSearchParams(searchParams);
        params.set('page', this.constraints.defaultPage.toString());
        setSearchParams(params);
    }

    static getState(searchParams) {
        return {
            page: parseInt(searchParams.get('page')) || this.constraints.defaultPage,
            limit: parseInt(searchParams.get('limit')) || this.constraints.defaultLimit
        };
    }
}

function PageSelector({currentPage, totalPages, onPageChange}) {
    if (totalPages <= 1) return null;

    return (
        <select name="pageSelect" onChange={onPageChange} value={currentPage}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>Page {number}</option>
                ))}
        </select>
    );
}

export { Pagination, PageSelector };


