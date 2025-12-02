
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import useAuth from '../services/useAuth';
import filmIcon from '../assets/film-strip-svgrepo-com.svg';



const Navbar = () => {
  const { isLoged, logOut } = useAuth();


  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/catalog" className="flex items-center gap-3 ">
            {/* <Film className="w-8 h-8 text-purple-400" />
             */}
            <img
              src={filmIcon}
              alt="Film icon"
              className="w-10 h-10 text-purple-400"
            />
            <h1 className="text-2xl font-bold text-white">CineHub</h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {!isLoged && (
              <div className="flex items-center gap-4">
                <Link to="/" className="px-4 py-2 block bg-transparent hover:bg-black/70 text-gray-300
                                      hover:text-white transition-colors rounded-lg shadow-none border-0 outline-none">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}
            {isLoged && (
              <div className='flex items-center gap-2'>
                
                  <Link to="/catalog" className="px-4 py-2 block bg-transparent hover:bg-black/70 text-gray-300
                                              hover:text-white transition-colors rounded-lg shadow-none border-0 outline-none">
                  Catalogo
                  </Link>
                  <Link to="/create" className=" px-4 py-2 block bg-transparent hover:bg-black/70 text-gray-300
                                              hover:text-white transition-colors rounded-lg shadow-none border-0 outline-none">
                  Crear
                  </Link>
                <button onClick={logOut} className="bg-purple-600 hover:bg-purple-700 flex items-center
                                                  text-white px-4 py-2 rounded-lg transition-all">
                  <Link to="/">Cerrar Sesión</Link>
                  <LogOut className="ml-2" size={17} />
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