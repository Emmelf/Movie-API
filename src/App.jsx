import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { SearchMovies } from "./pages/SearchMovies.jsx";
import { SearchSeries } from "./pages/SearchSeries.jsx";

function App() {
    const logo = "https://www.svgrepo.com/show/526328/stream.svg"

    return (
        <BrowserRouter>
            <div className="flex min-h-svh flex-col">
                <Header logo={logo} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-movies" element={<SearchMovies />} />
                    <Route path="/search-series" element={<SearchSeries />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App