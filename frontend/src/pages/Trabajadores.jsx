import { useEffect, useState } from 'react'
import axios from 'axios'

const CARGO_COLORS = {
  'Administrador': { bg:'#0d3d2a', col:'#1D9E75' },
  'Recepción':     { bg:'#0d1f3a', col:'#5b9bd5' },
  'Instructor':    { bg:'#3a2e0a', col:'#f39c12' },
  'Mantenimiento': { bg:'#1a1a3a', col:'#7f8de8' },
  'default':       { bg:'#2a2a2a', col:'#aaa' },
}

function BadgeCargo({ cargo }) {
  const c = CARGO_COLORS[cargo] || CARGO_COLORS['default']
  return <span className="badge" style={{ background:c.bg, color:c.col }}>{cargo || 'Sin cargo'}</span>
}

function getIniciales(nombre) {
  return nombre?.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() || '??'
}

export default function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState([])
  const [form, setForm] = useState({ nombre:'', email:'', password:'', cargo:'' })

  const cargar = () => axios.get('http://localhost:3000/api/trabajadores')
    .then(r => setTrabajadores(r.data.data || r.data))

  useEffect(() => { cargar() }, [])

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.password) return alert('Nombre, email y contraseña son requeridos')
    await axios.post('http://localhost:3000/api/trabajadores', form)
    setForm({ nombre:'', email:'', password:'', cargo:'' })
    cargar()
  }

  return (
    <div>
      <h1 className="page-title">Trabajadores</h1>

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group"><label>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} /></div>
          <div className="form-group"><label>Email</label>
            <input value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
          <div className="form-group"><label>Contraseña</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></div>
          <div className="form-group"><label>Cargo</label>
            <select value={form.cargo} onChange={e => setForm({...form, cargo:e.target.value})}>
              <option value="">Seleccionar...</option>
              <option value="Administrador">Administrador</option>
              <option value="Recepción">Recepción</option>
              <option value="Instructor">Instructor</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select></div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Registrar trabajador</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'12px' }}>
        {trabajadores.map(t => {
          const c = CARGO_COLORS[t.cargo] || CARGO_COLORS['default']
          return (
            <div key={t.id} style={{ background:'#1a1a2e', border:'1px solid #1e1e3a', borderRadius:'12px', padding:'1.2rem', display:'flex', flexDirection:'column', gap:'8px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:c.bg, color:c.col, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'600', fontSize:'14px', fontFamily:'Arial' }}>
                  {getIniciales(t.nombre)}
                </div>
                <div>
                  <div style={{ color:'#ddd', fontFamily:'Arial', fontSize:'13px', fontWeight:'500' }}>{t.nombre}</div>
                  <div style={{ color:'#555', fontFamily:'Arial', fontSize:'11px' }}>{t.email}</div>
                </div>
              </div>
              <BadgeCargo cargo={t.cargo} />
              <div style={{ color:'#444', fontFamily:'Arial', fontSize:'11px' }}>Desde: {t.created_at?.slice(0,10)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}