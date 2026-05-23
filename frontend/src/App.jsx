import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Socios from './pages/Socios'
import Reservas from './pages/Reservas'
import './App.css'
import Trabajadores from './pages/Trabajadores'

export default function App({ usuario, onLogout }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">🏆</div>
          <div>
            <div>ClubManager</div>
            <div className="logo-sub">{usuario}</div>
          </div>
        </div>
        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/socios">Socios</NavLink>
          <NavLink to="/reservas">Reservas</NavLink>
          <NavLink to="/trabajadores">Trabajadores</NavLink>
        </nav>
        <button onClick={onLogout} style={{ marginTop:'auto', padding:'9px', background:'#2a0d0d', color:'#e74c3c', border:'1px solid #3a1515', borderRadius:'8px', cursor:'pointer', fontFamily:'Arial', fontSize:'13px' }}>
          Cerrar sesión
        </button>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/socios" element={<Socios />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/trabajadores" element={<Trabajadores />} />
        </Routes>
      </main>
    </div>
  )
}