class Pagination {
    static constraints = {
        defaultPage: 1,
        defaultTotalPages: 1,
        defaultLimit: 10
    };

    /* Function used to during user's first visit to the url to initialize
       the search parameters with default values, because they are missing */
    static init(searchParams, setSearchParams) {
        const page = parseInt(searchParams.get('page'));
        const limit = parseInt(searchParams.get('limit'));

        if (!page || !limit) {
            const params = new URLSearchParams(searchParams);
            if (!page) params.set('page', this.constraints.defaultPage);
            if (!limit) params.set('limit', this.constraints.defaultLimit);
            setSearchParams(params, { replace: true });
            return true; // indicates that search parameters were updated
        }
        return false; // no update needed
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


