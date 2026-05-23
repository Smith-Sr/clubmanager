import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import './index.css'

function Root() {
  const [usuario, setUsuario] = useState(localStorage.getItem('nombre'))

  if (!usuario) return <Login onLogin={nombre => setUsuario(nombre)} />
  return (
    <BrowserRouter>
      <App usuario={usuario} onLogout={() => { localStorage.clear(); setUsuario(null); }} />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)