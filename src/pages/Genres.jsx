import { useState, useEffect } from "react";
import { getMovieGenres, getMoviesByGenre, addFavoriteMovie } from "../api";
import MediaCard from "../components/MediaCard";

export function Genres() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favMessage, setFavMessage] = useState("");

    useEffect(() => {
        getMovieGenres()
            .then((data) => setGenres(data.genres || []))
            .catch((err) => setError(err.message));
    }, []);

    function loadGenre(genre, p = 1) {
        setSelectedGenre(genre);
        setLoading(true);
        setError(null);
        getMoviesByGenre(genre.id, p)
            .then((data) => {
                setResults(data.results || []);
                setTotalPages(data.total_pages || 1);
                setPage(p);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    function handleAddFavorite(movie) {
        addFavoriteMovie(movie)
            .then(() => setFavMessage(`"${movie.title}" ajouté aux favoris !`))
            .catch((err) => setFavMessage(err.message))
            .finally(() => setTimeout(() => setFavMessage(""), 3000));
    }

    return (
        <main className="flex flex-1 flex-col items-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold mb-6">Parcourir par genre</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-4xl">
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        onClick={() => loadGenre(genre)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            selectedGenre?.id === genre.id
                                ? "bg-cyan-500 text-white"
                                : "bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {favMessage && (
                <div className="mb-4 w-full max-w-md rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">
                    {favMessage}
                </div>
            )}

            {loading && <p className="text-gray-500">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && selectedGenre && results.length === 0 && (
                <p className="text-gray-500">Aucun résultat trouvé.</p>
            )}

            <div className="grid w-full max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {results.map((movie) => (
                    <MediaCard
                        key={movie.id}
                        item={movie}
                        type="movie"
                        onAddFavorite={handleAddFavorite}
                    />
                ))}
            </div>

            {results.length > 0 && (
                <div className="mt-6 flex items-center gap-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => loadGenre(selectedGenre, page - 1)}
                        className="rounded-md bg-white border border-gray-300 px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        ← Précédent
                    </button>
                    <span className="text-gray-600">Page {page} / {totalPages}</span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => loadGenre(selectedGenre, page + 1)}
                        className="rounded-md bg-white border border-gray-300 px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </main>
    );
}