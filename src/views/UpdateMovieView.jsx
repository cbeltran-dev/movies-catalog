import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useGetAxios from '../services/useGetAxios';
import movieService from '../services/movieService';

const UpdateMovieView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categoriesData } = useGetAxios(`${import.meta.env.VITE_API_URI}/categories/get`);
  const availableCategories = categoriesData?.data || [];

  const [formData, setFormData] = useState({
    name: location.state.movieProp.name,
    releaseYear: location.state.movieProp.releaseYear,
    synopsis: location.state.movieProp.synopsis,
    categories: location.state.movieProp.categories,
    img: location.state.movieProp.img
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCategory = (category) => {
    if (!formData.categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };

  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmDelete = await Swal.fire({
            title: `¿Estás seguro de actualizar "${location.state.movieProp.name}"?`,
            
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Actualizar",
            confirmButtonColor: '#28A312',
            color: "#f4f4f4",
            background: "#252836"
          });
        if(!confirmDelete.isConfirmed) return;
    try {
      const response = await movieService.update(location.state.movieProp.movieId, formData);
      if (response.success) {
        
        Swal.fire({
          icon: "success",
          title: "Película Actualziada",
          text: `${formData.name} se actualizó exitosamente`,
          confirmButtonColor: "#9333ea",
          background: "#252836",
          color: "#fff"
        }).then(() => {
          navigate('/catalog');
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#9333ea",
        background: "#252836",
        color: "#fff"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d29] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#252836] rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Actualizar Película: "{location.state.movieProp.name}"</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Nombre de la película *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Inception"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {/* Sinopsis */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Sinopsis *
              </label>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleInputChange}
                placeholder="Describe la trama de la película..."
                rows="4"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                required
              />
            </div>

            {/* Año de estreno */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Año de estreno *
              </label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleInputChange}
                placeholder="Ej: 2010"
                min="1900"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {/* URL de imagen */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                URL de la imagen *
              </label>
              <input
                type="url"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/poster.jpg"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Categorías *
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableCategories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          addCategory(category);
                        } else {
                          removeCategory(category);
                        }
                      }}
                      className="w-4 h-4 accent-purple-600 cursor-pointer"
                    />
                    <p className="text-gray-300 text-sm group-hover:text-purple-400 transition-colors">
                      {category}
                    </p>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors cursor-pointer"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovieView;