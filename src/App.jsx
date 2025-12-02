import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import LoginView from "./views/LoginView"
import Navbar from "./components/Navbar"
import CatalogView from "./views/CatalogView"
import AuthRedirect from "./components/AuthRedirect"
import RegisterView from "./views/RegisterView"
import CreateMovieView from "./views/CreateMovieView"
import UpdateMovieView from "./views/UpdateMovieView"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div className="min-h-screen bg-[#1a1d29]">
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthRedirect> <LoginView /> </AuthRedirect>} />
        <Route path="/catalog" element={<ProtectedRoute><CatalogView /></ProtectedRoute>} />
        <Route path="/register" element={<AuthRedirect> <RegisterView /> </AuthRedirect>} />
        <Route path="/create" element={<ProtectedRoute><CreateMovieView /></ProtectedRoute>} />
        <Route path="/update" element={<ProtectedRoute><UpdateMovieView /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App