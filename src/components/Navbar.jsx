
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import useAuth from '../services/useAuth';

const Navbar = () => {
  const { isLoged, logOut } = useAuth();


  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 ">
            <Film className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">CineHub</h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {!isLoged && (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}
            {isLoged && (
              <div className='flex items-center gap-4'>
                <div className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/catalog">Catálogo</Link>
                </div>
                <div className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/create">Crear</Link>
                </div>
                <button onClick={logOut} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all">
                  <Link to="/login">Cerrar Sesión</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;