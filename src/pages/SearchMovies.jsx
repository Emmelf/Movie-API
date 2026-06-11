import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMovies, IMG_BASE } from '../api.js';
import { Modal } from '../components/Modal.jsx';
import { MovieDetails } from '../components/MovieDetails.jsx';

export function SearchMovies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedMovieId = searchParams.get('movieId');

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query);
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors de la recherche:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query.trim() });
    }
  };

  const handleMovieClick = (movieId) => {
    setSearchParams({ query, movieId });
  };

  const handleCloseModal = () => {
    setSearchParams({ query });
  };

  return (
    <main className="flex flex-1 flex-col gap-6 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">🎬 Recherche de Films</h1>
        <Link
          to="/"
          className="rounded-lg bg-gray-400 px-4 py-2 text-white transition-colors hover:bg-gray-500"
        >
          ← Accueil
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Rechercher
        </button>
      </form>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          Erreur: {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
          Aucun film trouvé pour "{query}"
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="mb-4 text-gray-600">{results.length} résultat(s)</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="group cursor-pointer rounded-lg bg-white shadow transition-transform hover:scale-105"
              >
                {movie.poster_path ? (
                  <img
                    src={`${IMG_BASE}${movie.poster_path}`}
                    alt={movie.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                ) : (
                  <div className="h-48 w-full rounded-t-lg bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Pas d'image</span>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="line-clamp-2 font-semibold group-hover:text-blue-600">
                    {movie.title}
                  </h3>
                  {movie.release_date && (
                    <p className="text-sm text-gray-600">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}
                  {movie.vote_average && (
                    <p className="mt-2 text-sm font-semibold">
                      ⭐ {movie.vote_average.toFixed(1)}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={!!selectedMovieId} onClose={handleCloseModal}>
        {selectedMovieId && (
          <MovieDetails movieId={selectedMovieId} onClose={handleCloseModal} />
        )}
      </Modal>
    </main>
  );
}

