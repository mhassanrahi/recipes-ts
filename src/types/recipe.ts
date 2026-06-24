export interface Recipe {
  id: number;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRecipeInput {
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
}

export type UpdateRecipeInput = Partial<CreateRecipeInput>;

export type RecipeSummary = Omit<Recipe, 'created_at' | 'updated_at'>;
