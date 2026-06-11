import { Link } from 'react-router-dom';

export function SearchSeries() {
  return (
    <main className="flex flex-1 flex-col gap-6 bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Recherche de Séries</h1>
        <Link
          to="/"
          className="rounded-lg bg-gray-400 px-4 py-2 text-white transition-colors hover:bg-gray-500"
        >
          ← Accueil
        </Link>
      </div>
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-gray-600">Page de recherche de séries - À compléter</p>
      </div>
    </main>
  );
}

