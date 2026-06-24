import { RowDataPacket, ResultSetHeader, ExecuteValues } from 'mysql2';
import pool from '../config/db';
import { Recipe, CreateRecipeInput, UpdateRecipeInput, RecipeSummary } from '../types/recipe';

type RecipeRow = Recipe & RowDataPacket;

const UPDATABLE_FIELDS = ['title', 'making_time', 'serves', 'ingredients', 'cost'];

export async function createRecipe(data: CreateRecipeInput): Promise<Recipe> {
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO recipes (title, making_time, serves, ingredients, cost) VALUES (?, ?, ?, ?, ?)',
    [data.title, data.making_time, data.serves, data.ingredients, data.cost]
  );
  const [rows] = await pool.execute<RecipeRow[]>('SELECT * FROM recipes WHERE id = ?', [result.insertId]);
  return rows[0];
}

export async function getAllRecipes(): Promise<RecipeSummary[]> {
  const [rows] = await pool.execute<RecipeRow[]>(
    'SELECT id, title, making_time, serves, ingredients, cost FROM recipes'
  );
  return rows;
}

export async function getRecipeById(id: number): Promise<RecipeSummary | null> {
  const [rows] = await pool.execute<RecipeRow[]>(
    'SELECT id, title, making_time, serves, ingredients, cost FROM recipes WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}

export async function updateRecipe(
  id: number,
  data: UpdateRecipeInput
): Promise<Omit<Recipe, 'id' | 'created_at' | 'updated_at'> | null> {
  const exists = await getRecipeById(id);
  if (!exists) return null;

  const fields = Object.keys(data).filter((f) => UPDATABLE_FIELDS.includes(f));

  if (fields.length > 0) {
    const setClause = fields.map((f) => `\`${f}\` = ?`).join(', ');
    const values = [...fields.map((f) => (data as Record<string, unknown>)[f]), id] as ExecuteValues;
    await pool.execute(`UPDATE recipes SET ${setClause} WHERE id = ?`, values);
  }

  const [rows] = await pool.execute<RecipeRow[]>(
    'SELECT title, making_time, serves, ingredients, cost FROM recipes WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>('DELETE FROM recipes WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
