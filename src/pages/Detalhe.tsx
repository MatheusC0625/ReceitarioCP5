import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Recipe } from '../types/recipe'
import { getRecipeById, getTotalTime } from '../services/api'

export default function Detalhe() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getRecipeById(id!)
      .then((data) => setRecipe(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>Não foi possível carregar a receita.</p>

  if (!recipe) {
    return (
      <section className="mensagem">
        <h1>Receita não encontrada</h1>
        <Link to="/">Voltar ao catálogo</Link>
      </section>
    )
  }

  return (
    <article className="detalhe">
      <Link to="/">← Voltar</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />

      <p>
        Preparo: {recipe.prepTimeMinutes} min | Cozimento: {recipe.cookTimeMinutes} min | Total:{' '}
        {getTotalTime(recipe)} min
      </p>

      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Modo de preparo</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </article>
  )
}