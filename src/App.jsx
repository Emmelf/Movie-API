import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import MovieSearch from "./pages/MovieSearch.jsx";
import { SeriesSearch } from "./pages/SeriesSearch.jsx";
import Favorites from "./pages/Favorites";
function App() {
    const logo = "https://www.svgrepo.com/show/526328/stream.svg"

    return (
        <BrowserRouter>
            <div className="flex min-h-svh flex-col">
                <Header logo={logo} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-movies" element={<MovieSearch />} />
                    <Route path="/search-series" element={<SeriesSearch />} />
                    <Route path="/favoris" element={<Favorites />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App