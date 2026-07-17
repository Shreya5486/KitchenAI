/**
 * Beautiful, curated, high-resolution food photography assets from Unsplash.
 * Includes fallback arrays, keyword-based smart matching, and a dynamic search fallback.
 */

interface ImageMapping {
  keywords: string[];
  url: string;
}

const curatedImages: ImageMapping[] = [
  {
    keywords: ["shakshuka", "shakshouka", "egg tomato", "poached egg"],
    url: "https://images.unsplash.com/photo-1590412200988-a436bb7050a8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["paneer", "cottage cheese", "tikka", "kadhai paneer", "palak paneer"],
    url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["kachori", "kachodi", "khasta", "samosa", "pakoda", "pakora", "fritter", "fritters", "bhajia", "crispy pastry"],
    url: "https://images.unsplash.com/photo-1601050690597-df056fb49785?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["fried rice", "chawal", "stir fry rice", "chinese rice"],
    url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["jeera aloo", "aloo ki sabji", "aloo capsicum"],
    url: "https://images.unsplash.com/photo-1601050690597-df056fb49785?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["aloo", "potato", "potatoes", "wedge", "wedges", "french fry", "fries"],
    url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["shrimp", "prawn", "seafood", "prawns", "fish"],
    url: "https://images.unsplash.com/photo-1559742811-82410b51c4c9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["dal", "lentil", "lentils", "tadka", "soup", "stew"],
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["avocado", "toast", "guacamole"],
    url: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["cucumber", "salad", "tomato salad", "green salad", "vegetable salad"],
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["banana", "peanut butter", "sweet toast", "honey toast"],
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["egg", "eggs", "scrambled", "omelette", "frittata", "boiled egg"],
    url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["grilled cheese", "cheese toast", "sandwich", "bread cheese"],
    url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["pasta", "spaghetti", "macaroni", "penne", "noodle", "noodles", "chow mein"],
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["curry", "gravy", "masala", "korma", "chicken"],
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["chai", "tea", "beverage", "drink", "coffee", "latte"],
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["burger", "sliders", "patty"],
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["oatmeal", "oats", "porridge", "breakfast bowl"],
    url: "https://images.unsplash.com/photo-1517686469429-8faf88b9f7af?auto=format&fit=crop&w=1200&q=80"
  },
  {
    keywords: ["dessert", "cake", "sweet", "pudding", "cookie", "muffin"],
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80"
  }
];

// Bilingual translation dictionary for common recipe terms so dynamic searches translate perfectly to English
const translationMap: { [key: string]: string } = {
  "आलू": "potato",
  "प्याज": "onion",
  "टमाटर": "tomato",
  "अंडा": "egg",
  "अंडे": "eggs",
  "मक्खन": "butter",
  "दूध": "milk",
  "पनीर": "paneer cheese",
  "चावल": "rice",
  "दाल": "lentils curry",
  "चिकन": "chicken",
  "रोटी": "bread flatbread",
  "सलाद": "salad",
  "सब्जी": "cooked curry vegetables",
  "मसाला": "spicy curry",
  "समोसा": "samosa",
  "कचौरी": "kachori fried snack",
  "कचोरी": "kachori fried snack",
  "aloo": "potato",
  "pyaz": "onion",
  "tamatar": "tomato",
  "anda": "egg",
  "paneer": "cottage cheese",
  "chawal": "rice",
  "dal": "lentils curry",
  "khasta": "crispy fried pastry",
  "kachori": "kachori fried snack",
  "kachodi": "kachori fried snack",
  "samosa": "samosa crispy snack"
};

/**
 * Clean up recipe title to extract search-friendly English keywords.
 */
function extractEnglishSearchQuery(title: string): string {
  // Remove emojis and punctuation
  let cleaned = title.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
  cleaned = cleaned.replace(/[().,;:\-_+!?]/g, ' ');

  // Look for any transliterated Hinglish/Hindi words and convert them to English
  const words = cleaned.toLowerCase().split(/\s+/);
  const englishWords: string[] = [];

  for (const word of words) {
    if (!word.trim()) continue;
    
    // Check direct translations
    if (translationMap[word]) {
      englishWords.push(translationMap[word]);
    } else {
      englishWords.push(word);
    }
  }

  return englishWords.join(',');
}

/**
 * Gets a beautiful high-resolution image URL matched to the recipe title.
 * It searches the title (lowercased) for matching culinary keywords.
 * If none match, it queries the dynamic Unsplash Featured Source with polished search parameters.
 */
export function getRecipeImageUrl(title: string): string {
  if (!title) {
    return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80";
  }
  
  const normalizedTitle = title.toLowerCase();

  // 1. Try to find a curated premium high-quality handpicked match first
  for (const mapping of curatedImages) {
    const matched = mapping.keywords.some(keyword => normalizedTitle.includes(keyword));
    if (matched) {
      return mapping.url;
    }
  }

  // 2. Dynamic Fallback: Construct a live Unsplash featured query centered on food & clean title keywords
  const searchKeywords = extractEnglishSearchQuery(title);
  
  // Return a beautiful dynamic live image from the Unsplash Featured source targeted specifically at high-end food photography
  return `https://images.unsplash.com/featured/1200x800/?food,dish,cooked,plate,${encodeURIComponent(searchKeywords)}`;
}

