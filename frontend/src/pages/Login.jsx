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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '2.5rem',
        borderRadius: '20px',
        width: '360px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.6)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px', height: '56px', margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #667eea, #618576)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: '0 8px 20px rgba(102,126,234,0.4)'
          }}>🏆</div>
          <h2 style={{ color: '#1a202c', fontSize: '1.3rem', fontWeight: 700, margin: '0 0 4px' }}>ClubManager</h2>
          <p style={{ color: '#718096', fontSize: '13px', margin: 0 }}>Acceso para trabajadores</p>
        </div>

        {/* Campos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="tu@email.com"
              style={{
                padding: '10px 14px', border: '1.5px solid #e2e8f0',
                borderRadius: '9px', fontSize: '13px', color: '#2d3748',
                outline: 'none', background: '#fff', fontFamily: "'Segoe UI', sans-serif"
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                padding: '10px 14px', border: '1.5px solid #e2e8f0',
                borderRadius: '9px', fontSize: '13px', color: '#2d3748',
                outline: 'none', background: '#fff', fontFamily: "'Segoe UI', sans-serif"
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fff5f5', border: '1px solid #fed7d7',
              borderRadius: '8px', padding: '8px 12px',
              color: '#e53e3e', fontSize: '12px', fontWeight: 500
            }}>⚠️ {error}</div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              marginTop: '4px', padding: '11px',
              background: 'linear-gradient(135deg, #456b60, #1f707a)',
              color: '#fff', border: 'none', borderRadius: '9px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
              fontFamily: "'Segoe UI', sans-serif"
            }}
          >Ingresar al sistema</button>
        </div>
      </div>
    </div>
  )
}