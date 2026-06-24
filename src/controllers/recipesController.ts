import { Request, Response } from 'express';
import * as recipesService from '../services/recipesService';

function parseId(raw: string | string[]): number | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const id = parseInt(value, 10);
  return isNaN(id) ? null : id;
}

export async function create(req: Request, res: Response): Promise<void> {
  const { title, making_time, serves, ingredients, cost } = req.body as Record<string, unknown>;

  if (title === undefined || making_time === undefined || serves === undefined || ingredients === undefined || cost === undefined) {
    res.status(200).json({
      message: 'Recipe creation failed!',
      required: 'title, making_time, serves, ingredients, cost',
    });
    return;
  }

  const recipe = await recipesService.createRecipe({
    title: title as string,
    making_time: making_time as string,
    serves: serves as string,
    ingredients: ingredients as string,
    cost: Number(cost),
  });

  res.status(200).json({
    message: 'Recipe successfully created!',
    recipe: [{ ...recipe, cost: String(recipe.cost) }],
  });
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  const recipes = await recipesService.getAllRecipes();
  res.status(200).json({
    recipes: recipes.map((r) => ({ ...r, cost: String(r.cost) })),
  });
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  if (id === null) { res.status(200).json({ message: 'Recipe not found' }); return; }
  const recipe = await recipesService.getRecipeById(id);
  if (!recipe) {
    res.status(200).json({ message: 'Recipe not found' });
    return;
  }
  res.status(200).json({
    message: 'Recipe details by id',
    recipe: [{ ...recipe, cost: String(recipe.cost) }],
  });
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  if (id === null) { res.status(200).json({ message: 'Recipe not found' }); return; }
  const recipe = await recipesService.updateRecipe(id, req.body as Record<string, unknown>);
  if (!recipe) {
    res.status(200).json({ message: 'Recipe not found' });
    return;
  }
  res.status(200).json({
    message: 'Recipe successfully updated!',
    recipe: [{ ...recipe, cost: String(recipe.cost) }],
  });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  if (id === null) { res.status(200).json({ message: 'No recipe found' }); return; }
  const deleted = await recipesService.deleteRecipe(id);
  if (!deleted) {
    res.status(200).json({ message: 'No recipe found' });
    return;
  }
  res.status(200).json({ message: 'Recipe successfully removed!' });
}
