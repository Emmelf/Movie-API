import { useSearchParams } from "react-router-dom";
import { IMG_BASE } from "../api";

export default function MediaCard({ item, type, search, onAddFavorite }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;

    const handleClick = () => {
        const paramKey = type === "movie" ? "movieId" : "tvId";
        setSearchParams({ ...Object.fromEntries(searchParams), [paramKey]: item.id });
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
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
            <div className="flex flex-1 flex-col p-3">
                <h3 className="font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-2">{date || "Date inconnue"}</p>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {item.overview || "Pas de description."}
                </p>
            </div>
            {onAddFavorite && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddFavorite(item);
                    }}
                    className="m-3 mt-0 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors"
                >
                    ★ Ajouter aux favoris
                </button>
            )}
        </div>
    );
}