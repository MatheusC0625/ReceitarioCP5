import { useEffect, useState } from 'react'
import type { Recipe } from '../types/recipe'
import { getRecipes } from '../services/api'
import RecipeCard from '../components/RecipeCard'

export default function Catalogo() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getRecipes()
      .then((data) => setRecipes(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Não foi possível carregar as receitas.</p>

  return (
    <section>
      <h1>Receitas</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}