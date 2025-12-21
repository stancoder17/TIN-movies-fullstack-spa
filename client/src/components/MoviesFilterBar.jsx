function MoviesFilterBar() {
    return (
        <div className="form-container-unstyled">
            <form>
                <div className="form-inputs-container">

                    <div className="form-input-group">

                        <h3 className="text-main">Genre:</h3>

                        <div>
                            <input type="checkbox" id="genre-comedy" name="genres" value="comedy" checked/>
                            <label htmlFor="genre-comedy" className="text-main">Comedy</label>
                        </div>

                        <div>
                            <input type="checkbox" id="genre-drama" name="genres" value="drama" checked/>
                            <label htmlFor="genre-drama" className="text-main">Drama</label>
                        </div>

                        <div>
                            <input type="checkbox" id="genre-sci-fi" name="genres" value="sci-fi" checked/>
                            <label htmlFor="genre-sci-fi" className="text-main">Science Fiction</label>
                        </div>

                        <div>
                            <input type="checkbox" id="genre-action" name="genres" value="action" checked/>
                            <label htmlFor="genre-action" className="text-main">Action</label>
                        </div>

                    </div>

                    <div className="form-input-group">

                        <h3 className="text-main">Type:</h3>

                        <div>
                            <input type="checkbox" id="production-type-movie" name="productionType" value="movie"
                                   checked/>
                            <label htmlFor="production-type-movie" className="text-main">Movie</label>
                        </div>

                        <div>
                            <input type="checkbox" id="production-type-series" name="productionType" value="series"
                                   checked/>
                            <label htmlFor="production-type-series" className="text-main">Series</label>
                        </div>

                    </div>

                    <div className="form-input-group">

                        <h3 className="text-main">Year:</h3>

                        <div>
                            <label htmlFor="year-from" className="text-main">from</label>
                            <select name="year-from" id="year-from">
                                <option value="1900">1900</option>
                                <option value="1925">1925</option>
                                <option value="1950">1950</option>
                                <option value="1975">1975</option>
                                <option value="2000">2000</option>
                                <option value="2025">2025</option>
                            </select>

                            <label htmlFor="year-to" className="text-main">to</label>
                            <select name="year-to" id="year-to">
                                <option value="2025">2025</option>
                                <option value="2000">2000</option>
                                <option value="1975">1975</option>
                                <option value="1950">1950</option>
                                <option value="1925">1925</option>
                                <option value="1900">1900</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="form-buttons-etc">
                    <button type="submit" className="wide">Filter</button>
                </div>
            </form>
        </div>
    );
}