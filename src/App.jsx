import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Navbar from './Components/Navbar'
import ProtectedRoute from './Components/ProtectedRoute'



function App() {

  return (
    <Router className=" row bg-primary">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} className="col-md-1" />
        <Route path="/login" element={<Login/>} className="col-md-1" />
        <Route path="/register" element={<Register/>} className="col-md-1" />
        <Route element={<ProtectedRoute/>}>
          <Route path='dashboard' element={<Dashboard/>} className="col-md-1" />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
