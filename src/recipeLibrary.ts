import { Recipe } from './types';

export const recipeLibrary: Recipe[] = [
  {
    title: "Classic Shakshuka",
    description: "A gorgeous, comforting dish of gently poached eggs in a rich, spiced tomato and onion sauce, fragrant with cumin and chili.",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 2,
    ingredients: [
      { name: "eggs", quantity: 4, unit: "pieces", swaps: ["scrambled tofu", "paneer cubes"] },
      { name: "cherry tomatoes or diced tomatoes", quantity: 2, unit: "cups", swaps: ["tomato puree", "marinara sauce"] },
      { name: "onion (finely chopped)", quantity: 1, unit: "piece", swaps: ["shallots", "leeks", "spring onion"] },
      { name: "garlic cloves (minced)", quantity: 3, unit: "cloves", swaps: ["garlic powder", "shallot"] },
      { name: "olive oil", quantity: 2, unit: "tbsp", swaps: ["butter", "coconut oil"] },
      { name: "cumin powder", quantity: 1, unit: "tsp", swaps: ["coriander powder", "garam masala"] },
      { name: "chili powder or chili flakes", quantity: 0.5, unit: "tsp", swaps: ["cayenne pepper", "paprika"] },
      { name: "salt", quantity: 0.5, unit: "tsp", swaps: ["soy sauce"] }
    ],
    steps: [
      { instruction: "Heat olive oil in a medium pan over medium heat. Add the chopped onion and cook until soft and translucent.", durationMinutes: 4 },
      { instruction: "Stir in the minced garlic, cumin powder, and chili powder. Cook for 1 minute until highly fragrant.", durationMinutes: 1 },
      { instruction: "Pour in the chopped tomatoes. Let simmer for 5-7 minutes until the tomatoes break down and form a thick, savory sauce. Season with salt.", durationMinutes: 6 },
      { instruction: "Use a spoon to make 4 small wells in the bubbling sauce, then gently crack an egg into each well.", durationMinutes: 2 },
      { instruction: "Cover the pan and cook on low heat for 5-8 minutes until the egg whites are firm but the yolks remain soft and runny.", durationMinutes: 6 },
      { instruction: "Remove from heat, garnish with chili flakes or black pepper, and serve hot directly from the pan.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "280 kcal",
      protein: "14g",
      carbs: "12g",
      fat: "20g"
    },
    chefTip: "Serve this dish with warm crusty bread to scoop up every last drop of the rich, spiced tomato sauce and luscious soft egg yolks!"
  },
  {
    title: "Paneer Tikka (Tawa Style)",
    description: "Juicy chunks of Indian cottage cheese marinated in a spiced yogurt mix, pan-seared to smoky perfection with onions and bell peppers.",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 2,
    ingredients: [
      { name: "paneer (cottage cheese)", quantity: 250, unit: "g", swaps: ["tofu block", "halloumi cheese", "chicken breast"] },
      { name: "greek yogurt or curd", quantity: 0.5, unit: "cup", swaps: ["sour cream", "vegan yogurt"] },
      { name: "ginger-garlic paste", quantity: 1, unit: "tbsp", swaps: ["minced ginger & garlic"] },
      { name: "chili powder", quantity: 1, unit: "tsp", swaps: ["paprika", "cayenne pepper"] },
      { name: "lemon juice", quantity: 1, unit: "tbsp", swaps: ["lime juice", "vinegar"] },
      { name: "onion (cut into petals)", quantity: 1, unit: "piece", swaps: ["shallots", "green onions"] },
      { name: "butter or oil", quantity: 1.5, unit: "tbsp", swaps: ["ghee", "mustard oil"] },
      { name: "salt", quantity: 0.5, unit: "tsp", swaps: ["black salt"] }
    ],
    steps: [
      { instruction: "In a bowl, mix Greek yogurt, ginger-garlic paste, chili powder, lemon juice, and salt to create a thick marinade.", durationMinutes: 5 },
      { instruction: "Cut paneer into thick cubes, and onion into broad petals. Gently toss them in the marinade until evenly coated.", durationMinutes: 5 },
      { instruction: "Heat butter or oil in a non-stick skillet over medium-high heat until hot.", durationMinutes: 2 },
      { instruction: "Place marinated paneer cubes and onion petals in a single layer in the skillet.", durationMinutes: 1 },
      { instruction: "Sear for 2-3 minutes per side, turning occasionally, until a beautiful smoky char forms on all edges.", durationMinutes: 8 },
      { instruction: "Squeeze fresh lemon juice over the hot paneer tikka and serve immediately as an appetizer.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "18g",
      carbs: "8g",
      fat: "26g"
    },
    chefTip: "To get the absolute best tawa char, ensure your pan is piping hot before adding the paneer, and do not crowd the pan, otherwise the paneer will steam instead of searing!"
  },
  {
    title: "Vegetable Fried Rice",
    description: "An incredibly quick, high-heat stir fry of cooked rice with crisp carrots, sweet onions, and fragrant garlic, tossed in authentic soy sauce.",
    prepTime: "5 mins",
    cookTime: "8 mins",
    servings: 2,
    ingredients: [
      { name: "cooked rice (preferably day-old)", quantity: 2, unit: "cups", swaps: ["cauliflower rice", "cooked quinoa"] },
      { name: "carrot (finely diced)", quantity: 1, unit: "piece", swaps: ["peas", "sweet corn", "cabbage"] },
      { name: "onion (chopped)", quantity: 1, unit: "piece", swaps: ["spring onions", "shallots"] },
      { name: "garlic cloves (minced)", quantity: 3, unit: "cloves", swaps: ["garlic powder", "ginger"] },
      { name: "oil (vegetable or sesame)", quantity: 2, unit: "tbsp", swaps: ["butter", "olive oil"] },
      { name: "soy sauce", quantity: 1.5, unit: "tbsp", swaps: ["tamari", "coconut aminos", "salt"] },
      { name: "black pepper", quantity: 0.25, unit: "tsp", swaps: ["white pepper", "chili flakes"] }
    ],
    steps: [
      { instruction: "Heat the oil in a large skillet or wok over high heat until shimmering.", durationMinutes: 2 },
      { instruction: "Add minced garlic and chopped onion. Stir-fry rapidly for 1-2 minutes until aromatic and onion edges turn golden.", durationMinutes: 2 },
      { instruction: "Add diced carrots (and any other finely chopped veggies you have) and toss for 2 minutes to cook but retain crispness.", durationMinutes: 2 },
      { instruction: "Add the cold cooked rice to the pan, breaking up any large clumps with your spoon.", durationMinutes: 2 },
      { instruction: "Drizzle soy sauce and black pepper evenly over the rice. Stir-fry vigorously for 3 minutes until the rice grains are toasted and fragrant.", durationMinutes: 3 }
    ],
    nutrition: {
      calories: "290 kcal",
      protein: "5g",
      carbs: "45g",
      fat: "10g"
    },
    chefTip: "Cold, dry, day-old rice is the golden rule of fried rice! Freshly cooked rice has too much moisture, which will turn your fried rice gummy and mushy when stir-fried."
  },
  {
    title: "Jeera Aloo (Sautéed Cumin Potatoes)",
    description: "A classic dry Indian side dish where boiled potatoes are tossed in a generous amount of heated cumin seeds, turmeric, and green chilies.",
    prepTime: "5 mins",
    cookTime: "10 mins",
    servings: 3,
    ingredients: [
      { name: "potatoes (boiled and cubed)", quantity: 3, unit: "pieces", swaps: ["sweet potatoes", "cauliflower florets"] },
      { name: "cumin seeds (jeera)", quantity: 1.5, unit: "tsp", swaps: ["cumin powder"] },
      { name: "oil or ghee", quantity: 1.5, unit: "tbsp", swaps: ["butter", "mustard oil"] },
      { name: "chili (green, chopped)", quantity: 1, unit: "piece", swaps: ["chili flakes", "black pepper"] },
      { name: "turmeric powder", quantity: 0.5, unit: "tsp", swaps: ["curry powder"] },
      { name: "salt", quantity: 0.5, unit: "tsp", swaps: ["black salt"] }
    ],
    steps: [
      { instruction: "Cut the boiled potatoes into 1-inch bite-sized cubes.", durationMinutes: 2 },
      { instruction: "Heat oil or ghee in a pan over medium heat. Once hot, add cumin seeds and let them sizzle for 30 seconds until aromatic and brown.", durationMinutes: 1 },
      { instruction: "Add green chopped chilies and cook for 15 seconds.", durationMinutes: 1 },
      { instruction: "Add the boiled potato cubes, turmeric powder, and salt. Stir gently to coat potatoes without breaking them.", durationMinutes: 2 },
      { instruction: "Sauté the potatoes on medium-low heat for 5-6 minutes, stirring occasionally, until they form a delicious, slightly crispy golden outer crust.", durationMinutes: 6 }
    ],
    nutrition: {
      calories: "160 kcal",
      protein: "3g",
      carbs: "24g",
      fat: "6g"
    },
    chefTip: "Boiling potatoes ahead of time and letting them cool completely helps them hold their shape beautifully without disintegrating during the stir-frying process!"
  },
  {
    title: "Garlic Butter Shrimp or Paneer",
    description: "Quick, velvety garlic butter emulsion coating plump shrimp or sautéed paneer cubes, balanced with fresh squeezed lemon juice.",
    prepTime: "5 mins",
    cookTime: "6 mins",
    servings: 2,
    ingredients: [
      { name: "shrimp or paneer blocks", quantity: 300, unit: "g", swaps: ["tofu cubes", "chicken breast strips"] },
      { name: "butter", quantity: 2, unit: "tbsp", swaps: ["olive oil", "ghee"] },
      { name: "garlic cloves (finely minced)", quantity: 5, unit: "cloves", swaps: ["garlic powder"] },
      { name: "lemon juice", quantity: 1, unit: "tbsp", swaps: ["lime juice", "vinegar"] },
      { name: "black pepper", quantity: 0.25, unit: "tsp", swaps: ["chili flakes", "parsley"] },
      { name: "salt", quantity: 0.25, unit: "tsp", swaps: ["sea salt"] }
    ],
    steps: [
      { instruction: "Pat shrimp or paneer cubes completely dry with paper towels. Season lightly with salt and black pepper.", durationMinutes: 2 },
      { instruction: "Melt butter in a medium skillet over medium heat.", durationMinutes: 1 },
      { instruction: "Add minced garlic and cook for 1 minute, stirring constantly, until soft and fragrant but not browned.", durationMinutes: 1 },
      { instruction: "Add shrimp or paneer to the skillet in a single flat layer.", durationMinutes: 1 },
      { instruction: "Sauté for 2-3 minutes per side until shrimp turns pink and opaque, or paneer is warm and lightly golden.", durationMinutes: 4 },
      { instruction: "Remove from heat, stir in fresh lemon juice, and drizzle the delicious garlic butter sauce over the top.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "260 kcal",
      protein: "22g",
      carbs: "3g",
      fat: "18g"
    },
    chefTip: "Do not overcook shrimp or paneer! Overcooked shrimp becomes rubbery and tough, while overcooked paneer loses its soft, creamy chew."
  },
  {
    title: "Simple Dal Tadka",
    description: "Comforting, creamy yellow lentils cooked with turmeric and tempered with a sizzling hot infusion of cumin, garlic, and chilies.",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 3,
    ingredients: [
      { name: "lentils (yellow split dal)", quantity: 1, unit: "cup", swaps: ["red lentils", "split peas"] },
      { name: "onion (finely chopped)", quantity: 1, unit: "piece", swaps: ["shallots", "green onions"] },
      { name: "tomato (finely chopped)", quantity: 1, unit: "piece", swaps: ["tomato sauce", "canned tomato"] },
      { name: "garlic cloves (chopped)", quantity: 4, unit: "cloves", swaps: ["garlic paste"] },
      { name: "ginger (chopped)", quantity: 1, unit: "tsp", swaps: ["ginger paste"] },
      { name: "ghee or oil", quantity: 1.5, unit: "tbsp", swaps: ["butter", "coconut oil"] },
      { name: "cumin seeds", quantity: 1, unit: "tsp", swaps: ["mustard seeds"] },
      { name: "turmeric powder", quantity: 0.5, unit: "tsp", swaps: ["curry powder"] },
      { name: "salt", quantity: 0.75, unit: "tsp", swaps: ["sea salt"] }
    ],
    steps: [
      { instruction: "Rinse lentils thoroughly and boil with 3 cups of water, turmeric powder, and salt until completely soft and creamy (about 15-20 minutes).", durationMinutes: 20 },
      { instruction: "In a separate small pan, heat ghee or oil over medium heat.", durationMinutes: 2 },
      { instruction: "Add cumin seeds. When they begin to crackle, add chopped garlic and ginger. Sauté for 1 minute until lightly caramelized.", durationMinutes: 1 },
      { instruction: "Add the chopped onion and sauté for 3 minutes until soft and light brown.", durationMinutes: 3 },
      { instruction: "Stir in the chopped tomato and cook for 2-3 minutes until tomatoes turn soft and pulpy.", durationMinutes: 3 },
      { instruction: "Pour this hot aromatic tempering (tadka) directly into the cooked simmering lentils. Stir well and simmer for another 2 minutes before serving.", durationMinutes: 2 }
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "12g",
      carbs: "30g",
      fat: "6g"
    },
    chefTip: "Pouring the hot tadka directly into the dal and immediately covering the pot locks in all the aromatic oils and smoky garlic flavor, elevating the entire dish!"
  },
  {
    title: "Classic Avocado Toast",
    description: "Creamy mashed avocado seasoned with salt, black pepper, and lemon juice, spread generously over hot toasted sourdough bread.",
    prepTime: "5 mins",
    cookTime: "3 mins",
    servings: 1,
    ingredients: [
      { name: "ripe avocado", quantity: 1, unit: "piece", swaps: ["hummus", "cream cheese"] },
      { name: "bread (sourdough or whole grain)", quantity: 2, unit: "slices", swaps: ["baguette", "flatbread", "cracker"] },
      { name: "lemon juice", quantity: 1, unit: "tsp", swaps: ["lime juice", "apple cider vinegar"] },
      { name: "olive oil", quantity: 1, unit: "tsp", swaps: ["butter"] },
      { name: "salt", quantity: 0.25, unit: "tsp", swaps: ["black salt"] },
      { name: "black pepper or chili flakes", quantity: 0.25, unit: "tsp", swaps: ["cayenne pepper"] }
    ],
    steps: [
      { instruction: "Toast your bread slices in a toaster or on a pan with a light dab of butter or olive oil until golden and crispy.", durationMinutes: 3 },
      { instruction: "Cut open the ripe avocado, remove the pit, and scoop the creamy flesh into a small bowl.", durationMinutes: 1 },
      { instruction: "Add the lemon juice, salt, and black pepper. Mash with a fork until desired consistency (leave some chunks for texture!).", durationMinutes: 2 },
      { instruction: "Spread the mashed avocado mixture evenly over the warm toasted bread slices.", durationMinutes: 1 },
      { instruction: "Drizzle with premium olive oil, sprinkle with chili flakes, and serve immediately.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "310 kcal",
      protein: "6g",
      carbs: "28g",
      fat: "21g"
    },
    chefTip: "Squeezing fresh lemon juice into the mashed avocado doesn't just add a bright, zesty contrast—it also prevents the avocado from turning unappetizingly brown!"
  },
  {
    title: "Crispy Potato Wedges",
    description: "Thick hand-cut potato wedges seasoned with salt, black pepper, garlic powder, and roasted in olive oil until golden-brown and crispy.",
    prepTime: "8 mins",
    cookTime: "25 mins",
    servings: 2,
    ingredients: [
      { name: "potatoes", quantity: 3, unit: "pieces", swaps: ["sweet potatoes", "carrots", "parsnips"] },
      { name: "olive oil", quantity: 2, unit: "tbsp", swaps: ["melted butter", "avocado oil"] },
      { name: "garlic cloves (minced or powdered)", quantity: 1, unit: "tsp", swaps: ["onion powder"] },
      { name: "salt", quantity: 0.5, unit: "tsp", swaps: ["sea salt"] },
      { name: "black pepper", quantity: 0.25, unit: "tsp", swaps: ["chili flakes", "paprika"] }
    ],
    steps: [
      { instruction: "Preheat oven to 400°F (200°C) or prepare a large heavy-bottomed skillet.", durationMinutes: 5 },
      { instruction: "Wash potatoes thoroughly. Cut each potato in half lengthwise, then cut each half into 3 or 4 wedges.", durationMinutes: 4 },
      { instruction: "Toss potato wedges in a bowl with olive oil, salt, black pepper, and garlic powder until every wedge is evenly coated.", durationMinutes: 2 },
      { instruction: "Arrange wedges in a single flat layer on a baking sheet, skin side down to maximize crunch.", durationMinutes: 1 },
      { instruction: "Roast for 20-25 minutes (or pan-fry over medium-high heat) until potatoes are tender inside and deeply golden and crispy outside.", durationMinutes: 25 }
    ],
    nutrition: {
      calories: "220 kcal",
      protein: "4g",
      carbs: "32g",
      fat: "9g"
    },
    chefTip: "Soaking the cut raw potato wedges in cold water for 10 minutes, then drying them completely before seasoning, removes excess surface starches, helping them get incredibly crispy!"
  },
  {
    title: "Cucumber Tomato Salad",
    description: "A super crisp, light, and refreshing summer salad tossed with diced cucumbers, sweet cherry tomatoes, sliced red onions, and olive oil.",
    prepTime: "5 mins",
    cookTime: "0 mins",
    servings: 2,
    ingredients: [
      { name: "cucumber", quantity: 1, unit: "piece", swaps: ["zucchini", "radish"] },
      { name: "cherry tomatoes", quantity: 1, unit: "cup", swaps: ["grape tomatoes", "roma tomatoes"] },
      { name: "onion (thinly sliced)", quantity: 0.5, unit: "piece", swaps: ["green onions", "shallots"] },
      { name: "olive oil", quantity: 1, unit: "tbsp", swaps: ["avocado oil", "lemon juice alone"] },
      { name: "lemon juice", quantity: 1, unit: "tbsp", swaps: ["vinegar", "lime juice"] },
      { name: "salt", quantity: 0.25, unit: "tsp", swaps: ["black salt"] },
      { name: "black pepper", quantity: 0.25, unit: "tsp", swaps: ["dried oregano"] }
    ],
    steps: [
      { instruction: "Wash all vegetables. Slice the cucumber into half-moon rounds and half the cherry tomatoes.", durationMinutes: 3 },
      { instruction: "Thinly slice the red onion to prevent overwhelming onion bites.", durationMinutes: 1 },
      { instruction: "In a medium salad bowl, combine the sliced cucumbers, cherry tomatoes, and onions.", durationMinutes: 1 },
      { instruction: "Drizzle olive oil and fresh lemon juice over the top. Season with salt and black pepper.", durationMinutes: 1 },
      { instruction: "Toss gently to distribute dressing. Serve chilled or immediately.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "90 kcal",
      protein: "2g",
      carbs: "8g",
      fat: "7g"
    },
    chefTip: "Wait to add the salt until right before serving! Salt draws out moisture from cucumbers and tomatoes, which makes the salad watery if left sitting."
  },
  {
    title: "Peanut Butter Banana Toast",
    description: "Crispy toasted bread smeared with creamy peanut butter or butter, layered with sweet sliced banana and a drizzle of organic honey.",
    prepTime: "3 mins",
    cookTime: "2 mins",
    servings: 1,
    ingredients: [
      { name: "bread", quantity: 2, unit: "slices", swaps: ["bagel", "cracker", "pancake"] },
      { name: "butter or peanut butter", quantity: 2, unit: "tbsp", swaps: ["almond butter", "cookie butter"] },
      { name: "banana", quantity: 1, unit: "piece", swaps: ["apple slices", "blueberries"] },
      { name: "honey", quantity: 1, unit: "tbsp", swaps: ["maple syrup", "agave nectar"] }
    ],
    steps: [
      { instruction: "Toast the bread slices until golden brown and firm.", durationMinutes: 2 },
      { instruction: "Spread a thick, even layer of peanut butter or creamed butter over the hot toast.", durationMinutes: 1 },
      { instruction: "Peel and cut the banana into equal round slices.", durationMinutes: 1 },
      { instruction: "Arrange banana slices on top of the spread in an overlapping pattern.", durationMinutes: 1 },
      { instruction: "Drizzle honey evenly over the banana stack and enjoy warm.", durationMinutes: 1 }
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "8g",
      carbs: "48g",
      fat: "14g"
    },
    chefTip: "Sprinkle a pinch of ground cinnamon or cocoa powder over the banana slices to add an amazing spiced aromatic kick!"
  }
];
