import { useRef, useState } from "react";
import useAuth from "../services/useAuth"
import { Link, useNavigate } from "react-router-dom";

const RegisterView = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const registerOk = await registerUser(email, password);

      if (registerOk) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d29] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#252836] rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Registro</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Correo
              </label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@email.com"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                ref={emailRef}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                ref={passwordRef}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Crear Cuenta
            </button>
          </form>

          {/* Link adicional */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-purple-500 hover:text-purple-400 transition-colors">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterView