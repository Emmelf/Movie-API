# 🎬 TMDB App — React

Application React de recherche de films et séries, construite dans le cadre d'un TP de consommation d'API REST (TMDB via Express).

## Stack technique

- **React** (hooks, composants fonctionnels)
- **React Router v6** — navigation et paramètres d'URL
- **Tailwind CSS** — stylisation
- **Fetch API** — appels HTTP vers l'API Express

---

## Prérequis

- Node.js >= 18
- npm ou yarn

---

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd <nom-du-projet>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm run dev
```

> L'application est accessible sur `http://localhost:5173` (Vite).

---

## Fonctionnalités

### Partie 1 — Recherche
- Recherche de films via `GET /api/movies/search?query=...`
- Recherche de séries via `GET /api/tv/search?query=...`
- Affichage en cartes : titre, affiche, date de sortie, description
- Pagination côté API (`page` en query param)
- Gestion des états : chargement, aucun résultat

### Partie 2 — Détail
- Page de détail accessible au clic sur une carte
- URL avec identifiant (`/film/:id` ou `/serie/:id`)
- La liste de résultats reste en place (pas de rechargement)
- Infos affichées : synopsis, genres, casting, date de sortie

### Partie 3 — Favoris films
- Ajout d'un film en favori (`POST /api/favorites/movies`)
- Statut par défaut : `pas vu`
- Consultation des favoris (`GET /api/favorites/movies`)
- Suppression (`DELETE /api/favorites/movies/:id`)

### Partie 4 — Navigation par genre
- Chargement des genres via `GET /api/genres/movies`
- Affichage des films par genre (`GET /api/movies/genre/:genreId`)
- Tri par popularité décroissante, avec pagination

### Partie 5 & 6 — Favoris séries
- Ajout d'une série en favori (`POST /api/favorites/series`)
- Consultation (`GET /api/favorites/series`)
- Suppression (`DELETE /api/favorites/series/:id`)

---

## Structure du projet

```
src/
├── api.js            # Tous les appels fetch centralisés
├── components/       # Composants réutilisables (Card, Loader…)
├── pages/            # Pages principales (Home, Search, Detail, Favoris…)
├── App.jsx           # Routes principales
└── main.jsx          # Point d'entrée
```

---

## Routes

| Chemin | Description |
|---|---|
| `/` | Page d'accueil |
| `/search-movies` | Recherche de films |
| `/search-series` | Recherche de séries |
| `/favoris` | Films et séries favoris |
| `/genres` | Navigation par genre |
| `/recommandations` | Films / séries recommandés |

---

## Notes

- Les appels API sont centralisés dans `src/api.js`.
- Les images sont servies via `https://image.tmdb.org/t/p/w342`.
- L'API distante est hébergée sur `https://api-media-ipssi.julienpoirier-webdev.com` — aucun serveur local à lancer.
