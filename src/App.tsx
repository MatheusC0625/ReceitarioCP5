import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Catalogo from './pages/Catalogo'
import Detalhe from './pages/Detalhe'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalogo />} />
        <Route path="/receitas/:id" element={<Detalhe />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Route>
    </Routes>
  )
}