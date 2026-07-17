export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  swaps: string[];
}

export interface Step {
  instruction: string;
  durationMinutes: number | null;
  checked?: boolean; // client-side interaction state
}

export interface Nutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  nutrition: Nutrition;
  chefTip: string;
}

export interface Session {
  id: string;
  timestamp: number;
  ingredientsInput: string;
  recipe: Recipe;
  refinements: string[];
}

export type SimulatedFaultType = 'none' | 'malformed_json' | 'wrong_shape' | 'timeout' | 'server_error';
