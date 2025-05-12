import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CreateWordle } from './components/CreateWordle.tsx'
import { PlayCustomWordle } from './components/PlayCustomWordle.tsx'
import NotFound from './components/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateWordle />} />
        <Route path="/playCustom/:word" element={<PlayCustomWordle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
