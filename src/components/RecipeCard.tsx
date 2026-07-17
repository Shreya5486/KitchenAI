import React, { useState, useEffect } from 'react';
import { 
  Clock, Users, CheckCircle, Scale, Utensils, 
  Sparkles, Flame, Plus, Minus, HelpCircle, 
  Check, ChevronDown, ChevronUp, AlertCircle 
} from 'lucide-react';
import { Recipe, Ingredient, Step } from '../types';
import CookingTimer from './CookingTimer';
import { getRecipeImageUrl } from '../utils/recipeImage';

interface RecipeCardProps {
  recipe: Recipe;
  onRefine: (refinementText: string) => void;
  isRefining: boolean;
}

export default function RecipeCard({ recipe, onRefine, isRefining }: RecipeCardProps) {
  const [scaledServings, setScaledServings] = useState<number>(recipe.servings);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<number | null>(null);
  const [refinementInput, setRefinementInput] = useState('');

  // Initializing or resetting state when a brand new recipe loads
  useEffect(() => {
    setScaledServings(recipe.servings);
    setCheckedSteps(new Array(recipe.steps.length).fill(false));
    setSelectedIngredientIndex(null);
    setRefinementInput('');
  }, [recipe]);

  const scaleMultiplier = scaledServings / recipe.servings;

  const handleStepToggle = (index: number) => {
    const updated = [...checkedSteps];
    updated[index] = !updated[index];
    setCheckedSteps(updated);
  };

  // Dynamically find the "current" active step (the first unchecked step)
  const activeStepIndex = checkedSteps.findIndex(checked => !checked);

  // Quick suggestion chips for the refinement loop
  const suggestions = [
    { label: 'Make it spicier 🌶️', text: 'Make it spicier' },
    { label: 'Make it dairy-free 🥛', text: 'Make it dairy-free and suggest dairy substitutes' },
    { label: 'Add extra garlic 🧄', text: 'Add garlic and adjust other spices accordingly' },
    { label: 'Swap protein for Tofu 🥦', text: 'Swap the main protein with firm tofu or vegetarian alternatives' },
    { label: 'Simplify (fewer steps) 🍳', text: 'Simplify this recipe so it takes less effort and fewer pots' },
  ];

  const handleSuggestionClick = (text: string) => {
    setRefinementInput(text);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementInput.trim() || isRefining) return;
    onRefine(refinementInput.trim());
    setRefinementInput('');
  };

  // Helper to format scaled ingredient quantity beautifully
  const formatQuantity = (qty: number) => {
    const scaled = qty * scaleMultiplier;
    if (scaled === 0) return '';
    if (Number.isInteger(scaled)) return scaled.toString();
    return Number(scaled.toFixed(2)).toString();
  };

  const completedStepsCount = checkedSteps.filter(Boolean).length;
  const stepsPercent = recipe.steps.length > 0 
    ? Math.round((completedStepsCount / recipe.steps.length) * 100) 
    : 0;

  return (
    <div className="bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden font-sans transition-all duration-300">
      
      {/* Decorative Top Accent Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-transparent h-1.5 w-full" />

      {/* Recipe Header Banner Image */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-slate-100 group border-b border-slate-100">
        <img
          src={getRecipeImageUrl(recipe.title)}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        
        {/* Absolute floating badge over image */}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-white/20">
          <Utensils size={10} className="text-indigo-600" /> Loaded Recipe Photo
        </span>
      </div>

      <div className="p-6 md:p-8">
        {/* Header Grid: Left has Title & Description, Right has "Final Look of the Dish" image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 items-center border-b border-slate-100 pb-6">
          <div className="md:col-span-8">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-indigo-100 mb-3">
              <Sparkles size={11} className="text-indigo-600 animate-pulse" />
              Recipe Parsed Successfully
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">
              {recipe.title}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed italic">
              "{recipe.description}"
            </p>
          </div>
          
          <div className="md:col-span-4">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 shadow-sm group">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-white border border-slate-100">
                <img
                  src={getRecipeImageUrl(recipe.title)}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-extrabold text-white bg-indigo-600/90 backdrop-blur-xs px-2 py-0.5 rounded uppercase tracking-wider">
                  Gourmet View
                </span>
              </div>
              <div className="text-[10px] text-center font-bold text-slate-500 mt-2 flex items-center justify-center gap-1 uppercase tracking-wider">
                <span>📸</span> Final Look of the Dish
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Recipe Meta Attributes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700">
              <Clock size={16} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prep Time</div>
              <div className="text-sm font-semibold text-slate-800">{recipe.prepTime}</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-50 border border-orange-100 text-orange-700">
              <Flame size={16} />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cook Time</div>
              <div className="text-sm font-semibold text-slate-800">{recipe.cookTime}</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700">
              <Users size={16} />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Servings</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScaledServings(prev => Math.max(1, prev - 1))}
                  className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 cursor-pointer transition-all"
                  title="Decrease servings"
                >
                  <Minus size={10} />
                </button>
                <span className="text-xs font-bold text-slate-800 min-w-[20px] text-center">{scaledServings}</span>
                <button
                  onClick={() => setScaledServings(prev => Math.min(20, prev + 1))}
                  className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 cursor-pointer transition-all"
                  title="Increase servings"
                >
                  <Plus size={10} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 flex items-center gap-3 col-span-2 sm:col-span-1 font-mono">
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold">
              KCAL
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Calories</div>
              <div className="text-sm font-semibold text-slate-800">{recipe.nutrition.calories}</div>
            </div>
          </div>
        </div>

        {/* Nutritional Breakdown Ribbon */}
        <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-4 mb-6 flex flex-wrap gap-y-3 justify-around items-center text-xs font-medium">
          <div className="text-slate-500">Nutrients per serving:</div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200/60">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            <span className="text-slate-500">Protein:</span>
            <span className="text-slate-800 font-bold">{recipe.nutrition.protein}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200/60">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            <span className="text-slate-500">Carbs:</span>
            <span className="text-slate-800 font-bold">{recipe.nutrition.carbs}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200/60">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="text-slate-500">Fat:</span>
            <span className="text-slate-800 font-bold">{recipe.nutrition.fat}</span>
          </div>
        </div>

        {/* Ingredients & Prep Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          
          {/* Ingredients Left Panel (5 columns) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <Utensils size={18} className="text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Prep & Swaps</h3>
            </div>
            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed italic">
              * Click any ingredient below to reveal smart substitute swaps.
            </p>

            <div className="space-y-2.5">
              {recipe.ingredients.map((ing, idx) => {
                const isSelected = selectedIngredientIndex === idx;
                return (
                  <div key={idx} className="flex flex-col">
                    <button
                      onClick={() => setSelectedIngredientIndex(isSelected ? null : idx)}
                      className={`w-full flex items-center justify-between text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-50/50 border-indigo-200' 
                          : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white border border-slate-200/60 px-1.5 py-0.5 rounded">
                          {formatQuantity(ing.quantity)} {ing.unit}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate">{ing.name}</span>
                      </div>
                      
                      {ing.swaps && ing.swaps.length > 0 && (
                        <div className="text-slate-400 pl-2">
                          {isSelected ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                      )}
                    </button>

                    {/* Expandable Substitutes Tray */}
                    {isSelected && ing.swaps && ing.swaps.length > 0 && (
                      <div className="mt-1 mx-2 p-3 bg-indigo-50/30 border-x border-b border-indigo-200/40 rounded-b-lg text-xs text-slate-700 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-indigo-800 text-[10px] uppercase tracking-wider">
                          <Scale size={11} /> Substitutes / Swaps
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {ing.swaps.map((swap, sIdx) => (
                            <span key={sIdx} className="bg-white border border-indigo-200 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-medium shadow-2xs">
                              {swap}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps Checklist Right Panel (7 columns) */}
          <div className="lg:col-span-7">
            
            {/* Dynamic Cooking Progress Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Instructions</h3>
              </div>
              <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Progress: {completedStepsCount}/{recipe.steps.length} ({stepsPercent}%)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5 border border-slate-200/30">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out" 
                style={{ width: `${stepsPercent}%` }}
              />
            </div>

            {/* Celebratory Banner when all steps are completed and ready to serve */}
            {completedStepsCount === recipe.steps.length && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center shadow-xs animate-in fade-in duration-500">
                <span className="text-2xl">🎉</span>
                <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wider mt-2 mb-1">
                  Ready to Serve!
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed mb-4">
                  Amazing work! You've successfully completed every step. Your <strong>{recipe.title}</strong> is prepared and ready to serve!
                </p>
                <div className="mx-auto max-w-sm rounded-lg overflow-hidden border border-emerald-200/60 shadow-xs bg-white p-1.5">
                  <div className="relative aspect-[16/10] rounded overflow-hidden">
                    <img
                      src={getRecipeImageUrl(recipe.title)}
                      alt={`${recipe.title} plated beautifully`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-emerald-100/50 p-2 text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest mt-1.5 rounded">
                    🍽️ Plated & Ready to Enjoy!
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {recipe.steps.map((step, idx) => {
                const isChecked = checkedSteps[idx] || false;
                const isActive = idx === activeStepIndex;
                
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      isChecked 
                        ? 'bg-slate-50 border-slate-200/50 opacity-50' 
                        : isActive
                          ? 'bg-indigo-50/20 border-indigo-400 shadow-xs ring-1 ring-indigo-400/20' 
                          : 'bg-white border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Checkbox circle */}
                      <button
                        onClick={() => handleStepToggle(idx)}
                        className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : isActive 
                              ? 'border-indigo-500 bg-white hover:bg-indigo-50' 
                              : 'border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </button>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isChecked ? 'text-slate-400' : 'text-slate-500'}`}>
                            Step {idx + 1}
                          </span>
                          {isActive && (
                            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.25 rounded border border-indigo-200 animate-pulse uppercase tracking-wider">
                              Active Phase
                            </span>
                          )}
                        </div>
                        
                        <p className={`text-xs md:text-sm leading-relaxed ${isChecked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                          {step.instruction}
                        </p>

                        {/* Cooking Timer insertion */}
                        {step.durationMinutes !== null && step.durationMinutes > 0 && !isChecked && (
                          <CookingTimer durationMinutes={step.durationMinutes} stepNumber={idx + 1} />
                        )}

                        {/* Final look of the dish picture inside the final step block */}
                        {idx === recipe.steps.length - 1 && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 bg-slate-50/70 p-2 max-w-md">
                            <div className="relative aspect-[16/10] rounded overflow-hidden">
                              <img
                                src={getRecipeImageUrl(recipe.title)}
                                alt={`${recipe.title} final look`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-[10px] text-center font-bold text-indigo-800 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1 bg-white border border-slate-200/50 py-1 rounded shadow-2xs">
                              <span>🍽️</span> Final Look: Ready to Serve & Enjoy!
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chef's Pro Tip */}
        <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-5 mb-6 flex gap-4">
          <div className="text-xl flex-shrink-0">💡</div>
          <div>
            <h4 className="font-semibold text-xs text-indigo-950 uppercase tracking-wider mb-1">
              Chef's Technique Tip
            </h4>
            <p className="text-xs text-indigo-900 leading-relaxed font-medium italic">
              "{recipe.chefTip}"
            </p>
          </div>
        </div>

        {/* Refinement Loop Control Center */}
        <div className="border-t border-slate-200/80 pt-6 mt-6">
          <div className="flex items-center gap-1.5 mb-2 text-slate-800">
            <Sparkles size={16} className="text-indigo-600 animate-pulse" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Custom Recipe Adjuster</h4>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Submit follow-up requests to tweak ingredients, replace proteins, or optimize steps. The system will dynamically update your active recipe.
          </p>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {suggestions.map((sug, sIdx) => (
              <button
                key={sIdx}
                disabled={isRefining}
                onClick={() => handleSuggestionClick(sug.text)}
                className="text-[10px] font-bold bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer transition-all hover:scale-102"
              >
                {sug.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleRefineSubmit} className="flex gap-2">
            <input
              type="text"
              value={refinementInput}
              disabled={isRefining}
              onChange={(e) => setRefinementInput(e.target.value)}
              placeholder="e.g., Make it spicier, swap protein for tofu, or make it dairy-free..."
              className="flex-grow bg-slate-50 border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-xs text-slate-800 outline-none placeholder:text-slate-400 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isRefining || !refinementInput.trim()}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRefining ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Refining...
                </>
              ) : (
                'Tweak It'
              )}
            </button>
          </form>

          {isRefining && (
            <div className="flex items-center gap-2 mt-3 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200/50">
              <AlertCircle size={12} className="animate-spin text-indigo-600" />
              Chef is consulting the flavor profiles... Updates will merge into this active recipe.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
