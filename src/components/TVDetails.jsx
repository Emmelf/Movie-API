import { useState, useEffect } from 'react';
import { getTV, IMG_BASE } from '../api.js';

export function TVDetails({ tvId, onClose }) {
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tvId) return;

    const loadTV = async () => {
      try {
        setLoading(true);
        const data = await getTV(tvId);
        setTv(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTV();
  }, [tvId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        Erreur: {error}
      </div>
    );
  }

  if (!tv) {
    return <div className="text-gray-600">Série introuvable</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {tv.poster_path && (
          <div className="flex-shrink-0">
            <img
              src={`${IMG_BASE}${tv.poster_path}`}
              alt={tv.name}
              className="h-auto w-40 rounded-lg"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-bold">{tv.name}</h2>
          {tv.first_air_date && (
            <p className="mb-4 text-gray-600">
              📅 Première diffusion: {new Date(tv.first_air_date).toLocaleDateString('fr-FR')}
            </p>
          )}

          {tv.genres && tv.genres.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 font-semibold text-gray-700">Genres:</p>
              <div className="flex flex-wrap gap-2">
                {tv.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tv.number_of_seasons && (
            <p className="mb-2 text-gray-700">
              📺 <span className="font-semibold">{tv.number_of_seasons}</span> saison(s)
            </p>
          )}

          {tv.number_of_episodes && (
            <p className="mb-4 text-gray-700">
              📹 <span className="font-semibold">{tv.number_of_episodes}</span> épisode(s)
            </p>
          )}

          {tv.vote_average && (
            <p className="text-lg">
              ⭐ Note: <span className="font-bold">{tv.vote_average.toFixed(1)}/10</span>
            </p>
          )}
        </div>
      </div>

      {tv.overview && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Synopsis</h3>
          <p className="leading-relaxed text-gray-700">{tv.overview}</p>
        </div>
      )}

      {tv.aggregate_credits?.cast && tv.aggregate_credits.cast.length > 0 && (
        <div>
          <h3 className="mb-3 text-xl font-semibold">Casting Principal</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {tv.aggregate_credits.cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="rounded-lg bg-gray-50 p-3">
                {actor.profile_path && (
                  <img
                    src={`${IMG_BASE}${actor.profile_path}`}
                    alt={actor.name}
                    className="mb-2 h-32 w-full rounded object-cover"
                  />
                )}
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">
                  {actor.roles?.[0]?.character || 'Personnage'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

