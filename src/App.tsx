import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Catálogo</h1>} />
      <Route path="/receitas/:id" element={<h1>Detalhe</h1>} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  )
}