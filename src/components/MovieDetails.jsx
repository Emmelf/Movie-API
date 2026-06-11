import { useState, useEffect } from 'react';
import { getMovie, IMG_BASE } from '../api.js';

export function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovie(movieId);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors du chargement:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
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

  if (!movie) {
    return <div className="text-gray-600">Film introuvable</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {movie.poster_path && (
          <div className="flex-shrink-0">
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="h-auto w-40 rounded-lg"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="mb-2 text-3xl font-bold">{movie.title}</h2>
          {movie.release_date && (
            <p className="mb-4 text-gray-600">
              📅 {new Date(movie.release_date).toLocaleDateString('fr-FR')}
            </p>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 font-semibold text-gray-700">Genres:</p>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.vote_average && (
            <p className="mb-4 text-lg">
              ⭐ Note: <span className="font-bold">{movie.vote_average.toFixed(1)}/10</span>
            </p>
          )}
        </div>
      </div>

      {movie.overview && (
        <div>
          <h3 className="mb-2 text-xl font-semibold">Synopsis</h3>
          <p className="leading-relaxed text-gray-700">{movie.overview}</p>
        </div>
      )}

      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <div>
          <h3 className="mb-3 text-xl font-semibold">Casting</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {movie.credits.cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="rounded-lg bg-gray-50 p-3">
                {actor.profile_path && (
                  <img
                    src={`${IMG_BASE}${actor.profile_path}`}
                    alt={actor.name}
                    className="mb-2 h-32 w-full rounded object-cover"
                  />
                )}
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

