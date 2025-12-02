import { useRef, useState } from "react";
import useAuth from "../services/useAuth"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function LoginView() {

  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    setRegisterError("");
    try {
      const registerOK = await registerUser(data.email, data.password);
      // console.log("usuario: ",data.email)
      if (registerOK) {
        navigate('/');
      } else {
        setRegisterError("Error al crear usuario");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d29] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#252836] rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Registro de Usuario</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Correo
              </label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@email.com"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                // ref={emailRef}
                // required
                {...register("email", {
                  required: "Este campo es obligatorio"
                })}
              />
              {errors && (<span className="text-xs text-red-600">{errors?.email?.message}</span>)}
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-[#1a1d29] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                // ref={passwordRef}
                // required
                {...register("password", {
                  required: "Este campo es obligatorio"
                })}
              />
              {errors && (<span className="text-xs text-red-600">{errors?.password?.message}</span>)}
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Crear Usuario
            </button>
            {registerError && (
              <p className="text-red-600 text-xs text-center mt-0.5 -mb-3">
                {registerError}
              </p>
            )}
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link to="/register" className="text-purple-500 hover:text-purple-400 transition-colors">
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}