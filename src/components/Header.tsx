import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Receitário</Link>
      </div>
    </header>
  )
}