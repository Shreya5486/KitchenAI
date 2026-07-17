import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, AlertTriangle, RefreshCw, Sparkles, 
  Plus, History, Check, Play, BookOpen, Trash2, HelpCircle, Sliders
} from 'lucide-react';
import { Recipe, Session, SimulatedFaultType } from './types';
import RecipeCard from './components/RecipeCard';
import FaultSimulator from './components/FaultSimulator';
import SessionSidebar from './components/SessionSidebar';
import { defaultSessions } from './defaultRecipes';
import { findMatchingRecipes, MatchResult } from './utils/matching';
import { recipeLibrary } from './recipeLibrary';
import { getRecipeImageUrl } from './utils/recipeImage';

// Convert library recipes to static virtual Session objects for matching
const librarySessions: Session[] = recipeLibrary.map((recipe, idx) => ({
  id: `library-recipe-${idx}`,
  timestamp: Date.now() - (idx + 100) * 3600000,
  ingredientsInput: recipe.ingredients.map(i => i.name).join(', '),
  recipe,
  refinements: []
}));

// Rich list of dynamic loading states to keep users entertained and engaged during cooking generation
const loadingPhrases = [
  "Preheating the virtual oven...",
  "Chopping fresh organic herbs...",
  "Sizzling garlic in cold-pressed oil...",
  "Consulting the gourmet flavor-pairing indices...",
  "Flipping delicate pancakes in the pan...",
  "De-glazing with dry white wine...",
  "Balancing the sweet, sour, and savory notes...",
  "Arranging microgreens with culinary tweezers...",
  "Whipping egg whites into stiff glossy peaks...",
  "Sifting double-zero premium flour..."
];

// Presets for easy user testing
const presetLists = [
  {
    title: "🥚 Eggs (अंडा भुर्जी/ऑमलेट)",
    ingredients: "eggs, butter, milk, salt, pepper"
  },
  {
    title: "🥔 Potatoes (भुने आलू/आलू चाट)",
    ingredients: "potatoes, olive oil, garlic cloves, salt, black pepper, butter"
  },
  {
    title: "🥪 Grilled Cheese (चीज़ सैंडविच)",
    ingredients: "bread, cheddar cheese, butter"
  },
  {
    title: "🥗 Cucumber Salad (खीरा सलाद)",
    ingredients: "cucumber, cherry tomatoes, olive oil, onion, salt, pepper"
  }
];

export default function App() {
  const [ingredientsInput, setIngredientsInput] = useState('');
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean | null>(null);

  // Check API status on mount
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        setIsApiKeyConfigured(!!data.apiKeyConfigured);
      })
      .catch(err => {
        console.error("Failed to check status:", err);
        setIsApiKeyConfigured(false);
      });
  }, []);
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [error, setError] = useState<{
    title: string;
    message: string;
    rawDetails: string;
    canRetry: boolean;
    retryParams: { ingredientsList: string; refinementText?: string; recipeToRefine?: Recipe } | null;
  } | null>(null);

  // Fault Simulator selected mode
  const [currentFault, setCurrentFault] = useState<SimulatedFaultType>('none');
  const [showFaultSimulator, setShowFaultSimulator] = useState(false);

  // Sessions list (history)
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [matchedRecipes, setMatchedRecipes] = useState<MatchResult[]>([]);
  const [strictMatchingOnly, setStrictMatchingOnly] = useState(false);
  const [outputLanguage, setOutputLanguage] = useState<'en' | 'hi'>('en');

  // Update live matched recipes whenever input ingredients or sessions database change
  useEffect(() => {
    if (ingredientsInput.trim()) {
      let matches = findMatchingRecipes(ingredientsInput, [...librarySessions, ...sessions]);
      if (strictMatchingOnly) {
        matches = matches.filter(m => m.matchPercentage === 100);
      }
      setMatchedRecipes(matches);
    } else {
      setMatchedRecipes([]);
    }
  }, [ingredientsInput, sessions, strictMatchingOnly]);

  // Ref tracking latest request ID to completely eliminate race condition overwrites
  const latestRequestIdRef = useRef<number>(0);

  // Load history from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fridge_recipe_sessions');
      let loadedSessions: Session[] = [];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedSessions = parsed;
        }
      }
      
      // If empty or has older short defaults list, merge/update with any missing default sessions
      const hasOldDefaults = loadedSessions.length > 0 && loadedSessions.length < 15 && loadedSessions.some(s => s.id.startsWith('default-session-'));
      if (loadedSessions.length === 0 || hasOldDefaults) {
        const userCustomSessions = loadedSessions.filter(s => !s.id.startsWith('default-session-'));
        loadedSessions = [...defaultSessions, ...userCustomSessions];
        localStorage.setItem('fridge_recipe_sessions', JSON.stringify(loadedSessions));
      }

      setSessions(loadedSessions);
      // Auto-load the first recipe in the list
      const first = loadedSessions[0];
      if (first) {
        setCurrentRecipe(first.recipe);
        setIngredientsInput(first.ingredientsInput);
        setActiveSessionId(first.id);
      }
    } catch (e) {
      console.error("Failed to load saved sessions:", e);
    }
  }, []);

  // Interval hook to rotate through culinary loading quotes
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isLoading || isRefining) {
      intervalId = setInterval(() => {
        setActivePhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
      }, 1800);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading, isRefining]);

  // Central Recipe Request Core (generates or refines recipes)
  const executeRecipeRequest = async (
    ingredientsList: string,
    refinementText?: string,
    recipeToRefine?: Recipe
  ) => {
    // 0. Check for exact 100% matches in library or saved recipes before resorting to recipe engine generation
    if (!refinementText) {
      const matches = findMatchingRecipes(ingredientsList, [...librarySessions, ...sessions]);
      const exactMatch = matches.find(m => m.matchPercentage === 100);
      if (exactMatch) {
        setCurrentRecipe(exactMatch.session.recipe);
        setActiveSessionId(exactMatch.session.id);
        setError(null);
        return;
      }
    }

    // 1. Race Condition Prevention: Increment sequence ID
    const myRequestId = ++latestRequestIdRef.current;

    if (refinementText) {
      setIsRefining(true);
    } else {
      setIsLoading(true);
      setCurrentRecipe(null);
    }
    setError(null);

    // 2. AbortController for client-side timeout enforcement
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000); // 30 seconds limit to give structured recipe generation plenty of time to succeed

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          ingredients: ingredientsList,
          refinement: refinementText,
          currentRecipe: recipeToRefine,
          simulatedFault: currentFault,
          outputLanguage
        })
      });

      clearTimeout(timeoutId);

      // 3. Race condition check
      if (myRequestId !== latestRequestIdRef.current) {
        console.warn("API returned response for stale request. Discarding to avoid over-writes.");
        return;
      }

      if (!response.ok) {
        let errorBody: any = {};
        try {
          errorBody = await response.json();
        } catch (_) {}
        throw new Error(errorBody.message || `HTTP Server returned error status: ${response.status}`);
      }

      const rawText = await response.text();

      // Final stale check before parsing
      if (myRequestId !== latestRequestIdRef.current) return;

      // 4. Validate output shape & JSON parsing
      let parsedJson: any;
      try {
        parsedJson = JSON.parse(rawText.trim());
      } catch (parseErr: any) {
        throw new Error(`MALFORMED_JSON: Unparseable model output. Raw output was not valid JSON syntax. (${parseErr.message})`);
      }

      if (!parsedJson.title || !parsedJson.ingredients || !Array.isArray(parsedJson.ingredients) || !parsedJson.steps) {
        throw new Error("SCHEMA_MISMATCH: JSON successfully parsed but lacked critical fields (title, ingredients list, or steps).");
      }

      const recipeResponse = parsedJson as Recipe;

      // Update state
      setCurrentRecipe(recipeResponse);

      // Save to localStorage history
      const currentSessionId = refinementText ? activeSessionId : crypto.randomUUID();
      const updatedRefinementHistory = refinementText 
        ? [...(sessions.find(s => s.id === currentSessionId)?.refinements || []), refinementText]
        : [];

      const newSession: Session = {
        id: currentSessionId || crypto.randomUUID(),
        timestamp: Date.now(),
        ingredientsInput: ingredientsList,
        recipe: recipeResponse,
        refinements: updatedRefinementHistory
      };

      setSessions((prev) => {
        const filtered = prev.filter(s => s.id !== newSession.id);
        const updated = [newSession, ...filtered];
        localStorage.setItem('fridge_recipe_sessions', JSON.stringify(updated));
        return updated;
      });

      setActiveSessionId(newSession.id);

    } catch (err: any) {
      clearTimeout(timeoutId);

      // Ignore stale errors
      if (myRequestId !== latestRequestIdRef.current) {
        console.warn("Discarded stale request error.");
        return;
      }

      console.error("Recipe request caught error:", err);

      let errorTitle = "Culinary Hiccup!";
      let errorMessage = "The chef ran into an issue formulating this recipe. Please try again.";

      if (err.name === 'AbortError') {
        errorTitle = "Chef's Cooking Timeout";
        errorMessage = "The stove took too long to heat up! The recipe engine did not reply within our 30-second budget limit. Try clicking retry.";
      } else if (err.message.includes("MALFORMED_JSON")) {
        errorTitle = "Malformed JSON Code Response";
        errorMessage = "The parser engine produced syntax errors or unparseable brackets. Our parser safely caught this to avoid crashing. Try clicking retry to reformulate!";
      } else if (err.message.includes("SCHEMA_MISMATCH")) {
        errorTitle = "Schema Structural Mismatch";
        errorMessage = "The parser returned a healthy JSON payload, but the keys did not match a readable recipe structure. Click retry to regenerate.";
      } else {
        errorTitle = "Kitchen System Failure";
        errorMessage = err.message || "An unexpected network or Express backend exception occurred.";
      }

      setError({
        title: errorTitle,
        message: errorMessage,
        rawDetails: err.message,
        canRetry: true,
        retryParams: { ingredientsList, refinementText, recipeToRefine }
      });

    } finally {
      setIsLoading(false);
      setIsRefining(false);
    }
  };

  const handleInitialGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientsInput.trim() || isLoading) return;
    setActiveSessionId(null); // Reset active session for new creation
    executeRecipeRequest(ingredientsInput.trim());
  };

  const handleRefine = (refinementText: string) => {
    if (!currentRecipe || isRefining) return;
    executeRecipeRequest(ingredientsInput, refinementText, currentRecipe);
  };

  const handleRetry = () => {
    if (!error || !error.retryParams) return;
    const { ingredientsList, refinementText, recipeToRefine } = error.retryParams;
    setError(null);
    executeRecipeRequest(ingredientsList, refinementText, recipeToRefine);
  };

  const selectPreset = (ingredients: string) => {
    setIngredientsInput(ingredients);
    setError(null);
  };

  const handleSelectSession = (id: string) => {
    const session = [...librarySessions, ...sessions].find(s => s.id === id);
    if (session) {
      setCurrentRecipe(session.recipe);
      setIngredientsInput(session.ingredientsInput);
      setActiveSessionId(session.id);
      setError(null);
    }
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('fridge_recipe_sessions', JSON.stringify(updated));
    if (activeSessionId === id) {
      setCurrentRecipe(null);
      setActiveSessionId(null);
    }
  };

  const handleClearAllSessions = () => {
    if (window.confirm("Are you sure you want to empty your entire recipe book? This cannot be undone.")) {
      setSessions([]);
      localStorage.removeItem('fridge_recipe_sessions');
      setCurrentRecipe(null);
      setActiveSessionId(null);
    }
  };

  const handleCreateNewClick = () => {
    setCurrentRecipe(null);
    setActiveSessionId(null);
    setIngredientsInput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200">
      
      {/* Header Navigation */}
      <header className="h-16 flex items-center justify-between px-6 sm:px-8 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleCreateNewClick}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold transition-transform hover:scale-105">
            <ChefHat size={18} className="stroke-[2.5]" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
            ChefBook <span className="text-slate-400 font-normal">| Recipe Engine v1.2</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          {isApiKeyConfigured === null && (
            <span className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-200 text-xs font-semibold">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span> Checking status...
            </span>
          )}
          {isApiKeyConfigured === true && (
            <span className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Server Ready
            </span>
          )}
          {isApiKeyConfigured === false && (
            <span className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 text-xs font-bold animate-pulse" title="Offline sandbox mode is active">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> Local Server Mode
            </span>
          )}
          <button
            onClick={() => setShowFaultSimulator(!showFaultSimulator)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 border ${
              showFaultSimulator 
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-2xs' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
            }`}
            title="Toggle error/resilience testing panel"
          >
            <Sliders size={14} />
            <span>Sandbox Tester</span>
          </button>

          <button
            onClick={handleCreateNewClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus size={14} /> New Recipe
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        
        {/* Stress Test Panel injected right at the top for transparent validation */}
        {(showFaultSimulator || currentFault !== 'none') && (
          <div className="mb-6 animate-in slide-in-from-top-4 duration-300">
            <FaultSimulator currentFault={currentFault} onChangeFault={setCurrentFault} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Inputs & Past History (5/12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ingredients Form Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Free-form Ingredients</label>
                {ingredientsInput.trim() ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientsInput('');
                      setCurrentRecipe(null);
                      setActiveSessionId(null);
                      setError(null);
                    }}
                    className="text-[10px] text-rose-600 hover:text-rose-700 font-extrabold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-100"
                    title="Clear current ingredients list to start typing fresh items from your fridge"
                  >
                    ✕ Clear Fresh
                  </button>
                ) : (
                  <span className="text-[11px] text-indigo-600 font-semibold">Ready to Parse</span>
                )}
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Describe the contents of your fridge or cupboard. Our parser engine will formulate a structured real recipe.
              </p>

              {isApiKeyConfigured === false && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 mb-4 text-xs text-amber-800 leading-relaxed animate-in fade-in duration-300">
                  <div className="flex gap-2 items-start">
                    <span className="text-sm">ℹ️</span>
                    <div>
                      <p className="font-bold text-amber-950 mb-0.5">Local Server Sandbox Mode Active</p>
                      <p className="font-normal text-amber-800 text-[11px]">The application is running in local sandbox mode. Recipe searches and updates are completed on-device. Enter ingredients to search the notebook recipe library.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleInitialGenerate} className="space-y-4">
                <div>
                  <textarea
                    rows={4}
                    value={ingredientsInput}
                    disabled={isLoading || isRefining}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    placeholder="Describe what ingredients you have, e.g., 3 eggs, half a bottle of heavy cream, cheddar cheese, sourdough..."
                    className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-lg p-3 text-sm resize-none transition-all font-mono leading-relaxed text-slate-800"
                    required
                  />
                </div>

                {/* Bilingual Output Language Selector */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">Recipe Language / भाषा</span>
                    <span className="text-[9px] text-slate-500">Generate recipe in English or Hindi</span>
                  </div>
                  <div className="flex gap-1 bg-white border border-slate-200 rounded-md p-0.5 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => setOutputLanguage('en')}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                        outputLanguage === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setOutputLanguage('hi')}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                        outputLanguage === 'hi' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      हिंदी (Hindi)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isRefining || !ingredientsInput.trim()}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Parsing Ingredients...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-indigo-400" />
                      Parse & Generate Tool
                    </>
                  )}
                </button>
              </form>

              {/* Presets Quick Clicks */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  Pre-configured lists:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetLists.map((preset, idx) => (
                    <button
                      key={idx}
                      disabled={isLoading || isRefining}
                      onClick={() => selectPreset(preset.ingredients)}
                      className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Instant Smart Recipe Matcher Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🎯</span>
                  <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500">Instant Recipe Matcher</h3>
                </div>
                {matchedRecipes.length > 0 && (
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                    {matchedRecipes.length} suggestion{matchedRecipes.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {ingredientsInput.trim() && (
                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-2 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide">Strict Match Mode</span>
                    <span className="text-[9px] text-slate-500">Only show 100% available meals</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStrictMatchingOnly(!strictMatchingOnly)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      strictMatchingOnly ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        strictMatchingOnly ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}

              {!ingredientsInput.trim() ? (
                <div className="text-center py-3 text-slate-400">
                  <p className="text-[11px] leading-normal font-medium">Type your ingredients in the box above to find matching recipes from your recipe book instantly!</p>
                </div>
              ) : matchedRecipes.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                  <p className="text-[11px] font-semibold text-slate-600 mb-0.5">No matching recipes found</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-2">
                    {strictMatchingOnly 
                      ? "No recipes match 100% of your ingredients list in your current recipe book."
                      : "No recipes match any of these ingredients in your recipe book."}
                  </p>
                  {strictMatchingOnly && (
                    <button
                      type="button"
                      onClick={() => setStrictMatchingOnly(false)}
                      className="text-[10px] text-indigo-600 font-bold hover:underline mb-2 block w-full text-center"
                    >
                      Disable Strict Match Mode to see partial matches
                    </button>
                  )}
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Or click <strong className="font-semibold text-indigo-600">Parse & Generate Tool</strong> to let our Gourmet Chef formulate a custom recipe!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {matchedRecipes.slice(0, 4).map((match) => {
                    const isFullyMatched = match.matchPercentage === 100;
                    return (
                      <div 
                        key={match.session.id} 
                        className={`p-2.5 rounded-lg border transition-all flex gap-3 ${
                          activeSessionId === match.session.id
                            ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-500/10'
                            : 'bg-slate-50 hover:bg-slate-100/70 border-slate-100'
                        }`}
                      >
                        {/* Compact Recipe Thumbnail */}
                        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-slate-200 border border-slate-200/50">
                          <img
                            src={getRecipeImageUrl(match.session.recipe.title)}
                            alt={match.session.recipe.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content Area */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-1.5 mb-1">
                            <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                              {match.session.recipe.title}
                            </h4>
                            <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.25 rounded shrink-0 ${
                              isFullyMatched 
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : match.matchPercentage >= 50
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                              {match.matchPercentage}% match
                            </span>
                          </div>

                          {/* Match Analysis */}
                          <div className="text-[9px] space-y-0.5 mb-2 leading-relaxed">
                            <div className="flex flex-wrap gap-0.5 items-center">
                              <span className="text-slate-400 font-bold mr-1">Have:</span>
                              {match.matchedNames.map((name, i) => (
                                <span key={i} className="bg-green-50 text-green-700 px-1 rounded border border-green-100 font-medium">
                                  ✓ {name.split(' (')[0]}
                                </span>
                              ))}
                            </div>
                            {match.missingNames.length > 0 && (
                              <div className="flex flex-wrap gap-0.5 items-center">
                                <span className="text-slate-400 font-bold mr-1">Need:</span>
                                {match.missingNames.map((name, i) => (
                                  <span key={i} className="bg-amber-50 text-amber-700 px-1 rounded border border-amber-100">
                                    + {name.split(' (')[0]}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSelectSession(match.session.id)}
                            className="w-full bg-white hover:bg-indigo-50 border border-slate-200 text-indigo-700 font-bold text-[10px] py-1 rounded transition-colors shadow-2xs cursor-pointer"
                          >
                            View & Cook This Recipe
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Session Sidebar History */}
            <SessionSidebar
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={handleSelectSession}
              onDeleteSession={handleDeleteSession}
              onClearAll={handleClearAllSessions}
            />

          </div>

          {/* Right Column: Recipe View / Active Loading / Error State / Empty State (8/12 cols) */}
          <div className="lg:col-span-8">
            
            {/* 1. Loading State Screen */}
            {isLoading && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative mb-6">
                  {/* Outer spinning ring */}
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div>
                  {/* Inside Chef icon */}
                  <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 animate-pulse" size={24} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  ChefBook Recipe Engine v1.2
                </h3>
                
                {/* Dynamic Rotating Phrase */}
                <p className="text-xs text-indigo-700 font-mono font-semibold bg-indigo-50 px-3 py-1 rounded border border-indigo-100 min-h-[26px]">
                  {loadingPhrases[activePhraseIndex]}
                </p>
                
                <p className="text-xs text-slate-500 mt-4 max-w-sm leading-relaxed">
                  Extracting structure, step schedules, and ingredient units from free-form text. Please stand by.
                </p>
              </div>
            )}

            {/* 2. Error State Screen with detailed descriptions and single-click Retry */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-rose-100 border border-rose-200 text-rose-700 mb-4 animate-bounce">
                  <AlertTriangle size={28} />
                </div>

                <h3 className="text-xl font-bold text-rose-950 mb-2">
                  {error.title}
                </h3>
                <p className="text-sm text-rose-800 max-w-lg mb-4 leading-relaxed font-medium">
                  {error.message}
                </p>

                {currentFault !== 'none' && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-left max-w-lg shadow-2xs">
                    <p className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
                      <span>⚠️</span> Chaos Injector Fault is Active!
                    </p>
                    <p className="text-[11px] text-amber-800 leading-relaxed mb-3.5">
                      You currently have the <strong className="font-semibold text-rose-950">"{currentFault === 'wrong_shape' ? 'Wrong Schema' : currentFault === 'malformed_json' ? 'Broken Syntax' : currentFault === 'server_error' ? '500 Server Crash' : currentFault}"</strong> fault mode active in the Chaos Injector at the top of the screen. This deliberately forces your recipe generation requests to fail in order to test application robustness.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentFault('none');
                        setError(null);
                      }}
                      className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-3 py-1.5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      ✓ Switch to Healthy Mode & Clear Error
                    </button>
                  </div>
                )}

                {/* Developer raw trace details box */}
                <div className="w-full bg-slate-900 text-slate-300 font-mono text-[10px] p-3 rounded-lg text-left max-h-[120px] overflow-y-auto mb-6 shadow-inner border border-slate-800 select-all">
                  <span className="text-rose-400 font-bold">Traceback:</span> {error.rawDetails}
                </div>

                {error.canRetry && (
                  <button
                    onClick={handleRetry}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl px-6 py-2.5 text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <RefreshCw size={14} /> Retry Generation
                  </button>
                )}

                {/* Smart Matcher suggestions to rescue user on 503 errors */}
                {matchedRecipes.length > 0 && (
                  <div className="w-full mt-6 pt-5 border-t border-rose-200/60 text-left">
                    <p className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span>💡</span> Or instantly cook matching recipes in your local book:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchedRecipes.slice(0, 4).map((match) => (
                        <div key={match.session.id} className="bg-white border border-rose-100 rounded-xl p-3 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                                {match.session.recipe.title}
                              </h4>
                              <span className="bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.25 rounded text-[8px] border border-indigo-100 shrink-0">
                                {match.matchPercentage}% match
                              </span>
                            </div>
                            <div className="text-[9px] text-slate-500 font-medium mb-2.5">
                              Matched {match.matchedCount} of {match.totalRecipeIngredients} ingredients
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectSession(match.session.id);
                            }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] py-1.5 rounded-lg transition-colors text-center"
                          >
                            Cook This Instead
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Empty/Welcome State Screen */}
            {!isLoading && !currentRecipe && !error && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center shadow-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 mb-4">
                  <ChefHat size={36} className="stroke-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Culinary Parser Ready
                </h3>
                <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                  Submit any combination of groceries, leftovers, or custom food descriptions. The system will synthesize a beautiful, deterministic user interface.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => selectPreset(presetLists[0].ingredients)}
                    className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-sm transition-all"
                  >
                    Try "Sunday Brunch" Preset
                  </button>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">or</span>
                  <button
                    onClick={() => selectPreset(presetLists[1].ingredients)}
                    className="bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer shadow-sm transition-all"
                  >
                    Try "Quick Stir-Fry"
                  </button>
                </div>
              </div>
            )}

            {/* 4. Interactive Recipe Component */}
            {currentRecipe && !isLoading && !error && (
              <RecipeCard
                recipe={currentRecipe}
                onRefine={handleRefine}
                isRefining={isRefining}
              />
            )}

          </div>

        </div>

      </main>

      {/* Global Status Bar */}
      <footer className="h-10 bg-white border-t border-slate-200 flex items-center px-6 sm:px-8 justify-between shrink-0 font-sans text-xs text-slate-500">
        <div>
          <span>© {new Date().getFullYear()} ChefBook Planner. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
          <span>Recipe Matcher v1.2</span>
        </div>
      </footer>

    </div>
  );
}
