import {Header} from "./components/Header.jsx";
import {Footer} from "./components/Footer.jsx";

function App() {

    const items = ["Lorem", "Ipsum", "Dolores"];

    const logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Vite_Logo_2026.svg/3840px-Vite_Logo_2026.svg.png"

  return (
        <div className="flex min-h-svh flex-col">
            <Header listItems={items} logo={logo} />
            <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-6">
                <h1 className="text-4xl font-bold">Hello Vite + React!</h1>
            </main>
            <Footer />
        </div>
  )
}

export default App