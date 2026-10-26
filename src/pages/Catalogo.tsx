import { useEffect, useState } from 'react'
import type { Recipe } from '../types/recipe'
import { getRecipes } from '../services/api'
import RecipeCard from '../components/RecipeCard'

export default function Catalogo() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].sort()

  const filtered = recipes.filter((r) => {
    const nameOk = r.name.toLowerCase().includes(search.toLowerCase())
    const cuisineOk = cuisine === '' || r.cuisine === cuisine
    return nameOk && cuisineOk
  })

  function toggleFavorite(id: number) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Não foi possível carregar as receitas.</p>

  return (
    <section>
      <div className="topo">
        <h1>Receitas</h1>
        <p>{favorites.length} favoritas</p>
      </div>

      <div className="filtros">
        <label>
          Buscar
          <input
            type="text"
            placeholder="Nome da receita"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label>
          Culinária
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="">Todas</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 && <p>Nenhuma receita encontrada.</p>}

      <div className="grid">
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}