import { Session, Recipe } from '../types';

// Synonym map for Bilingual English <-> Hindi <-> Hinglish mapping
export const bilingualSynonyms: { [key: string]: string[] } = {
  potato: ['potato', 'potatoes', 'aloo', 'aaloo', 'आलू'],
  onion: ['onion', 'onions', 'pyaj', 'pyaz', 'प्याज'],
  garlic: ['garlic', 'lahsun', 'lehsun', 'लहसुन'],
  ginger: ['ginger', 'adrak', 'अदरक'],
  tomato: ['tomato', 'tomatoes', 'tamatar', 'टमाटर'],
  egg: ['egg', 'eggs', 'anda', 'ande', 'अंडा', 'अंडे'],
  butter: ['butter', 'makkhan', 'मक्खन'],
  milk: ['milk', 'doodh', 'दूध'],
  salt: ['salt', 'namak', 'नमक'],
  sugar: ['sugar', 'chini', 'shakkar', 'चीनी', 'शक्कर'],
  coriander: ['coriander', 'cilantro', 'dhaniya', 'धनिया'],
  cumin: ['cumin', 'jeera', 'जीरा'],
  cucumber: ['cucumber', 'kheera', 'खीरा'],
  lemon: ['lemon', 'lime', 'nimbu', 'नींबू'],
  cheese: ['cheese', 'paneer', 'पनीर', 'चीज़'],
  oil: ['oil', 'tel', 'oil', 'तेल'],
  bread: ['bread', 'double roti', 'डबल रोटी', 'ब्रेड'],
  water: ['water', 'paani', 'pani', 'पानी'],
  rice: ['rice', 'chawal', 'चावल'],
  flour: ['flour', 'atta', 'aata', 'maida', 'आटा', 'मैदा'],
  chicken: ['chicken', 'murga', 'चिकन'],
  pepper: ['pepper', 'kali mirch', 'काली मिर्च'],
  chili: ['chili', 'chilli', 'chillies', 'mirch', 'mirchi', 'hari mirch', 'lal mirch', 'मिर्च', 'मिर्ची'],
  carrot: ['carrot', 'carrots', 'gajar', 'गाजर'],
  spinach: ['spinach', 'palak', 'पालक']
};

/**
 * Normalizes an ingredient name for better match-comparison.
 * E.g., "chicken breasts (skinless, boneless)" -> "chicken breast"
 */
export function normalizeIngredient(name: string): string {
  let normalized = name.toLowerCase().trim();
  // Remove parenthetical details
  normalized = normalized.replace(/\s*\(.*?\)/g, '');
  // Remove common descriptive adjectives/prep styles
  normalized = normalized.replace(/\b(organic|ripe|fresh|raw|cooked|sliced|diced|minced|finely|chopped|shredded|grated|peeled|smashed|coarse|pure|salted|unsalted|skinless|boneless|cloves|clove|stems|stem|pieces|piece|can|canned|low-sodium|thick|thin|prepared|artisanal|rustic|rolled|pure)\b/g, '');
  // Trim extra spaces
  normalized = normalized.trim().replace(/\s+/g, ' ');
  return normalized;
}

/**
 * Splits a user ingredients input string into individual keywords.
 */
export function extractKeywords(input: string): string[] {
  // Split by comma, semicolon, or newlines
  const parts = input.toLowerCase().split(/[,\n;]+/);
  const keywords: string[] = [];

  for (let part of parts) {
    let clean = part.trim();
    if (!clean) continue;
    // Remove quantities (numbers) at the start of strings, like "3 eggs" or "2.5 tbsp of butter"
    clean = clean.replace(/^[0-9./\s]+/, '');
    // Remove common measuring units
    clean = clean.replace(/\b(tbsp|tsp|cup|cups|g|grams|kg|oz|pieces|piece|slices|slice|can|cans|pack|bottle|sprigs|sprig|stems|stem|cloves|clove|leaves|leaf|ml|milliliters)\b/gi, '');
    clean = clean.trim().replace(/\s+/g, ' ');
    if (clean.length > 1) {
      keywords.push(clean);
    }
  }

  return keywords;
}

export interface MatchResult {
  session: Session;
  matchedCount: number;
  totalRecipeIngredients: number;
  matchedNames: string[];
  missingNames: string[];
  matchPercentage: number;
}

/**
 * Rates and filters recipes in the database based on the user's input ingredients.
 */
export function findMatchingRecipes(userInput: string, sessions: Session[]): MatchResult[] {
  const userKeywords = extractKeywords(userInput);
  if (userKeywords.length === 0) return [];

  const results: MatchResult[] = [];

  for (const session of sessions) {
    const recipe = session.recipe;
    let matchedCount = 0;
    const matchedNames: string[] = [];
    const missingNames: string[] = [];

    for (const recipeIng of recipe.ingredients) {
      const normalizedRecipeIng = normalizeIngredient(recipeIng.name);
      
      // Check if any of the user's input keywords match the recipe ingredient name (or share synonyms)
      const isMatched = userKeywords.some(kw => {
        const normalizedKw = normalizeIngredient(kw);
        if (normalizedRecipeIng.includes(normalizedKw) || normalizedKw.includes(normalizedRecipeIng)) {
          return true;
        }
        // Synonym checks for bilingual alignment
        for (const [key, list] of Object.entries(bilingualSynonyms)) {
          const kwMatches = list.some(syn => normalizedKw === syn || normalizedKw.includes(syn) || syn.includes(normalizedKw));
          const recipeMatches = list.some(syn => normalizedRecipeIng === syn || normalizedRecipeIng.includes(syn) || syn.includes(normalizedRecipeIng));
          if (kwMatches && recipeMatches) {
            return true;
          }
        }
        return false;
      });

      if (isMatched) {
        matchedCount++;
        matchedNames.push(recipeIng.name);
      } else {
        // Also check if any swaps match!
        let swapMatched = false;
        if (recipeIng.swaps) {
          for (const swap of recipeIng.swaps) {
            const normalizedSwap = normalizeIngredient(swap);
            const matchesSwap = userKeywords.some(kw => {
              const normalizedKw = normalizeIngredient(kw);
              if (normalizedSwap.includes(normalizedKw) || normalizedKw.includes(normalizedSwap)) {
                return true;
              }
              // Synonym checks for swap
              for (const [key, list] of Object.entries(bilingualSynonyms)) {
                const kwMatches = list.some(syn => normalizedKw === syn || normalizedKw.includes(syn) || syn.includes(normalizedKw));
                const swapMatches = list.some(syn => normalizedSwap === syn || normalizedSwap.includes(syn) || syn.includes(normalizedSwap));
                if (kwMatches && swapMatches) {
                  return true;
                }
              }
              return false;
            });
            if (matchesSwap) {
              swapMatched = true;
              break;
            }
          }
        }

        if (swapMatched) {
          matchedCount++;
          matchedNames.push(`${recipeIng.name} (via swap)`);
        } else {
          missingNames.push(recipeIng.name);
        }
      }
    }

    const matchPercentage = recipe.ingredients.length > 0 
      ? Math.round((matchedCount / recipe.ingredients.length) * 100)
      : 0;

    // We only return recipes that have at least one matching ingredient
    if (matchedCount > 0) {
      results.push({
        session,
        matchedCount,
        totalRecipeIngredients: recipe.ingredients.length,
        matchedNames,
        missingNames,
        matchPercentage
      });
    }
  }

  // Sort by match percentage (descending), then matched count (descending)
  return results.sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchedCount - a.matchedCount);
}
