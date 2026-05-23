import { useEffect, useState } from 'react'
import axios from 'axios'

const INSTALACIONES = [
  { nombre: 'Tenis',         icon: '🎾', color: '#1D9E75', bg: '#0d3d2a', uso: 9,  cap: 10 },
  { nombre: 'Fútbol',        icon: '⚽', color: '#5b9bd5', bg: '#0d1f3a', uso: 3,  cap: 5  },
  { nombre: 'Piscina',       icon: '🏊', color: '#7f8de8', bg: '#1a1a3a', uso: 25, cap: 50 },
  { nombre: 'Gimnasio',      icon: '🏋️', color: '#f39c12', bg: '#3a2e0a', uso: 32, cap: 40 },
  { nombre: 'Salón eventos', icon: '🎉', color: '#e74c3c', bg: '#3a0d0d', uso: 0,  cap: 1  },
]

const RESERVAS_DEMO = [
  { ini:'CR', nombre:'Carlos Ríos',       det:'Tenis — Cancha 2 · 10:00 am', estado:'confirmada', bg:'#0d3d2a', col:'#1D9E75' },
  { ini:'ML', nombre:'María López',       det:'Piscina · 11:00 am',           estado:'confirmada', bg:'#1a1a3a', col:'#7f8de8' },
  { ini:'JP', nombre:'Juan Pérez',        det:'Gimnasio · 12:00 pm',          estado:'pendiente',  bg:'#3a2e0a', col:'#f39c12' },
  { ini:'AT', nombre:'Ana Torres',        det:'Fútbol — Campo 1 · 3:00 pm',   estado:'pendiente',  bg:'#3a0d0d', col:'#e74c3c' },
  { ini:'RG', nombre:'Roberto Gutiérrez', det:'Tenis — Cancha 1 · 5:00 pm',   estado:'confirmada', bg:'#0d3d2a', col:'#1D9E75' },
]

export default function Dashboard() {
  const [socios, setSocios] = useState([])
  const [reservas, setReservas] = useState([])
  const [trabajadores, setTrabajadores] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/socios').then(r => setSocios(r.data.data || r.data)).catch(()=>{})
    axios.get('http://localhost:3000/api/reservas').then(r => setReservas(r.data.data || r.data)).catch(()=>{})
    axios.get('http://localhost:3000/api/trabajadores').then(r => setTrabajadores(r.data.data || r.data)).catch(()=>{})
  }, [])

  const vencidos = socios.filter(s => s.estado === 'vencido').length

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="cards-grid">
        <div className="metric-card">
          <div className="metric-label">👥 Socios activos</div>
          <div className="metric-value">{socios.length}</div>
          <div className="metric-sub">en el sistema</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">📅 Reservas hoy</div>
          <div className="metric-value">{reservas.length}</div>
          <div className="metric-sub">registradas</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">🧑‍💼 Trabajadores</div>
          <div className="metric-value">{trabajadores.length}</div>
          <div className="metric-sub">registrados</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">💳 Membresías venc.</div>
          <div className="metric-value danger">{vencidos || 0}</div>
          <div className="metric-sub">requieren atención</div>
        </div>
      </div>

      <div className="grid2">
        <div className="dark-card">
          <div className="dark-card-title">Instalaciones — uso hoy</div>
          {INSTALACIONES.map(i => (
            <div className="inst-row" key={i.nombre}>
              <div className="inst-icon" style={{background: i.bg}}>{i.icon}</div>
              <div className="inst-name">{i.nombre}</div>
              <div className="bar-wrap">
                <div className="bar-fill" style={{width:`${(i.uso/i.cap)*100}%`, background: i.color}}></div>
              </div>
              <div className="inst-count">{i.uso}/{i.cap}</div>
            </div>
          ))}
        </div>

        <div className="dark-card">
          <div className="dark-card-title">Próximas reservas</div>
          {RESERVAS_DEMO.map((r,idx) => (
            <div className="reserva-item" key={idx}>
              <div className="avatar" style={{background:r.bg, color:r.col}}>{r.ini}</div>
              <div className="reserva-info">
                <div className="reserva-nombre">{r.nombre}</div>
                <div className="reserva-det">{r.det}</div>
              </div>
              <span className={`badge badge-${r.estado}`}>
                {r.estado.charAt(0).toUpperCase()+r.estado.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}