import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'
import { getTotalTime } from '../services/api'

interface Props {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="card">
      <Link to={`/receitas/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.name} />
        <h2>{recipe.name}</h2>
      </Link>
      <p>{recipe.cuisine}</p>
      <p>{getTotalTime(recipe)} min</p>
      <button onClick={() => onToggleFavorite(recipe.id)}>
        {isFavorite ? '♥ Favorita' : '♡ Favoritar'}
      </button>
    </article>
  )
}