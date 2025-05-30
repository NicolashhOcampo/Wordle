import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/PlayRandonWordle.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { CreateWordle } from './pages/CreateWordle.tsx'
import { PlayCustomWordle } from './pages/PlayCustomWordle.tsx'
import NotFound from './pages/NotFound.tsx'
import Layout from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<App />} />
          <Route path="create" element={<CreateWordle />} />
          <Route path="playCustom/:word" element={<PlayCustomWordle />} />
          <Route path="*" element={<NotFound />} />
        </Route >
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
