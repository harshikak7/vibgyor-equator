import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import CollectionPage from './pages/CollectionPage.jsx'

import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/rare-finds/:category"
          element={<CollectionPage />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)