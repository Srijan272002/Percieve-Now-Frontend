import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add dark mode class to html if needed
if (localStorage.getItem('darkMode') === 'true' || 
    (!('darkMode' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 