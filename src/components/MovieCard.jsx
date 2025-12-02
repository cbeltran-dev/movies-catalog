import movieService from '../services/movieService';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Flip, toast } from 'react-toastify';
import { SquarePen, Trash } from "lucide-react"

const MovieCard = ({ movie, onDelete }) => {

  const movieProp = {
    movieId: movie.movieId,
    name: movie.name,
    synopsis: movie.synopsis,
    releaseYear: movie.releaseYear,
    img: movie.img,
    categories: movie.categories
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmDelete = await Swal.fire({
      title: `¿Estás seguro de eliminar "${movie.name}"?`,
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: '#B03E21',
      color: "#f4f4f4",
      background: "#252836"
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await movieService.delete(movie.name);
      toast.info(response.message, { position: "bottom-center", theme: "colored", autoClose: 1000, transition: Flip });

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { position: "bottom-center" });
    }
  }

  return (
    <div className="card bg-base-100 hover:bg-accent-content hover:bg-purple-950 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ">
      <figure className="aspect-2/3 bg-base-300 overflow-hidden">
        <img
          src={movie.img}
          alt={movie.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-2xl justify-between">
          {movie.name}
          <div className="badge badge-secondary badge-sm">{movie.releaseYear}</div>
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-3">
          {movie.synopsis}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {movie.categories.map((category, index) => (
            <span
              key={index}
              className="badge badge-outline badge-sm"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="card-actions justify-end mt-3">
          <Link
            to="/update"
            state={{ movieProp }}
            className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white
              font-semibold rounded-md cursor-pointer 
              shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            Editar
            <SquarePen size={15} />
          </Link>
          <button
            onClick={handleSubmit}
            className="btn btn-sm bg-amber-800 hover:bg-amber-900 text-white
                      hover:text-orange-100 font-semibold rounded-md cursor-pointer 
                      shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Eliminar <Trash size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;