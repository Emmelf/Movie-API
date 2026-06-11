export const API_BASE = "https://api-media-ipssi.julienpoirier-webdev.com";

export const IMG_BASE = "https://image.tmdb.org/t/p/w342";

async function request(path) {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
    return res.json();
}

// Films
export function searchMovies(query, page = 1) {
    return request(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
}

export function getMovie(id) {
    return request(`/api/movies/${id}`);
}

export function getMoviesByGenre(genreId, page = 1) {
    return request(`/api/movies/genre/${genreId}?page=${page}&sortBy=popularity.desc`);
}

export function getMovieGenres() {
    return request(`/api/genres/movies`);
}

// Séries
export function searchTV(query, page = 1) {
    return request(`/api/tv/search?query=${encodeURIComponent(query)}&page=${page}`);
}

export function getTV(id) {
    return request(`/api/tv/${id}`);
}

// Favoris films
export function addFavoriteMovie(movie) {
    return fetch(`${API_BASE}/api/favorites/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            overview: movie.overview,
            status: "pas vu",
        }),
    }).then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout en favori");
        return res.json();
    });
}

export function getFavoriteMovies() {
    return request(`/api/favorites/movies`);
}

export function deleteFavoriteMovie(id) {
    return fetch(`${API_BASE}/api/favorites/movies/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la suppression");
        return res.json().catch(() => ({}));
    });
}

// Favoris séries
export function addFavoriteSeries(serie) {
    return fetch(`${API_BASE}/api/favorites/series`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: serie.id,
            name: serie.name,
            poster_path: serie.poster_path,
            first_air_date: serie.first_air_date,
            overview: serie.overview,
            status: "pas vu",
        }),
    }).then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout en favori");
        return res.json();
    });
}

export function getFavoriteSeries() {
    return request(`/api/favorites/series`);
}

export function deleteFavoriteSeries(id) {
    return fetch(`${API_BASE}/api/favorites/series/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la suppression");
        return res.json().catch(() => ({}));
    });
}