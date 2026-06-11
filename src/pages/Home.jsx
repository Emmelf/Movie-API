import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-linear-to-r from-gray-900 to-indigo-600 p-6">
      <h1 className="mb-8 text-4xl font-bold text-white">Bienvenue sur Movie & Series API</h1>
      <div className="space-y-4">
        <Link
          to="/search-movies"
          className="block rounded-lg bg-blue-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          🎬 Rechercher des Films
        </Link>
        <Link
          to="/search-series"
          className="block rounded-lg bg-purple-600 px-8 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-purple-700"
        >
          📺 Rechercher des Séries
        </Link>
      </div>
    </main>
  );
}

