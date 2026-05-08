import { useEffect, useState } from 'react'
import axios from 'axios'

const INSTALACIONES = [
  { id: 1, nombre: 'Cancha 1 (Tenis)' },
  { id: 2, nombre: 'Cancha 2 (Tenis)' },
  { id: 3, nombre: 'Campo de fútbol' },
  { id: 4, nombre: 'Piscina principal' },
  { id: 5, nombre: 'Gimnasio' },
  { id: 6, nombre: 'Salón de eventos' },
]

export default function Reservas() {
  const [reservas, setReservas] = useState([])
  const [form, setForm] = useState({
    socio_id: '', instalacion_id: '1',
    fecha: '', hora_inicio: '', hora_fin: ''
  })

  const cargar = () => axios.get('http://localhost:3000/api/reservas').then(r => setReservas(r.data))

  useEffect(() => { cargar() }, [])

  const handleSubmit = async () => {
    await axios.post('http://localhost:3000/api/reservas', form)
    setForm({ socio_id:'', instalacion_id:'1', fecha:'', hora_inicio:'', hora_fin:'' })
    cargar()
  }

  const cancelar = async (id) => {
    await axios.delete(`http://localhost:3000/api/reservas/${id}`)
    cargar()
  }

  return (
    <div>
      <h1 className="page-title">Reservas</h1>

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>ID Socio</label>
            <input value={form.socio_id} onChange={e => setForm({...form, socio_id: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Instalación</label>
            <select value={form.instalacion_id} onChange={e => setForm({...form, instalacion_id: e.target.value})}>
              {INSTALACIONES.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Hora inicio</label>
            <input type="time" value={form.hora_inicio} onChange={e => setForm({...form, hora_inicio: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Hora fin</label>
            <input type="time" value={form.hora_fin} onChange={e => setForm({...form, hora_fin: e.target.value})} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Crear reserva</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Socio</th><th>Instalación</th><th>Fecha</th><th>Hora inicio</th><th>Hora fin</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0
            ? <tr><td colSpan="7" style={{textAlign:'center',color:'#aaa',padding:'2rem'}}>No hay reservas para hoy</td></tr>
            : reservas.map(r => (
              <tr key={r.id}>
                <td>{r.socio}</td>
                <td>{r.instalacion}</td>
                <td>{r.fecha?.slice(0,10)}</td>
                <td>{r.hora_inicio}</td>
                <td>{r.hora_fin}</td>
                <td><span className="badge badge-activo">{r.estado}</span></td>
                <td><button className="btn btn-danger" onClick={() => cancelar(r.id)}>Cancelar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}