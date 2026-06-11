import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTV, IMG_BASE } from "../api";

export default function SeriesDetail({ id: propId, onAddFavorite }) {
    const params = useParams();
    const navigate = useNavigate();
    const id = propId || params.id;

    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getTV(id)
            .then(setSerie)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-gray-500">Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!serie) return null;

    const cast = (serie.aggregate_credits?.cast || serie.credits?.cast || []).slice(0, 10);

    return (
        <div>
            {!propId && (
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                    ← Retour
                </button>
            )}
            <div className="flex flex-col gap-6 md:flex-row">
                {serie.poster_path && (
                    <img
                        src={`${IMG_BASE}${serie.poster_path}`}
                        alt={serie.name}
                        className="w-full max-w-xs rounded-lg shadow self-start"
                    />
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{serie.name}</h1>
                    <p className="text-gray-500 mb-1">Première diffusion : {serie.first_air_date || "Inconnue"}</p>
                    <p className="text-gray-500 mb-4">
                        Genres : {serie.genres?.map((g) => g.name).join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-700 mb-4">{serie.overview || "Pas de synopsis disponible."}</p>

                    {onAddFavorite && (
                        <button
                            onClick={() => onAddFavorite(serie)}
                            className="mb-6 rounded-md bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-600 transition-colors"
                        >
                            ★ Ajouter aux favoris
                        </button>
                    )}

                    {cast.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold mb-3">Casting principal</h3>
                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
                                {cast.map((actor) => (
                                    <div key={actor.cast_id || actor.id} className="text-center text-sm">
                                        {actor.profile_path && (
                                            <img
                                                src={`${IMG_BASE}${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full rounded-md mb-1 object-cover"
                                            />
                                        )}
                                        <p className="font-medium">{actor.name}</p>
                                        <p className="text-gray-500">
                                            {actor.character || actor.roles?.[0]?.character || 'Personnage'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}