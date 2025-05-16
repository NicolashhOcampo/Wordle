import { Link, Outlet } from "react-router";


export default function Layout() {
  return (
    <div className="h-full flex flex-col">
      {/* Navbar común */}
      <nav className="w-140 justify-between text-white p-4 m-auto flex gap-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/create" className="hover:underline">Crear Wordle</Link>
      </nav>

      {/* Contenido variable */}
      <main className="flex-1 h-full p-4">
        <Outlet />
      </main>
    </div>
  );
}
