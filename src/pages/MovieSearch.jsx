import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { searchMovies, addFavoriteMovie } from "../api";
import MediaCard from "../components/MediaCard";
import MovieDetail from "./MovieDetail";

export default function MovieSearch() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(location.state?.search?.query || "");
    const [page, setPage] = useState(location.state?.search?.page || 1);
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favMessage, setFavMessage] = useState("");

    const movieId = searchParams.get("movieId");

    useEffect(() => {
        if (location.state?.search) {
            const { query: q, page: p } = location.state.search;
            doSearch(q, p);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function doSearch(q, p = 1) {
        if (!q.trim()) return;
        setLoading(true);
        setError(null);
        searchMovies(q, p)
            .then((data) => {
                setResults(data.results || []);
                setTotalPages(data.total_pages || 1);
                setQuery(q);
                setPage(p);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    function handleSubmit(e) {
        e.preventDefault();
        doSearch(query, 1);
    }

    function handleAddFavorite(movie) {
        addFavoriteMovie(movie)
            .then(() => setFavMessage(`"${movie.title}" ajouté aux favoris !`))
            .catch((err) => setFavMessage(err.message))
            .finally(() => setTimeout(() => setFavMessage(""), 3000));
    }

    return (
        <main className="flex flex-1 flex-col items-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold mb-6">Recherche de films</h1>

            <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                    type="submit"
                    className="rounded-md bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-600 transition-colors"
                >
                    Rechercher
                </button>
            </form>

            {favMessage && (
                <div className="mb-4 w-full max-w-md rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">
                    {favMessage}
                </div>
            )}

            {loading && <p className="text-gray-500">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && results.length === 0 && query && (
                <p className="text-gray-500">Aucun résultat trouvé.</p>
            )}

            <div className="grid w-full max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {results.map((movie) => (
                    <MediaCard
                        key={movie.id}
                        item={movie}
                        type="movie"
                        search={{ query, page }}
                        onAddFavorite={handleAddFavorite}
                    />
                ))}
            </div>

            {results.length > 0 && (
                <div className="mt-6 flex items-center gap-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => doSearch(query, page - 1)}
                        className="rounded-md bg-white border border-gray-300 px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        ← Précédent
                    </button>
                    <span className="text-gray-600">Page {page} / {totalPages}</span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => doSearch(query, page + 1)}
                        className="rounded-md bg-white border border-gray-300 px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Suivant →
                    </button>
                </div>
            )}

            {movieId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setSearchParams({})}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSearchParams({})}
                            className="mb-4 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
                        >
                            ✕ Fermer
                        </button>
                        <MovieDetail id={movieId} onAddFavorite={handleAddFavorite} />
                    </div>
                </div>
            )}
        </main>
    );
}