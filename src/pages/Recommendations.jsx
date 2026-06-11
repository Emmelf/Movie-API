import { useState, useEffect } from "react";
import { getFavoriteMovies, getMovie, getMoviesByGenre, addFavoriteMovie } from "../api";
import MediaCard from "../components/MediaCard";

export function Recommendations() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [baseMovie, setBaseMovie] = useState(null);
    const [results, setResults] = useState([]);
    const [favMessage, setFavMessage] = useState("");

    useEffect(() => {
        setLoading(true);
        setError(null);

        getFavoriteMovies()
            .then((favorites) => {
                const list = Array.isArray(favorites) ? favorites : favorites.results || [];
                if (list.length === 0) {
                    throw new Error("Ajoute au moins un film en favori pour obtenir des recommandations.");
                }
                // On prend le dernier favori ajouté comme base
                const last = list[list.length - 1];
                return getMovie(last.id);
            })
            .then((movie) => {
                setBaseMovie(movie);
                const genreId = movie.genres?.[0]?.id;
                if (!genreId) {
                    throw new Error("Impossible de déterminer un genre pour ce film.");
                }
                return getMoviesByGenre(genreId, 1);
            })
            .then((data) => {
                setResults((data.results || []).filter((m) => m.id !== baseMovie?.id).slice(0, 10));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleAddFavorite(movie) {
        addFavoriteMovie(movie)
            .then(() => setFavMessage(`"${movie.title}" ajouté aux favoris !`))
            .catch((err) => setFavMessage(err.message))
            .finally(() => setTimeout(() => setFavMessage(""), 3000));
    }

    return (
        <main className="flex flex-1 flex-col items-center bg-gray-50 p-6">
            <h1 className="text-4xl font-bold mb-2">Films recommandés</h1>

            {baseMovie && (
                <p className="text-gray-500 mb-6">
                    Basé sur votre favori : <span className="font-semibold">{baseMovie.title}</span>
                    {baseMovie.genres?.[0] && ` (genre : ${baseMovie.genres[0].name})`}
                </p>
            )}

            {favMessage && (
                <div className="mb-4 w-full max-w-md rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">
                    {favMessage}
                </div>
            )}

            {loading && <p className="text-gray-500">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}

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
        </main>
    );
}