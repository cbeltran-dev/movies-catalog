import { useState } from 'react'
import useGetAxios from '../services/useGetAxios';
import MovieCard from '../components/MovieCard';

const CatalogView = () => {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const { data, error } = useGetAxios(
    `http://localhost:8080/api/v1/movie/admin/search?name=&category=&page=${page}&size=9&direction=DESC&property=releaseYear&refresh=${refresh}` // ✅ Agregado &refresh=${refresh}
  );
  
  const apiData = data?.data;
  const movies = apiData?.movies || [];
  const totalPages = apiData?.totalPages || 0;
  const currentPage = apiData?.currentPage || 0;
  const hasNext = apiData?.hasNext || false;
  const hasPrevious = apiData?.hasPrevious || false;

  const handleMovieDeleted = () => {
    setRefresh(prev => prev + 1);
  }

  const previousPage = () => {
    if (hasPrevious) {
      setPage(page - 1);
    }
  }

  const nextPage = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <span>Error al cargar las películas: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-6 py-6">
      <div className="bg-black/30 rounded-lg shadow-xl p-4">
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Catálogo de Películas
            </h1>
            <p className="py-4 text-gray-400">
              Descubre nuestra colección de películas
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-6">
        {movies.map((movie, index) => (
          <MovieCard 
            key={`${movie.name}-${index}`} 
            movie={movie}
            onDelete={handleMovieDeleted} // ✅ Agregado onDelete
          />
        ))}
      </div>
      {/* Botones prev y next*/}
      <div className="flex justify-between items-center mt-6">
        <button
          className="w-[220px] bg-purple-600 hover:bg-purple-700 text-white font-medium
                    py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          onClick={previousPage}
          disabled={!hasPrevious}
        >
          ← Página Previa
        </button>

        <div className="text-center">
          <p className="text-sm font-medium">
            Página {currentPage + 1} de {totalPages}
          </p>
        </div>

        <button
          className="w-[220px] bg-purple-600 hover:bg-purple-700 text-white font-medium
                    py-3 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          onClick={nextPage}
          disabled={!hasNext}
        >
          Página Siguiente →
        </button>
      </div>
    </div>
  )
}

export default CatalogView