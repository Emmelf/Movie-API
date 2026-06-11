import { Link } from "react-router-dom";
import { IMG_BASE } from "../api";

export default function MediaCard({ item, type, search, onAddFavorite }) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;
    const link = type === "movie" ? `/film/${item.id}` : `/serie/${item.id}`;

    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition-transform hover:-translate-y-1 hover:shadow-lg">
            <Link to={link} state={{ search }} className="flex flex-1 flex-col">
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
            </Link>
            {onAddFavorite && (
                <button
                    onClick={() => onAddFavorite(item)}
                    className="m-3 mt-0 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-600 transition-colors"
                >
                    ★ Ajouter aux favoris
                </button>
            )}
        </div>
    );
}