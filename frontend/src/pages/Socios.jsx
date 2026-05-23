import { useEffect, useState } from 'react'
import axios from 'axios'

function diasRestantes(fecha) {
  if (!fecha) return null
  const hoy = new Date()
  const venc = new Date(fecha)
  return Math.ceil((venc - hoy) / (1000 * 60 * 60 * 24))
}

function BadgeVencimiento({ fecha }) {
  const dias = diasRestantes(fecha)
  if (dias === null) return null
  if (dias < 0)  return <span className="badge badge-cancelada">Vencido</span>
  if (dias <= 30) return <span className="badge badge-pendiente">{dias}d restantes</span>
  return <span className="badge badge-activo">Vigente</span>
}

export default function Socios() {
  const [socios, setSocios] = useState([])
  const [form, setForm] = useState({ nombre:'', dni:'', email:'', telefono:'', tipo_membresia:'basico', fecha_vencimiento:'' })
  const [busqueda, setBusqueda] = useState('')

  const cargar = () => axios.get('http://localhost:3000/api/socios')
    .then(r => setSocios(r.data.data || r.data))

  useEffect(() => { cargar() }, [])

  const handleSubmit = async () => {
    if (!form.nombre || !form.dni) return alert('Nombre y DNI son requeridos')
    await axios.post('http://localhost:3000/api/socios', form)
    setForm({ nombre:'', dni:'', email:'', telefono:'', tipo_membresia:'basico', fecha_vencimiento:'' })
    cargar()
  }

  const filtrados = socios.filter(s =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    s.dni.includes(busqueda)
  )

  const proxVencer = socios.filter(s => {
    const d = diasRestantes(s.fecha_vencimiento)
    return d !== null && d >= 0 && d <= 30
  }).length

  return (
    <div>
      <h1 className="page-title">Socios</h1>

      {proxVencer > 0 && (
        <div style={{ background:'#3a2e0a', border:'1px solid #f39c12', borderRadius:'10px', padding:'10px 16px', marginBottom:'1rem', color:'#f39c12', fontFamily:'Arial', fontSize:'13px' }}>
          ⚠️ {proxVencer} socio{proxVencer > 1 ? 's' : ''} con membresía próxima a vencer en los próximos 30 días
        </div>
      )}

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group"><label>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} /></div>
          <div className="form-group"><label>DNI</label>
            <input value={form.dni} onChange={e => setForm({...form, dni:e.target.value})} /></div>
          <div className="form-group"><label>Email</label>
            <input value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
          <div className="form-group"><label>Teléfono</label>
            <input value={form.telefono} onChange={e => setForm({...form, telefono:e.target.value})} /></div>
          <div className="form-group"><label>Membresía</label>
            <select value={form.tipo_membresia} onChange={e => setForm({...form, tipo_membresia:e.target.value})}>
              <option value="basico">Básico</option>
              <option value="plata">Plata</option>
              <option value="oro">Oro</option>
            </select></div>
          <div className="form-group"><label>Vencimiento</label>
            <input type="date" value={form.fecha_vencimiento} onChange={e => setForm({...form, fecha_vencimiento:e.target.value})} /></div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Registrar socio</button>
      </div>

      <div style={{ marginBottom:'1rem' }}>
        <input
          placeholder="🔍 Buscar por nombre o DNI..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ width:'100%', padding:'9px 14px', border:'1px solid #2a2a4a', borderRadius:'8px', background:'#1a1a2e', color:'#ddd', fontFamily:'Arial', fontSize:'13px', outline:'none' }}
        />
      </div>

      <table>
        <thead>
          <tr><th>Nombre</th><th>DNI</th><th>Email</th><th>Membresía</th><th>Vencimiento</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {filtrados.map(s => (
            <tr key={s.id}>
              <td>{s.nombre}</td>
              <td>{s.dni}</td>
              <td>{s.email}</td>
              <td><span className={`badge badge-${s.tipo_membresia}`}>{s.tipo_membresia}</span></td>
              <td>{s.fecha_vencimiento?.slice(0,10)}</td>
              <td><BadgeVencimiento fecha={s.fecha_vencimiento} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}