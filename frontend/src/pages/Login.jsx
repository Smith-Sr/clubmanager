import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('nombre', res.data.nombre)
      onLogin(res.data.nombre)
    } catch {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0f0f1a', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#1a1a2e', padding:'2.5rem', borderRadius:'16px', width:'340px', border:'1px solid #1e1e3a' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontSize:'2rem' }}>🏆</div>
          <h2 style={{ color:'#fff', fontFamily:'Arial', fontSize:'1.2rem', margin:'8px 0 4px' }}>ClubManager</h2>
          <p style={{ color:'#555', fontFamily:'Arial', fontSize:'13px' }}>Acceso para trabajadores</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            <label style={{ fontSize:'11px', color:'#666', fontFamily:'Arial', textTransform:'uppercase' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              style={{ padding:'9px 12px', border:'1px solid #2a2a4a', borderRadius:'8px', background:'#0f0f1a', color:'#ddd', fontFamily:'Arial', fontSize:'13px', outline:'none' }}
            />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            <label style={{ fontSize:'11px', color:'#666', fontFamily:'Arial', textTransform:'uppercase' }}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              style={{ padding:'9px 12px', border:'1px solid #2a2a4a', borderRadius:'8px', background:'#0f0f1a', color:'#ddd', fontFamily:'Arial', fontSize:'13px', outline:'none' }}
            />
          </div>
          {error && <p style={{ color:'#e74c3c', fontFamily:'Arial', fontSize:'12px', margin:0 }}>{error}</p>}
          <button
            onClick={handleSubmit}
            style={{ marginTop:'8px', padding:'10px', background:'#1D9E75', color:'#fff', border:'none', borderRadius:'8px', fontFamily:'Arial', fontSize:'14px', fontWeight:'600', cursor:'pointer' }}
          >Ingresar</button>
        </div>
      </div>
    </div>
  )
}