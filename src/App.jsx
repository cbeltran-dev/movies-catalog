import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import LoginView from "./views/LoginView"
import Navbar from "./components/Navbar"
import CatalogView from "./views/CatalogView"
import AuthRedirect from "./components/AuthRedirect"
import RegisterView from "./views/RegisterView"
import CreateMovieView from "./views/CreateMovieView"
import UpdateMovieView from "./views/UpdateMovieView"

const App = () => {
  return (
    <div className="min-h-screen bg-[#1a1d29]">
      <Navbar />
      <Routes>
        <Route path="/" element={<CatalogView/> }/>
        <Route path="/login" element={<AuthRedirect> <LoginView /> </AuthRedirect>} />
        <Route path="/register" element={<AuthRedirect> <RegisterView /> </AuthRedirect>}/>
        <Route path="/create" element={<CreateMovieView/>} />
        <Route path="/update" element={<UpdateMovieView/>} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App