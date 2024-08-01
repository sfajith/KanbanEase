import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Kanban} from './components/Kanban'       // Hoja de estilos base


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Kanban/>
  </React.StrictMode>,
)
