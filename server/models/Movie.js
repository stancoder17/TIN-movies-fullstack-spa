import db from '../config/database/db.js';
import movieConstraints from '../../utils/constraints/movieConstraints.js';

class Movie {
    static async getAll(filters = {}) {
        let sql = 'SELECT * FROM movies';
        const hasAnyFilter = Object.values(filters).some(value => value !== undefined);
        const params = [];

        if (hasAnyFilter) {
            sql += ' WHERE ';
            let hasFiltersApplied = false;

            if (filters.genres) { // genre IN (?, ?, ?, ..., ?)
                sql += `genre IN (${filters.genres.map((genre) => {
                    params.push(genre);
                    return '?';
                }).join(', ')})`;
                hasFiltersApplied = true;
            }

            if (filters.minDate && filters.maxDate) {
                if (hasFiltersApplied) sql += ' AND ';

                sql += "strftime('%Y', release_date) BETWEEN ? AND ?";
                params.push(filters.minDate.toString());
                params.push(filters.maxDate.toString());
            }
        }

        return await db.all(sql, params);
    }

    static async getById(id) {
        const sql = 'SELECT * FROM movies WHERE id = ?';
        const params = [id];

        return await db.get(sql, params);
    }

    static async getTopByRating(count) {
        const sql = `
            SELECT m.id, m.title, AVG(r.score) as average_rating
            FROM movies m
            LEFT JOIN ratings r ON m.id = r.movie_id
            GROUP BY m.id, m.title
            ORDER BY average_rating DESC, m.title ASC
            LIMIT ?
        `;
        const params = [count];

        return await db.all(sql, params);
    }

    static async getFilterFormFields() {
        const minDate = new Date(movieConstraints.releaseDate.earliest).getFullYear();
        const maxDate = new Date().getFullYear();

        return {
            genres: [
                { type: 'checkbox', label: 'Comedy', name: 'genres', value: 'comedy', checked: true },
                { type: 'checkbox', label: 'Drama', name: 'genres', value: 'drama', checked: true },
                { type: 'checkbox', label: 'Sci-fi', name: 'genres', value: 'sci-fi', checked: true },
                { type: 'checkbox', label: 'Action', name: 'genres', value: 'action', checked: true },
                { type: 'checkbox', label: 'Crime', name: 'genres', value: 'crime', checked: true },
                { type: 'checkbox', label: 'Thriller', name: 'genres', value: 'thriller', checked: true },
            ],
            minDate: minDate,
            maxDate: maxDate
        };
    }

    static async create(movie) {
        const sql = 'INSERT INTO movies (title, description, genre, director, release_date, runtime, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [
            movie.title,
            movie.description,
            movie.genre,
            movie.director,
            movie.release_date,
            movie.runtime,
            movie.poster_url
        ];

        const result = await db.run(sql, params);

        // Return created movie
        return Movie.getById(result.lastId);
    }

    static async update(id, movie) {
        const sql = 'UPDATE movies SET title = ?, description = ?, genre = ?, director = ?, release_date = ?, runtime = ?, poster_url = ? WHERE id = ?';
        const params = [
            movie.title,
            movie.description,
            movie.genre,
            movie.director,
            movie.release_date,
            movie.runtime,
            movie.poster_url,
            id
        ];

        const result = await db.run(sql, params);

        // Return updated movie
        return Movie.getById(result.lastID);
    }

    static async delete(id) {
        const sql = 'DELETE FROM movies WHERE id = ?';
        const params = [id];

        await db.run(sql, params);
    }
}

export default Movie;
