import { create } from "zustand"
import { saveStorage, getStorage, removeStorage } from "../utils/localStorageUtils"
import { toast, Zoom } from "react-toastify"
import axios from "axios"


const KEY_AUTH = "auth_token"
const URI= import.meta.env.VITE_API_URI;
const useAuth = create((set) => ({
  
  user: getStorage(KEY_AUTH)?.user || null,
  token: getStorage(KEY_AUTH)?.user || null,
  isLoged: getStorage(KEY_AUTH)?.user || false,
  
  registerUser: async (userInfo) => {
    
    try {
      const response = await axios.post(`${URI}/user/save/admin`, userInfo);
      if (response.status === 201) {
        toast.success("Usuario registrado");
        return true;
      }else{
        throw new Error("Error al registrar usuario")
      }
    } catch (error) {
      console.log(error);
    }
  },
  loginUser: async(email, password) => {
    try {
      // const URL = "http://localhost:8080/api/v1/user/login";
      const response = await axios.post(`${URI}/user/login`, {username: email, password: password });
      // console.log("Response:", response);
      if (response.status === 200) {
        // const { token, username } = response.data;
        const token = response.data;
        saveStorage(KEY_AUTH, {token: token, user: email, isLoged: true});
        toast.success(`Bienvenido, ${email}`,{
        position: "bottom-center",
        autoClose: 1500,
        theme: "colored",
        transition: Zoom,
        });
        set({ user: email, token: token, isLoged: true})
        return true;
      }else{
        throw new Error("Error al ingresar");
      }
    } catch (error) {
      console.error("Error completo:", error);
    toast.error(error.response?.data?.message || "Error al iniciar sesión",
      {position: "bottom-center",
        autoClose: 1000,
        theme: "colored"
      });
    return false;
    }
  },
  logOut: () => {
    removeStorage(KEY_AUTH);
    set({user:null, token:null, isLoged: false})
  }
}))

export default useAuth;