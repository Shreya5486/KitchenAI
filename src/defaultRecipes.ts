import { Session } from './types';

export const defaultSessions: Session[] = [
  {
    id: "default-session-1",
    timestamp: Date.now() - 3600000 * 24 * 7,
    ingredientsInput: "chicken breast, olive oil, rosemary, garlic cloves, salt, pepper",
    refinements: [],
    recipe: {
      title: "Garlic Rosemary Pan-Seared Chicken",
      description: "Juicy, golden-brown chicken breast infused with fragrant rosemary and sizzling whole garlic cloves, finished with a splash of premium cold-pressed olive oil.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: 2,
      ingredients: [
        { name: "chicken breasts (skinless, boneless)", quantity: 2, unit: "pieces", swaps: ["tofu block", "turkey breast cutlets", "seitan filet"] },
        { name: "extra virgin olive oil", quantity: 2, unit: "tbsp", swaps: ["avocado oil", "unsalted butter", "grapeseed oil"] },
        { name: "fresh rosemary sprigs", quantity: 3, unit: "stems", swaps: ["dried rosemary (1 tsp)", "thyme sprigs", "oregano"] },
        { name: "garlic cloves (peeled and smashed)", quantity: 4, unit: "cloves", swaps: ["garlic powder (1 tsp)", "shallots (1, minced)"] },
        { name: "kosher salt", quantity: 0.5, unit: "tsp", swaps: ["sea salt", "pink Himalayan salt", "soy sauce (for umami twist)"] },
        { name: "coarsely ground black pepper", quantity: 0.25, unit: "tsp", swaps: ["white pepper", "red pepper flakes (for heat)"] }
      ],
      steps: [
        { instruction: "Pat chicken breasts dry with paper towels to ensure a crispy sear, then season both sides generously with kosher salt and black pepper.", durationMinutes: 3 },
        { instruction: "Heat olive oil in a medium skillet or cast iron pan over medium-high heat until it begins to shimmer but not smoke.", durationMinutes: 2 },
        { instruction: "Carefully place the seasoned chicken breasts in the hot skillet. Cook undisturbed for 5-6 minutes until a beautiful golden crust forms on the bottom.", durationMinutes: 6 },
        { instruction: "Flip the chicken breasts over, then scatter the smashed garlic cloves and rosemary sprigs directly into the warm oil around the meat.", durationMinutes: 1 },
        { instruction: "Tilt the pan slightly and use a metal spoon to continuously baste the tops of the chicken breasts with the hot infused rosemary-garlic oil.", durationMinutes: 4 },
        { instruction: "Verify internal temperature reaches 165°F (74°C). Transfer chicken to a clean cutting board and let rest for 5 minutes before slicing to preserve juiciness.", durationMinutes: 5 }
      ],
      nutrition: {
        calories: "320 kcal",
        protein: "35g",
        carbs: "2g",
        fat: "18g"
      },
      chefTip: "Always let chicken rest after cooking! Cutting into it immediately causes all the delicious internal juices to escape onto your cutting board, leaving the meat dry."
    }
  },
  {
    id: "default-session-2",
    timestamp: Date.now() - 3600000 * 24 * 6,
    ingredientsInput: "fusilli pasta, basil pesto, cherry tomatoes, parmesan, pine nuts",
    refinements: [],
    recipe: {
      title: "Vibrant Pesto Fusilli with Blistered Tomatoes",
      description: "An elegant, satisfying bowl of al dente spiral pasta tossed with premium basil pesto, bright sweet blistered tomatoes, and fresh shavings of salty parmigiano-reggiano.",
      prepTime: "5 mins",
      cookTime: "12 mins",
      servings: 4,
      ingredients: [
        { name: "fusilli pasta (or penne)", quantity: 350, unit: "g", swaps: ["gluten-free chickpea pasta", "spaghetti", "zucchini noodles"] },
        { name: "prepared basil pesto", quantity: 0.5, unit: "cup", swaps: ["sun-dried tomato pesto", "arugula-walnut pesto", "chimichurri"] },
        { name: "sweet cherry tomatoes (halved)", quantity: 1, unit: "cup", swaps: ["grape tomatoes", "diced sun-dried tomatoes", "roasted bell peppers"] },
        { name: "Parmigiano-Reggiano cheese (grated)", quantity: 0.25, unit: "cup", swaps: ["vegan nutritional yeast", "pecorino romano", "feta crumble"] },
        { name: "toasted pine nuts", quantity: 2, unit: "tbsp", swaps: ["slivered almonds", "chopped walnuts", "pumpkin seeds"] },
        { name: "extra virgin olive oil", quantity: 1, unit: "tbsp", swaps: ["butter", "grapeseed oil"] }
      ],
      steps: [
        { instruction: "Bring a large pot of heavily salted water (it should taste like the sea!) to a rolling boil over high heat.", durationMinutes: 6 },
        { instruction: "Add fusilli pasta and cook, stirring occasionally, until it reaches al dente texture according to package instructions (about 9-10 minutes).", durationMinutes: 10 },
        { instruction: "While pasta cooks, heat olive oil in a separate pan over medium heat. Add cherry tomatoes and cook until they soften slightly and begin to blister.", durationMinutes: 4 },
        { instruction: "CRITICAL STEP: Before draining your cooked pasta, scoop out and save half a cup of the starchy pasta boiling water.", durationMinutes: 1 },
        { instruction: "Drain the pasta and return it immediately to the warm pot off the heat. Add basil pesto, blistered cherry tomatoes, and 2-3 tablespoons of the saved pasta water.", durationMinutes: 2 },
        { instruction: "Toss vigorously! The starchy water and pesto will emulsify into a silky, luxurious sauce coating every single spiral. Garnish with cheese and pine nuts.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "450 kcal",
        protein: "12g",
        carbs: "56g",
        fat: "20g"
      },
      chefTip: "Never discard all your pasta water! Pasta water is packed with starch that acts as a natural emulsifier, binding oil-based pesto or sauce perfectly to the pasta so it doesn't separate."
    }
  },
  {
    id: "default-session-3",
    timestamp: Date.now() - 3600000 * 24 * 5,
    ingredientsInput: "banana, eggs, protein powder, oat flour, honey, blueberries",
    refinements: [],
    recipe: {
      title: "Superfood Protein Pancake Stack",
      description: "Naturally sweet, fluffy, wheat-free protein pancakes powered by ripe bananas, oat flour, and juicy fresh blueberries.",
      prepTime: "8 mins",
      cookTime: "10 mins",
      servings: 1,
      ingredients: [
        { name: "ripe banana (mashed)", quantity: 1, unit: "piece", swaps: ["apple sauce (1/3 cup)", "pumpkin puree"] },
        { name: "large eggs", quantity: 2, unit: "pieces", swaps: ["flax egg (2 tbsp ground flax + 5 tbsp water)", "egg whites (1/2 cup)"] },
        { name: "vanilla whey protein powder", quantity: 1, unit: "scoop", swaps: ["plant-based protein", "oat flour (extra 30g)", "greek yogurt (2 tbsp)"] },
        { name: "rolled oat flour", quantity: 0.25, unit: "cup", swaps: ["almond flour", "coconut flour (1.5 tbsp)", "whole wheat flour"] },
        { name: "fresh blueberries", quantity: 0.5, unit: "cup", swaps: ["frozen berries", "dark chocolate chips", "banana slices"] },
        { name: "pure organic honey", quantity: 1, unit: "tbsp", swaps: ["maple syrup", "agave nectar", "monk fruit drops"] }
      ],
      steps: [
        { instruction: "In a medium bowl, peel and mash the banana with a fork until it is almost completely liquid and smooth with no large lumps.", durationMinutes: 2 },
        { instruction: "Crack the eggs into the bowl, add the vanilla protein powder and oat flour, then whisk vigorously until a uniform, pouring batter forms.", durationMinutes: 3 },
        { instruction: "Heat a non-stick skillet over medium-low heat and coat lightly with cooking spray or a small dab of butter.", durationMinutes: 2 },
        { instruction: "Pour batter in small circles (about 4 inches wide) to make flipping easy. Drop fresh blueberries onto the top of each wet pancake.", durationMinutes: 1 },
        { instruction: "Cook for 2-3 minutes until you see bubbles form on the surface and the edges look slightly dry. Carefully slide a spatula underneath and flip.", durationMinutes: 3 },
        { instruction: "Cook the second side for another 1-2 minutes until puffed and fully set. Stack high on a plate and drizzle with honey.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "390 kcal",
        protein: "28g",
        carbs: "42g",
        fat: "11g"
      },
      chefTip: "Cook protein pancakes on lower heat than normal pancakes! Protein powder burns easily, so keeping the pan on medium-low ensures the interior cooks fully without charring the sweet outside."
    }
  },
  {
    id: "default-session-4",
    timestamp: Date.now() - 3600000 * 24 * 4,
    ingredientsInput: "bread, ripe avocado, eggs, cherry tomatoes, salt, chili flakes, butter",
    refinements: [],
    recipe: {
      title: "Gourmet Avocado Toast with Crispy Soft-Boiled Egg",
      description: "Thick slice of toasted artisanal bread spread with seasoned creamy mashed avocado, crowned with a crispy soft-boiled egg, blistered cherry tomatoes, and red pepper flakes.",
      prepTime: "7 mins",
      cookTime: "8 mins",
      servings: 1,
      ingredients: [
        { name: "artisanal bread (sourdough or rustic)", quantity: 1, unit: "slice", swaps: ["gluten-free bread", "bagel", "sweet potato toast slice"] },
        { name: "ripe avocado", quantity: 1, unit: "piece", swaps: ["hummus (3 tbsp)", "guacamole pack"] },
        { name: "fresh egg", quantity: 1, unit: "piece", swaps: ["crumbled tofu (40g)", "smoked salmon slice"] },
        { name: "sweet cherry tomatoes (halved)", quantity: 0.5, unit: "cup", swaps: ["sun-dried tomatoes", "cucumber slices"] },
        { name: "salted butter", quantity: 1, unit: "tsp", swaps: ["ghee", "olive oil spray"] },
        { name: "red chili flakes", quantity: 0.25, unit: "tsp", swaps: ["cayenne pepper", "fresh jalapeño rings"] },
        { name: "coarse sea salt & black pepper", quantity: 0.25, unit: "tsp", swaps: ["everything bagel seasoning"] }
      ],
      steps: [
        { instruction: "Bring a small pot of water to a boil. Gently lower the egg into boiling water and cook for exactly 6 minutes and 30 seconds for a jammy soft-boiled yolk. Immediately transfer to ice water.", durationMinutes: 7 },
        { instruction: "Cut avocado in half, discard the pit, and scoop the flesh into a small bowl. Mash with a fork, seasoning with salt, pepper, and a tiny squeeze of lemon juice if available.", durationMinutes: 2 },
        { instruction: "Toast the bread slice in a toaster or pan with butter until golden brown and super crispy.", durationMinutes: 2 },
        { instruction: "In a tiny skillet over medium-high heat, toss cherry tomatoes with butter or oil until they blister and soften slightly, about 3 minutes.", durationMinutes: 3 },
        { instruction: "Carefully peel the soft-boiled egg. Spread the seasoned mashed avocado evenly across the warm toasted sourdough slice.", durationMinutes: 2 },
        { instruction: "Place blistered cherry tomatoes on top, slice the egg in half to reveal the golden liquid yolk, place it center stage, and garnish with red chili flakes.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "340 kcal",
        protein: "11g",
        carbs: "22g",
        fat: "24g"
      },
      chefTip: "An ice bath is crucial for soft-boiled eggs! It immediately halts the cooking process, ensuring your yolk remains beautifully runny and jammy while contracting the egg slightly for effortless peeling."
    }
  },
  {
    id: "default-session-5",
    timestamp: Date.now() - 3600000 * 24 * 3,
    ingredientsInput: "chicken breast, broccoli heads, soy sauce, garlic cloves, ginger, sesame oil, cornstarch, jasmine rice",
    refinements: [],
    recipe: {
      title: "Classic Garlic-Ginger Teriyaki Stir-Fry",
      description: "High-protein seared chicken breasts tossed with crisp broccoli florets in a glistening sweet & savory house garlic-ginger teriyaki glaze, served over fluffy jasmine rice.",
      prepTime: "12 mins",
      cookTime: "13 mins",
      servings: 2,
      ingredients: [
        { name: "chicken breasts (sliced into thin strips)", quantity: 2, unit: "pieces", swaps: ["firm tofu cubes", "beef sirloin strips", "peeled shrimp"] },
        { name: "broccoli florets", quantity: 2, unit: "cups", swaps: ["snap peas", "sliced bell peppers", "bok choy"] },
        { name: "low-sodium soy sauce", quantity: 0.25, unit: "cup", swaps: ["tamari (gluten-free)", "coconut aminos"] },
        { name: "garlic cloves (finely minced)", quantity: 3, unit: "cloves", swaps: ["garlic paste (1 tbsp)"] },
        { name: "fresh ginger root (peeled and grated)", quantity: 1, unit: "tbsp", swaps: ["ginger powder (1/2 tsp)"] },
        { name: "pure sesame oil", quantity: 1, unit: "tbsp", swaps: ["avocado oil", "canola oil"] },
        { name: "cornstarch (dissolved in 2 tbsp cold water)", quantity: 1, unit: "tsp", swaps: ["tapioca flour", "arrowroot starch"] },
        { name: "brown sugar or organic honey", quantity: 1.5, unit: "tbsp", swaps: ["maple syrup", "stevia drop"] },
        { name: "jasmine rice (uncooked)", quantity: 0.75, unit: "cup", swaps: ["brown rice", "quinoa", "cauliflower rice"] }
      ],
      steps: [
        { instruction: "Rinse and cook the jasmine rice according to package directions (usually 1.5 cups water to 1 cup rice, simmered covered for 15 mins).", durationMinutes: 15 },
        { instruction: "Whisk soy sauce, minced garlic, grated ginger, brown sugar, and sesame oil in a small bowl. In another small bowl, mix cornstarch and cold water.", durationMinutes: 3 },
        { instruction: "Heat a large skillet or wok over high heat with 1 tsp oil. Sauté sliced chicken breast strips for 4-5 minutes until golden and fully cooked. Set aside.", durationMinutes: 5 },
        { instruction: "In the same pan, add 2 tbsp water and the broccoli florets. Cover with a lid and steam broccoli for 2-3 minutes until bright green yet crisp.", durationMinutes: 3 },
        { instruction: "Pour the soy-ginger sauce mixture into the skillet with the broccoli. Bring to a simmer, then stir in the cornstarch slurry to thicken.", durationMinutes: 2 },
        { instruction: "Return cooked chicken strips to the skillet. Toss everything together for 1 minute until coated in a thick, shiny glaze. Serve hot over jasmine rice.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "510 kcal",
        protein: "38g",
        carbs: "62g",
        fat: "12g"
      },
      chefTip: "Steaming the broccoli with a splash of water directly in the wok before saucing creates the perfect vibrant green color and tender-crisp snap without requiring double boiling."
    }
  },
  {
    id: "default-session-6",
    timestamp: Date.now() - 3600000 * 24 * 2,
    ingredientsInput: "chickpeas, coconut milk, curry powder, spinach, onion, garlic cloves, basmati rice",
    refinements: [],
    recipe: {
      title: "One-Pot Creamy Coconut Chickpea Curry",
      description: "A rich, velvety vegan curry featuring tender canned chickpeas simmered in spiced coconut milk, enriched with fresh spinach leaves and served over warm basmati rice.",
      prepTime: "8 mins",
      cookTime: "17 mins",
      servings: 3,
      ingredients: [
        { name: "canned chickpeas (drained and rinsed)", quantity: 1, unit: "can", swaps: ["white butter beans", "cooked green lentils", "paneer cubes"] },
        { name: "full-fat canned coconut milk", quantity: 1, unit: "can", swaps: ["light coconut milk", "heavy cream (for non-vegan)"] },
        { name: "yellow curry powder", quantity: 1, unit: "tbsp", swaps: ["garam masala + turmeric", "red curry paste (2 tbsp)"] },
        { name: "fresh baby spinach", quantity: 2, unit: "cups", swaps: ["chopped kale", "swiss chard", "green peas"] },
        { name: "yellow onion (finely diced)", quantity: 1, unit: "piece", swaps: ["shallots", "red onion"] },
        { name: "garlic cloves (minced)", quantity: 3, unit: "cloves", swaps: ["shallot (1)"] },
        { name: "coconut oil or olive oil", quantity: 1, unit: "tbsp", swaps: ["ghee", "butter"] },
        { name: "basmati rice (uncooked)", quantity: 1, unit: "cup", swaps: ["jasmine rice", "brown rice", "naan bread"] }
      ],
      steps: [
        { instruction: "Cook basmati rice according to package directions (about 12-15 minutes cooking time) and keep warm.", durationMinutes: 15 },
        { instruction: "Heat coconut oil in a deep pot over medium heat. Sauté diced yellow onion and minced garlic for 3-4 minutes until translucent and fragrant.", durationMinutes: 4 },
        { instruction: "Add yellow curry powder to the pot and stir constantly for 1 minute to toast the spices and unlock their aromatic essential oils.", durationMinutes: 1 },
        { instruction: "Pour in the can of creamy coconut milk and add the rinsed chickpeas. Stir thoroughly to combine, scrape any brown bits from the bottom, and bring to a simmer.", durationMinutes: 2 },
        { instruction: "Reduce heat to low and let simmer gently uncovered for 10 minutes until the sauce reduces slightly and the chickpeas absorb the flavors.", durationMinutes: 10 },
        { instruction: "Fold in the fresh baby spinach leaves. Cook for 1-2 minutes until they wilt completely. Season with salt, pepper, and lime juice if handy, and serve over rice.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "480 kcal",
        protein: "11g",
        carbs: "58g",
        fat: "23g"
      },
      chefTip: "Always toast your dry curry powder in hot oil first! Cooking spices directly in fat before adding liquids dramatically amplifies their flavor depth and eliminates raw chalky undertones."
    }
  },
  {
    id: "default-session-7",
    timestamp: Date.now() - 3600000 * 1,
    ingredientsInput: "tortilla, pizza sauce, mozzarella cheese, fresh basil, olive oil, tomato slices",
    refinements: [],
    recipe: {
      title: "10-Minute Tortilla Margherita Flatbread",
      description: "An incredibly fast, ultra-crispy flatbread pizza utilizing a standard flour tortilla as a super thin crust, topped with marinara, melty mozzarella, tomatoes, and aromatic fresh basil.",
      prepTime: "3 mins",
      cookTime: "7 mins",
      servings: 1,
      ingredients: [
        { name: "large flour tortilla (or wrap)", quantity: 1, unit: "piece", swaps: ["pita bread", "naan bread", "gluten-free wrap"] },
        { name: "marinara or pizza sauce", quantity: 3, unit: "tbsp", swaps: ["pesto", "olive oil & garlic paste"] },
        { name: "shredded mozzarella cheese", quantity: 0.5, unit: "cup", swaps: ["vegan mozzarella", "provolone blend", "feta crumble"] },
        { name: "fresh basil leaves", quantity: 5, unit: "leaves", swaps: ["dried oregano (1/2 tsp)", "fresh baby spinach"] },
        { name: "fresh tomato (sliced thin)", quantity: 0.5, unit: "piece", swaps: ["sundried tomatoes", "roasted cherry tomatoes"] },
        { name: "extra virgin olive oil", quantity: 1, unit: "tsp", swaps: ["garlic butter"] }
      ],
      steps: [
        { instruction: "Preheat your oven to 400°F (200°C) or prepare a large dry cast iron skillet over medium-high heat.", durationMinutes: 3 },
        { instruction: "Brush one side of the flour tortilla lightly with olive oil. Toast it oil-side-down in the pan or oven for 2 minutes to crisp the bottom.", durationMinutes: 2 },
        { instruction: "Spread the pizza sauce evenly over the tortilla crust, leaving a very small border around the edge to ensure a crunchy crust.", durationMinutes: 1 },
        { instruction: "Scatter half the mozzarella cheese, lay the thin fresh tomato slices on top, and cover with the remaining mozzarella to lock them in.", durationMinutes: 1 },
        { instruction: "Bake in the oven for 5 minutes, or cover your skillet with a tight-fitting lid on low heat for 4 minutes, until the cheese is bubbling and golden.", durationMinutes: 5 },
        { instruction: "Slide the flatbread onto a cutting board, garnish with fresh hand-torn basil leaves, drizzle with a tiny touch of olive oil, slice, and enjoy.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "290 kcal",
        protein: "14g",
        carbs: "24g",
        fat: "15g"
      },
      chefTip: "Brushing and pre-toasting one side of your tortilla crust BEFORE adding any sauces guarantees a satisfyingly crispy cracker-like thin pizza crust that won't get soggy under the toppings!"
    }
  },
  {
    id: "default-session-8",
    timestamp: Date.now() - 3600000 * 24 * 8,
    ingredientsInput: "eggs, butter, milk, salt, pepper",
    refinements: [],
    recipe: {
      title: "Perfect Soft-Scrambled Eggs",
      description: "Incredibly creamy, velvety, and pillow-soft scrambled eggs cooked low and slow with real butter, seasoned simply to let the farm-fresh egg flavor shine.",
      prepTime: "2 mins",
      cookTime: "5 mins",
      servings: 1,
      ingredients: [
        { name: "fresh large eggs", quantity: 3, unit: "pieces", swaps: ["egg whites (1 cup)", "silken tofu scramble"] },
        { name: "unsalted butter", quantity: 1, unit: "tbsp", swaps: ["salted butter", "olive oil", "ghee"] },
        { name: "whole milk (or cream)", quantity: 1, unit: "tbsp", swaps: ["water", "almond milk", "no milk (just egg)"] },
        { name: "fine sea salt", quantity: 0.25, unit: "tsp", swaps: ["kosher salt", "pink salt"] },
        { name: "ground black pepper", quantity: 0.125, unit: "tsp", swaps: ["white pepper", "cayenne pepper"] }
      ],
      steps: [
        { instruction: "Crack eggs into a bowl, add the milk (or water), and whisk vigorously for a full 45 seconds to incorporate air and make them ultra fluffy.", durationMinutes: 1 },
        { instruction: "Melt butter in a small non-stick skillet over medium-low heat until it begins to melt and coat the pan but not brown.", durationMinutes: 1 },
        { instruction: "Pour the egg mixture into the warm pan. Let it sit undisturbed for 20 seconds to form a light layer on the bottom.", durationMinutes: 1 },
        { instruction: "Using a silicone spatula, continuously push the eggs from the outer edges toward the center to create soft, large, beautiful folds.", durationMinutes: 2 },
        { instruction: "Remove from heat when the eggs are still slightly wet and glossy—they will continue to cook on the hot plate from residual heat.", durationMinutes: 1 },
        { instruction: "Serve immediately on a warm plate. Garnish with a pinch of sea salt and freshly ground black pepper.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "220 kcal",
        protein: "18g",
        carbs: "1g",
        fat: "16g"
      },
      chefTip: "The secret to soft scrambled eggs is removing them from the heat early! If you wait until they look fully dry in the skillet, they will end up rubbery and tough by the time they reach your plate."
    }
  },
  {
    id: "default-session-9",
    timestamp: Date.now() - 3600000 * 24 * 9,
    ingredientsInput: "potatoes, olive oil, garlic cloves, salt, black pepper, butter",
    refinements: [],
    recipe: {
      title: "Garlic Butter Skillet Roasted Potatoes",
      description: "Crispy, golden-brown skin-on diced potatoes tossed in a sizzling pool of fragrant melted garlic butter and simple herbs.",
      prepTime: "8 mins",
      cookTime: "20 mins",
      servings: 3,
      ingredients: [
        { name: "potatoes (Yukon gold or Russet)", quantity: 3, unit: "pieces", swaps: ["sweet potatoes", "baby potatoes", "radishes (low carb)"] },
        { name: "olive oil", quantity: 2, unit: "tbsp", swaps: ["avocado oil", "canola oil"] },
        { name: "salted butter", quantity: 1.5, unit: "tbsp", swaps: ["ghee", "vegan butter"] },
        { name: "garlic cloves (finely minced)", quantity: 4, unit: "cloves", swaps: ["garlic powder (1.5 tsp)"] },
        { name: "sea salt", quantity: 0.5, unit: "tsp", swaps: ["pink salt"] },
        { name: "ground black pepper", quantity: 0.25, unit: "tsp", swaps: ["red pepper flakes"] }
      ],
      steps: [
        { instruction: "Scrub the potatoes thoroughly to remove any dirt. Cut them into small 1/2-inch cubes (leaving the nutrient-rich skin on).", durationMinutes: 3 },
        { instruction: "Pat the potato cubes completely dry with clean paper towels. Removing moisture is the absolute key to achieving a crispy texture.", durationMinutes: 2 },
        { instruction: "Heat olive oil in a large skillet or cast iron pan over medium-high heat until hot and shimmering.", durationMinutes: 2 },
        { instruction: "Add potato cubes in a single flat layer. Cook undisturbed for 5-6 minutes until the bottom sides form a golden-brown crust.", durationMinutes: 6 },
        { instruction: "Toss/flip the potatoes, reduce heat to medium, and cook for another 8-10 minutes, stirring occasionally, until tender when pierced with a fork.", durationMinutes: 9 },
        { instruction: "Add the butter, minced garlic, salt, and pepper to the skillet. Toss constantly for 2 minutes so the butter melts and the garlic cooks without burning. Serve piping hot.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "240 kcal",
        protein: "4g",
        carbs: "32g",
        fat: "11g"
      },
      chefTip: "Always dry your potatoes thoroughly after cutting! Excess water or moisture creates steam in the skillet, which results in soggy potatoes instead of a crispy golden crust."
    }
  },
  {
    id: "default-session-10",
    timestamp: Date.now() - 3600000 * 24 * 10,
    ingredientsInput: "bread, cheddar cheese, butter",
    refinements: [],
    recipe: {
      title: "Classic Melty Grilled Cheese",
      description: "The ultimate comfort food: golden, buttery, pan-toasted artisanal bread encasing a thick, oozing center of perfectly melted cheddar cheese.",
      prepTime: "2 mins",
      cookTime: "6 mins",
      servings: 1,
      ingredients: [
        { name: "sliced bread (white, sourdough, or wheat)", quantity: 2, unit: "slices", swaps: ["gluten-free bread", "bagel halves", "tortillas"] },
        { name: "cheddar cheese (sliced or shredded)", quantity: 0.75, unit: "cup", swaps: ["mozzarella", "provolone", "swiss", "vegan cheese"] },
        { name: "salted butter (softened)", quantity: 1, unit: "tbsp", swaps: ["mayonnaise (spread)", "margarine", "olive oil"] }
      ],
      steps: [
        { instruction: "Spread the softened butter evenly across one side of each slice of bread. This will be the outside that touches the skillet.", durationMinutes: 1 },
        { instruction: "Heat a non-stick skillet or griddle over medium-low heat. Lower heat ensures the bread toasts perfectly without burning before the cheese melts.", durationMinutes: 2 },
        { instruction: "Place one slice of bread, buttered-side-down, into the skillet. Immediately pile the cheddar cheese evenly on top.", durationMinutes: 1 },
        { instruction: "Place the second slice of bread on top of the cheese, buttered-side-up, facing the outside.", durationMinutes: 1 },
        { instruction: "Cook for 3-4 minutes until the bottom bread slice is beautiful golden-brown and crispy. Carefully flip with a flat spatula.", durationMinutes: 3 },
        { instruction: "Cook the second side for another 2-3 minutes, pressing down slightly to compress, until the cheese is completely melted and gooey. Slice diagonally.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "380 kcal",
        protein: "14g",
        carbs: "26g",
        fat: "25g"
      },
      chefTip: "Try spreading mayonnaise instead of butter on the outside of the bread! Mayo has a higher smoke point than butter, spreads effortlessly, and creates an incredibly crisp, deep golden crust."
    }
  },
  {
    id: "default-session-11",
    timestamp: Date.now() - 3600000 * 24 * 11,
    ingredientsInput: "cucumber, cherry tomatoes, olive oil, onion, salt, pepper",
    refinements: [],
    recipe: {
      title: "Crunchy Cucumber Tomato Salad",
      description: "A super refreshing, crisp summer salad tossed in a simple dressing of high-quality olive oil, black pepper, and coarse salt.",
      prepTime: "6 mins",
      cookTime: "0 mins",
      servings: 2,
      ingredients: [
        { name: "cucumber (sliced and quartered)", quantity: 1, unit: "piece", swaps: ["zucchini", "bell peppers"] },
        { name: "sweet cherry tomatoes (halved)", quantity: 1, unit: "cup", swaps: ["grape tomatoes", "diced tomatoes"] },
        { name: "extra virgin olive oil", quantity: 1.5, unit: "tbsp", swaps: ["avocado oil", "lemon juice dressing"] },
        { name: "red onion (thinly sliced)", quantity: 0.25, unit: "cup", swaps: ["green onions", "shallots", "no onion"] },
        { name: "coarse sea salt", quantity: 0.25, unit: "tsp", swaps: ["pink salt"] },
        { name: "ground black pepper", quantity: 0.125, unit: "tsp", swaps: ["dried oregano"] }
      ],
      steps: [
        { instruction: "Wash the cucumber thoroughly. You can peel it fully, peel stripes for a pretty pattern, or leave the skin on for maximum crunch.", durationMinutes: 2 },
        { instruction: "Cut cucumber in half lengthwise, then slice into 1/4-inch half-moons. Slice the cherry tomatoes in half.", durationMinutes: 2 },
        { instruction: "Combine sliced cucumbers, tomatoes, and thinly sliced red onions in a medium mixing bowl.", durationMinutes: 1 },
        { instruction: "Drizzle the extra virgin olive oil directly over the chopped vegetables.", durationMinutes: 1 },
        { instruction: "Sprinkle with coarse sea salt and freshly cracked black pepper. Toss gently to combine all ingredients.", durationMinutes: 1 },
        { instruction: "Let sit for 5 minutes at room temperature before serving—the salt draws out some sweet tomato juices which blend with the olive oil to make a gorgeous dressing.", durationMinutes: 5 }
      ],
      nutrition: {
        calories: "110 kcal",
        protein: "1.5g",
        carbs: "7g",
        fat: "9g"
      },
      chefTip: "For an extra layer of gourmet texture, slice red onions paper-thin and soak them in ice-cold water for 5 minutes before adding to the salad. This removes their harsh, biting sulfur aftertaste!"
    }
  },
  {
    id: "default-session-12",
    timestamp: Date.now() - 3600000 * 24 * 12,
    ingredientsInput: "banana, milk, honey, blueberries, greek yogurt",
    refinements: [],
    recipe: {
      title: "Blueberry Banana Breakfast Smoothie",
      description: "A thick, velvety, sweet smoothie naturally packed with antioxidants, electrolytes, and healthy proteins, perfect for a fast morning meal.",
      prepTime: "4 mins",
      cookTime: "0 mins",
      servings: 1,
      ingredients: [
        { name: "ripe banana", quantity: 1, unit: "piece", swaps: ["frozen mango", "peach slices"] },
        { name: "fresh blueberries", quantity: 0.5, unit: "cup", swaps: ["frozen berries", "strawberries", "raspberries"] },
        { name: "whole milk", quantity: 0.75, unit: "cup", swaps: ["almond milk", "oat milk", "coconut water", "water"] },
        { name: "greek yogurt", quantity: 0.25, unit: "cup", swaps: ["protein powder", "silken tofu", "coconut yogurt"] },
        { name: "pure organic honey", quantity: 1, unit: "tbsp", swaps: ["maple syrup", "agave", "no sweetener"] }
      ],
      steps: [
        { instruction: "Peel the banana and slice it into small chunks. (Pro tip: use a frozen banana for an ice-cold, milkshake-like texture!)", durationMinutes: 1 },
        { instruction: "Add the sliced banana, fresh blueberries, and greek yogurt into your blender jar.", durationMinutes: 1 },
        { instruction: "Pour in the whole milk (or non-dairy alternative) and add the tablespoon of organic honey.", durationMinutes: 1 },
        { instruction: "Secure the blender lid tightly and blend on high speed for 45-60 seconds until completely smooth, purple, and creamy with no fruit chunks left.", durationMinutes: 1 },
        { instruction: "Pour into a tall glass and garnish with a few fresh blueberries on top. Drink immediately.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "280 kcal",
        protein: "10g",
        carbs: "54g",
        fat: "4g"
      },
      chefTip: "Always peel and freeze overripe bananas! They act as a natural sweet thickener for smoothies, eliminating the need to add ice cubes which end up watering down your drink."
    }
  },
  {
    id: "default-session-13",
    timestamp: Date.now() - 3600000 * 24 * 13,
    ingredientsInput: "tortilla, mozzarella cheese, butter, tomato slices",
    refinements: [],
    recipe: {
      title: "Golden Cheese & Tomato Quesadilla",
      description: "Crispy-crusted tortilla pan-toasted with melted mozzarella cheese and sweet, juicy tomato slices.",
      prepTime: "3 mins",
      cookTime: "5 mins",
      servings: 1,
      ingredients: [
        { name: "large flour tortilla", quantity: 1, unit: "piece", swaps: ["corn tortilla", "flatbread", "pita pocket"] },
        { name: "shredded mozzarella cheese", quantity: 0.5, unit: "cup", swaps: ["cheddar", "provolone", "vegan cheese"] },
        { name: "ripe tomato (thinly sliced)", quantity: 0.5, unit: "piece", swaps: ["bell peppers", "spinach leaves"] },
        { name: "unsalted butter", quantity: 1, unit: "tsp", swaps: ["olive oil", "cooking spray"] }
      ],
      steps: [
        { instruction: "Heat a non-stick skillet over medium-low heat and melt half of the butter to coat the surface.", durationMinutes: 1 },
        { instruction: "Lay the flour tortilla flat in the skillet, rotating it to absorb the melted butter.", durationMinutes: 1 },
        { instruction: "Sprinkle mozzarella cheese evenly across one-half of the tortilla.", durationMinutes: 1 },
        { instruction: "Place the thin tomato slices on top of the cheese, and add a tiny pinch of salt and pepper over the tomatoes.", durationMinutes: 1 },
        { instruction: "Using a spatula, carefully fold the empty side of the tortilla over the cheese and tomatoes to create a half-moon shape.", durationMinutes: 1 },
        { instruction: "Cook for 2 minutes on the first side until crispy and golden brown, then flip and cook the other side until cheese is completely melted.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "310 kcal",
        protein: "12g",
        carbs: "22g",
        fat: "18g"
      },
      chefTip: "Press down gently with your spatula as the quesadilla cooks. This compacts the filling, ensuring that the cheese acts as a delicious glue holding the tortilla and tomato slices together."
    }
  },
  {
    id: "default-session-14",
    timestamp: Date.now() - 3600000 * 24 * 14,
    ingredientsInput: "broccoli heads, garlic cloves, butter, salt, pepper",
    refinements: [],
    recipe: {
      title: "Steamed Garlic Butter Broccoli",
      description: "Vibrant, tender-crisp broccoli florets tossed in a rich garlic butter dressing with cracked black pepper.",
      prepTime: "5 mins",
      cookTime: "6 mins",
      servings: 2,
      ingredients: [
        { name: "broccoli heads (cut into florets)", quantity: 2, unit: "heads", swaps: ["cauliflower florets", "green beans", "brussels sprouts"] },
        { name: "garlic cloves (minced)", quantity: 3, unit: "cloves", swaps: ["garlic powder (1 tsp)"] },
        { name: "salted butter", quantity: 2, unit: "tbsp", swaps: ["olive oil", "ghee", "vegan butter"] },
        { name: "kosher salt", quantity: 0.25, unit: "tsp", swaps: ["sea salt"] },
        { name: "ground black pepper", quantity: 0.125, unit: "tsp", swaps: ["lemon juice"] }
      ],
      steps: [
        { instruction: "Chop the broccoli heads into bite-sized florets, washing them thoroughly under cold water.", durationMinutes: 2 },
        { instruction: "In a medium saucepan, add 1/2 inch of water and bring to a boil. Place a steamer basket inside, or add broccoli directly into the water if no basket.", durationMinutes: 2 },
        { instruction: "Add broccoli florets, cover with a tight-fitting lid, and let steam for exactly 3 to 4 minutes until bright green and tender-crisp.", durationMinutes: 4 },
        { instruction: "While broccoli steams, melt butter in a separate tiny pan over medium-low heat. Stir in minced garlic and cook for 1 minute until fragrant.", durationMinutes: 1 },
        { instruction: "Drain the cooked broccoli and transfer to a serving bowl.", durationMinutes: 1 },
        { instruction: "Pour the warm garlic butter mixture over the broccoli, season with salt and black pepper, and toss gently to coat.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "120 kcal",
        protein: "3g",
        carbs: "6g",
        fat: "10g"
      },
      chefTip: "Avoid steaming broccoli too long! Bright green means perfectly cooked; once it turns dull olive green, it becomes mushy and loses its vibrant natural sugars and nutrients."
    }
  },
  {
    id: "default-session-15",
    timestamp: Date.now() - 3600000 * 24 * 15,
    ingredientsInput: "basmati rice, eggs, soy sauce, sesame oil, green onion, salt",
    refinements: [],
    recipe: {
      title: "Quick Egg Fried Rice",
      description: "A lightning-fast, satisfying plate of fluffy seasoned rice stir-fried with scrambled eggs, green onions, and savory soy sauce.",
      prepTime: "5 mins",
      cookTime: "8 mins",
      servings: 2,
      ingredients: [
        { name: "basmati rice (cooked, preferably day-old)", quantity: 3, unit: "cups", swaps: ["jasmine rice", "brown rice", "quinoa"] },
        { name: "large eggs (beaten)", quantity: 3, unit: "pieces", swaps: ["tofu cubes", "scrambled egg whites"] },
        { name: "soy sauce", quantity: 2, unit: "tbsp", swaps: ["tamari", "coconut aminos"] },
        { name: "pure sesame oil", quantity: 1, unit: "tbsp", swaps: ["vegetable oil", "canola oil"] },
        { name: "green onions (chopped)", quantity: 3, unit: "stems", swaps: ["white onion", "chives"] },
        { name: "salt & black pepper", quantity: 0.25, unit: "tsp", swaps: ["garlic powder"] }
      ],
      steps: [
        { instruction: "Ensure your cooked rice is cold and dry (ideally left in the fridge overnight). Cold rice grains separate beautifully during frying.", durationMinutes: 1 },
        { instruction: "Heat 1 tsp of oil in a large skillet or wok over medium-high heat. Pour in beaten eggs and scramble quickly for 1 minute. Remove eggs from pan.", durationMinutes: 2 },
        { instruction: "Add the remaining sesame oil to the hot skillet. Toss in the white parts of the chopped green onions and stir-fry for 30 seconds.", durationMinutes: 1 },
        { instruction: "Add the cold cooked rice to the skillet, breaking up any clumps with a spatula. Stir-fry constantly for 3-4 minutes until the rice gets slightly toasted.", durationMinutes: 4 },
        { instruction: "Pour soy sauce over the rice, stirring thoroughly. Add the scrambled eggs back into the skillet and toss to combine.", durationMinutes: 1 },
        { instruction: "Stir in the green parts of the green onions, season with a pinch of salt and pepper, and serve hot.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "320 kcal",
        protein: "11g",
        carbs: "45g",
        fat: "10g"
      },
      chefTip: "Always use cold, dry rice for fried rice! Freshly cooked, warm rice holds too much moisture, which will steam in the pan and result in a mushy, gummy texture instead of individual toasted grains."
    }
  },
  {
    id: "default-session-16",
    timestamp: Date.now() - 3600000 * 24 * 16,
    ingredientsInput: "fusilli pasta, garlic cloves, olive oil, butter, parmesan, salt, pepper",
    refinements: [],
    recipe: {
      title: "Simple Garlic Butter Parmesan Pasta",
      description: "Quick comfort food: spiral fusilli tossed with a luxurious, silky garlic-butter-parmesan sauce emulsified with starchy pasta cooking water.",
      prepTime: "3 mins",
      cookTime: "10 mins",
      servings: 2,
      ingredients: [
        { name: "fusilli pasta", quantity: 200, unit: "g", swaps: ["spaghetti", "penne", "macaroni"] },
        { name: "garlic cloves (finely sliced)", quantity: 4, unit: "cloves", swaps: ["garlic powder (1 tsp)"] },
        { name: "extra virgin olive oil", quantity: 1, unit: "tbsp", swaps: ["avocado oil"] },
        { name: "unsalted butter", quantity: 2, unit: "tbsp", swaps: ["salted butter", "ghee"] },
        { name: "parmisan cheese (grated)", quantity: 0.33, unit: "cup", swaps: ["pecorino romano", "vegan nutritional yeast"] },
        { name: "kosher salt & black pepper", quantity: 0.5, unit: "tsp", swaps: ["red pepper flakes"] }
      ],
      steps: [
        { instruction: "Bring a large pot of salted water to a boil. Cook fusilli pasta until al dente (usually 9 minutes).", durationMinutes: 9 },
        { instruction: "While pasta cooks, heat olive oil and butter in a large skillet over medium-low heat. Add sliced garlic and cook until soft and fragrant but NOT brown (about 2 minutes).", durationMinutes: 3 },
        { instruction: "CRITICAL ACTION: Scoop out 1/2 cup of the starchy pasta cooking water before draining.", durationMinutes: 1 },
        { instruction: "Drain the pasta and add it directly into the skillet with the garlic butter.", durationMinutes: 1 },
        { instruction: "Pour in 1/4 cup of the saved pasta water and sprinkle the grated parmesan cheese over the top.", durationMinutes: 1 },
        { instruction: "Toss and stir vigorously over low heat for 1-2 minutes until the cheese melts and emulsifies with the water and butter into a silky, shiny glaze. Season and serve.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "410 kcal",
        protein: "13g",
        carbs: "52g",
        fat: "17g"
      },
      chefTip: "Cooking garlic slowly in oil and butter over low heat infuses the fats with sweet, aromatic garlic flavor without developing the bitter taste that comes from burnt garlic."
    }
  },
  {
    id: "default-session-17",
    timestamp: Date.now() - 3600000 * 24 * 17,
    ingredientsInput: "rolled oat flour, milk, honey, banana, salt",
    refinements: [],
    recipe: {
      title: "Creamy Honey Banana Oatmeal",
      description: "A comforting, warm breakfast bowl of creamy rolled oats simmered in milk, sweetened with organic honey and sliced ripe banana.",
      prepTime: "2 mins",
      cookTime: "5 mins",
      servings: 1,
      ingredients: [
        { name: "rolled oats (or oat flour)", quantity: 0.5, unit: "cup", swaps: ["quick oats", "steel cut oats"] },
        { name: "whole milk", quantity: 1, unit: "cup", swaps: ["almond milk", "oat milk", "water"] },
        { name: "ripe banana (sliced)", quantity: 1, unit: "piece", swaps: ["apple slices", "berries"] },
        { name: "pure organic honey", quantity: 1, unit: "tbsp", swaps: ["maple syrup", "brown sugar"] },
        { name: "salt", quantity: 0.05, unit: "tsp", swaps: ["cinnamon (pinch)"] }
      ],
      steps: [
        { instruction: "In a small saucepan, combine the rolled oats, milk, and a tiny pinch of salt (salt is vital to balance the sweetness and bring out the oat flavor).", durationMinutes: 1 },
        { instruction: "Bring to a gentle boil over medium heat, then reduce heat to low and simmer for 4-5 minutes, stirring occasionally, until thick and creamy.", durationMinutes: 5 },
        { instruction: "Stir in half of the sliced banana pieces directly into the oatmeal during the last minute of cooking to let them soften and sweeten the oats.", durationMinutes: 1 },
        { instruction: "Transfer oatmeal to a serving bowl.", durationMinutes: 1 },
        { instruction: "Arrange the remaining fresh banana slices on top in an elegant pattern, and drizzle with the organic honey. Serve warm.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "320 kcal",
        protein: "9g",
        carbs: "58g",
        fat: "5g"
      },
      chefTip: "Always add a tiny pinch of salt to sweet oats! Salt is a flavor enhancer—it suppresses natural bitterness and highlights the deep, creamy nutty flavors of cooking oats and milk."
    }
  },
  {
    id: "default-session-18",
    timestamp: Date.now() - 3600000 * 24 * 18,
    ingredientsInput: "potatoes, milk, butter, salt, pepper",
    refinements: [],
    recipe: {
      title: "Rich & Creamy Mashed Potatoes",
      description: "Fluffy, comforting, classic mashed potatoes beaten with melted butter and warm milk to achieve a velvety texture.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: 3,
      ingredients: [
        { name: "potatoes (peeled and chopped)", quantity: 4, unit: "pieces", swaps: ["sweet potatoes", "cauliflower (low carb)"] },
        { name: "whole milk (warmed)", quantity: 0.5, unit: "cup", swaps: ["heavy cream", "almond milk", "potato cooking water"] },
        { name: "unsalted butter", quantity: 3, unit: "tbsp", swaps: ["salted butter", "olive oil", "ghee"] },
        { name: "fine sea salt", quantity: 0.5, unit: "tsp", swaps: ["kosher salt"] },
        { name: "ground black pepper", quantity: 0.25, unit: "tsp", swaps: ["white pepper", "garlic powder"] }
      ],
      steps: [
        { instruction: "Peel the potatoes and cut them into equal-sized 1-inch chunks to ensure they cook evenly.", durationMinutes: 5 },
        { instruction: "Place potatoes in a pot and cover with cold water. Add 1 tsp of salt. (Always start potatoes in cold water so the center and outside cook at the same rate!).", durationMinutes: 2 },
        { instruction: "Bring to a rolling boil over high heat, then reduce to medium and boil for 12-15 minutes until easily pierced with a fork.", durationMinutes: 15 },
        { instruction: "Drain potatoes thoroughly. Return them to the warm pot off the heat to steam-dry for 1 minute.", durationMinutes: 1 },
        { instruction: "Mash potatoes with a hand potato masher or fork until no large lumps remain.", durationMinutes: 2 },
        { instruction: "Add melted butter and warm milk, then beat vigorously with a wooden spoon until fluffy, smooth, and creamy. Season with salt and pepper.", durationMinutes: 2 }
      ],
      nutrition: {
        calories: "210 kcal",
        protein: "3.5g",
        carbs: "28g",
        fat: "10g"
      },
      chefTip: "Always start your potatoes in COLD water, never boiling water! If you drop raw potato chunks into boiling water, the outsides will overcook and disintegrate into mush before the centers are tender."
    }
  },
  {
    id: "default-session-19",
    timestamp: Date.now() - 3600000 * 24 * 19,
    ingredientsInput: "spinach, eggs, butter, cheese, salt",
    refinements: [],
    recipe: {
      title: "Garlicky Spinach & Feta Scramble",
      description: "Quick high-protein breakfast featuring farm-fresh eggs scrambled with wilted baby spinach and crumbled salty cheese.",
      prepTime: "3 mins",
      cookTime: "4 mins",
      servings: 1,
      ingredients: [
        { name: "fresh baby spinach", quantity: 2, unit: "cups", swaps: ["kale", "arugula", "chopped broccoli"] },
        { name: "large eggs", quantity: 2, unit: "pieces", swaps: ["egg whites", "tofu scramble"] },
        { name: "salted butter", quantity: 1, unit: "tbsp", swaps: ["olive oil", "ghee"] },
        { name: "mozzarella or feta cheese (crumbled)", quantity: 0.25, unit: "cup", swaps: ["cheddar", "parmesan"] },
        { name: "salt & black pepper", quantity: 0.25, unit: "tsp", swaps: ["garlic powder"] }
      ],
      steps: [
        { instruction: "Whisk eggs in a small bowl with a pinch of salt and pepper until fully blended.", durationMinutes: 1 },
        { instruction: "Melt butter in a skillet over medium heat. Add the fresh baby spinach leaves and sauté for 1-2 minutes until completely wilted and reduced.", durationMinutes: 2 },
        { instruction: "Pour the whisked eggs directly over the wilted spinach in the skillet.", durationMinutes: 1 },
        { instruction: "Reduce heat to low and stir slowly with a spatula to form soft scrambles, about 1-2 minutes.", durationMinutes: 2 },
        { instruction: "Just before eggs are fully set, sprinkle the crumbled cheese on top. Let it melt for 30 seconds, then slide onto a plate and enjoy.", durationMinutes: 1 }
      ],
      nutrition: {
        calories: "230 kcal",
        protein: "16g",
        carbs: "2g",
        fat: "18g"
      },
      chefTip: "Spinach is mostly water! Sautéing it briefly before pouring in the eggs cooks off that excess water, preventing your scrambled eggs from turning watery and soggy on the plate."
    }
  },
  {
    id: "default-session-20",
    timestamp: Date.now() - 3600000 * 24 * 20,
    ingredientsInput: "chickpeas, olive oil, salt, garlic cloves, pepper",
    refinements: [],
    recipe: {
      title: "Ultra-Crispy Garlic Roasted Chickpeas",
      description: "A highly addictive, protein-packed healthy snack: crunchy canned chickpeas roasted with extra virgin olive oil, smashed garlic, and spices.",
      prepTime: "5 mins",
      cookTime: "25 mins",
      servings: 2,
      ingredients: [
        { name: "canned chickpeas", quantity: 1, unit: "can", swaps: ["edamame beans", "white beans"] },
        { name: "extra virgin olive oil", quantity: 1.5, unit: "tbsp", swaps: ["avocado oil", "grapeseed oil"] },
        { name: "garlic powder", quantity: 1, unit: "tsp", swaps: ["smashed fresh garlic cloves"] },
        { name: "sea salt & black pepper", quantity: 0.5, unit: "tsp", swaps: ["cayenne pepper", "smoked paprika"] }
      ],
      steps: [
        { instruction: "Preheat your oven to 400°F (200°C) or prepare a large heavy skillet over medium-high heat.", durationMinutes: 5 },
        { instruction: "Drain and rinse the canned chickpeas. Pour them onto a clean kitchen towel and roll them around until they are absolutely bone dry.", durationMinutes: 3 },
        { instruction: "Toss the dried chickpeas with the olive oil, salt, pepper, and garlic powder in a medium bowl.", durationMinutes: 1 },
        { instruction: "Spread the chickpeas in a single flat layer on a baking sheet, ensuring plenty of space between individual beans.", durationMinutes: 1 },
        { instruction: "Roast in the preheated oven for 20-25 minutes, shaking the baking sheet halfway through, until crispy and golden brown.", durationMinutes: 25 },
        { instruction: "Let cool for 5 minutes—they will become even crispier as they cool down! Munch on them as a high-protein snack.", durationMinutes: 5 }
      ],
      nutrition: {
        calories: "180 kcal",
        protein: "7g",
        carbs: "22g",
        fat: "8g"
      },
      chefTip: "To make chickpeas super crispy, dry them completely, and rub off any loose, transparent outer skins! Removing these skins lets moisture escape easily during roasting, leading to a much louder, crisper bite."
    }
  }
];
