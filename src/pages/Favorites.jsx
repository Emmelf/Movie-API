import { useEffect, useState } from "react";
import { getFavoriteMovies, deleteFavoriteMovie, getFavoriteSeries, deleteFavoriteSeries, IMG_BASE } from "../api";

export default function Favorites() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getFavoriteMovies(), getFavoriteSeries()])
            .then(([m, s]) => { setMovies(m); setSeries(s); })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const removeMovie = async (id) => {
        await deleteFavoriteMovie(id);
        setMovies((prev) => prev.filter((m) => m.id !== id));
    };

    const removeSerie = async (id) => {
        await deleteFavoriteSeries(id);
        setSeries((prev) => prev.filter((s) => s.id !== id));
    };

    if (loading) return <p className="text-gray-500">Chargement...</p>;

    return (
        <div className="flex flex-col gap-10">
            <FavSection title="Films favoris" items={movies} onRemove={removeMovie} />
            <FavSection title="Séries favorites" items={series} onRemove={removeSerie} />
        </div>
    );
}

function FavSection({ title, items, onRemove }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {items.length === 0 ? (
                <p className="text-gray-500">Aucun élément pour l'instant.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {items.map((item) => (
                        <FavCard key={item.id} item={item} onRemove={onRemove} />
                    ))}
                </div>
            )}
        </div>
    );
}

function FavCard({ item, onRemove }) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;

    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
            {item.poster_path ? (
                <img
                    src={`${IMG_BASE}${item.poster_path}`}
                    alt={title}
                    className="h-72 w-full object-cover"
                />
            ) : (
                <div className="flex h-72 w-full items-center justify-center bg-gray-200 text-gray-400">
                    Pas d'image
                </div>
            )}
            <div className="flex flex-1 flex-col p-3 gap-2">
                <h3 className="font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500">{date || "Date inconnue"}</p>
                <span className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === "vu"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                }`}>
          {item.status}
        </span>
                <button
                    onClick={() => onRemove(item.id)}
                    className="mt-auto rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}