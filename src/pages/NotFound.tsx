import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <Link to="/" className="text-green-400 underline">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;