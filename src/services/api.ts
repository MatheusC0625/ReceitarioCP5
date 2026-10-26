import type { Recipe, RecipesResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}?limit=0`)
  if (!response.ok) throw new Error('Erro ao carregar as receitas')
  const data: RecipesResponse = await response.json()
  return data.recipes
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (response.status === 404) return null
  if (!response.ok) throw new Error('Erro ao carregar a receita')
  return response.json()
}

export function getTotalTime(recipe: Recipe): number {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes
}