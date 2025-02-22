import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  const { user } = useAuthContext()
  return (
    <div className='font-poppins'>

      <BrowserRouter>
          <Navbar />
          <div className='bg-gray-200 px-10 h-[90vh]'>
            <Routes>
              <Route path="/"  element={user ? <Home /> : <Navigate to="/login" />} />

              <Route  path='/login' element={!user ? <Login /> : <Navigate to="/" />} />

              <Route  path='/signup'element={!user ? <Signup /> : <Navigate to="/" />} />

            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
