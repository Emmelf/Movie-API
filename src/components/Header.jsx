import { Link } from "react-router-dom";

export function Header({ listItems, logo }) {
    return (
        <div className="shadow bg-white">
            <div className="h-16 mx-auto px-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {logo && <img src={logo} alt="logo" className="h-8" />}
                    <Link to="/" className="text-2xl hover:text-cyan-500 transition-colors">
                        Movies & Series API
                    </Link>
                </div>
                <nav className="flex items-center gap-4">
                    <Link to="/genres" className="text-sm font-medium hover:text-cyan-500 transition-colors">
                        Genres
                    </Link>
                    <Link to="/recommandations" className="text-sm font-medium hover:text-cyan-500 transition-colors">
                        Recommandations
                    </Link>
                    <Link to="/favoris" className="text-sm font-medium hover:text-cyan-500 transition-colors">
                        ★ Favoris
                    </Link>
                </nav>
            </div>
        </div>
    );
}