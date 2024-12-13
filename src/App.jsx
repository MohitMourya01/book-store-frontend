import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import {AuthProvider} from './AuthContext/AuthContext.jsx'
function App() {
  

  return (
    <>
      <AuthProvider>
      <Navbar />
      <main className='min-h-screen min-w-screen-2xl mx-10 px-4 py-6 font-primary'>
      <Outlet />
      </main>
      
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App