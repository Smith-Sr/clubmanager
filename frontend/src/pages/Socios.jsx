import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Socios() {
  const [socios, setSocios] = useState([])
  const [form, setForm] = useState({
    nombre: '', dni: '', email: '', telefono: '',
    tipo_membresia: 'basico', fecha_vencimiento: ''
  })

  const cargar = () => axios.get('http://localhost:3000/api/socios').then(r => setSocios(r.data))

  useEffect(() => { cargar() }, [])

  const handleSubmit = async () => {
    await axios.post('http://localhost:3000/api/socios', form)
    setForm({ nombre:'', dni:'', email:'', telefono:'', tipo_membresia:'basico', fecha_vencimiento:'' })
    cargar()
  }

  return (
    <div>
      <h1 className="page-title">Socios</h1>

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
          </div>
          <div className="form-group">
            <label>DNI</label>
            <input value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Membresía</label>
            <select value={form.tipo_membresia} onChange={e => setForm({...form, tipo_membresia: e.target.value})}>
              <option value="basico">Básico</option>
              <option value="plata">Plata</option>
              <option value="oro">Oro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vencimiento</label>
            <input type="date" value={form.fecha_vencimiento} onChange={e => setForm({...form, fecha_vencimiento: e.target.value})} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Registrar socio</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th><th>DNI</th><th>Email</th><th>Membresía</th><th>Estado</th><th>Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {socios.map(s => (
            <tr key={s.id}>
              <td>{s.nombre}</td>
              <td>{s.dni}</td>
              <td>{s.email}</td>
              <td><span className={`badge badge-${s.tipo_membresia}`}>{s.tipo_membresia}</span></td>
              <td><span className={`badge badge-${s.estado}`}>{s.estado}</span></td>
              <td>{s.fecha_vencimiento?.slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}