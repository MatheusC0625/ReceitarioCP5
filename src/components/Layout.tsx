import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// o Outlet é onde aparece a página da rota atual
export default function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}