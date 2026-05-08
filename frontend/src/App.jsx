import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Socios from './pages/Socios'
import Reservas from './pages/Reservas'
import './App.css'

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🏆</span>
          <span>ClubManager</span>
        </div>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/socios">Socios</NavLink>
          <NavLink to="/reservas">Reservas</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/socios" element={<Socios />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </main>
    </div>
  )
}