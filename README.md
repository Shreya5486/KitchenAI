# 🍳 Gourmet Fridge Assistant

An interactive, resilient, AI-powered culinary assistant that transforms list-based fridge ingredients, leftovers, and pantry staples into polished, customizable gourmet recipes. It features scalable servings, smart ingredient alternative swaps, step-by-step interactive checkboxes, kitchen countdown step-timers, and a follow-up refinement loop.

This application is built as a **Frontend Internship Assignment** showcasing full-stack React + Node + Express orchestration, and extreme robustness against bad or unpredictable AI output.

---

## 🛠️ Features

### 🌟 Core Experience
* **Gourmet Formulation**: Enter free-form list of ingredients (e.g. *"eggs, half onion, avocado"*) and receive a beautifully structured recipe.
* **Servings Scaler**: Dynamic multiplier controller (`+`/`-` buttons) that recalculates ingredient quantities instantly without re-calling the API.
* **Interactive Steps Guide**: Tap steps to check them off, updating a real-time progress bar and highlighting the current active cooking phase.
* **Smart Ingredient Swaps**: Clicking on any ingredient reveals alternative substitutes (for dairy, allergens, or availability).
* **Step-by-Step Timers**: Steps with duration limits display interactive countdown timers with built-in play/pause controls and digital buzzer synthesizers.
* **Refinement Loop**: Refine the active recipe with instructions like *"make it spicier 🌶️"* or *"make it dairy-free"* instead of starting over.
* **Local Recipe Book (History)**: Automatic LocalStorage synchronization to save, reload, or delete your recipe book sessions.

### 🛡️ Resiliency & Fault Tolerance (Core Signal)
* **Stress-Test Fault Injection Panel**: Injected directly at the top of the screen to let evaluators manually break the model on purpose:
  1. *Malformed JSON Syntax*: Simulates output getting cut-off, leaving missing brackets and raw text.
  2. *Wrong Schema Shape*: Simulates valid JSON but completely incorrect schemas (e.g. missing steps/ingredients).
  3. *Latency Timeout*: Delays server replies by 12 seconds, allowing verification of the client's timeout safety boundaries.
  4. *500 Server Crash*: Simulates an unexpected backend service crash.
* **AbortController Timeout Safeguard**: Automatically aborts any API request exceeding 8.5 seconds, ensuring the app never hangs indefinitely and prompts an instant, actionable retry card.
* **Race-Condition Protection**: Uses an incremental sequence ID counter on every request. Slow, stale responses are immediately discarded if a user fires a new request in parallel, preventing newer data from being overwritten by old responses.
* **Fallback Regex Parser**: Safely handles cases where the model wraps JSON in markdown backticks or prints leading/trailing text, cleanly isolating the JSON structure.

---

## 🏗️ Technology Stack

* **Frontend**: React (Functional Components & Hooks), Tailwind CSS v4, Lucide Icons.
* **Backend Proxy**: Node.js, Express, TSX, ESBuild.
* **AI Model & SDK**: Google Gemini 3.5 (`gemini-3.5-flash`) via the modern `@google/genai` TypeScript SDK with rigid `responseSchema` validation.
* **State Management**: React State & Refs + LocalStorage.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) installed on your local machine.

### 2. Set Up Your API Key
The application expects a Gemini API key. Rename `.env.example` to `.env` or set the variable in your local environment shell:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 3. Install Dependencies
Run the following command at the project root:
```bash
npm install
```

### 4. Launch Development Server
Launch the full-stack development environment (runs Express and proxies Vite):
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`** to interact with the application.

### 5. Build for Production
To bundle and compile the client-side SPA and server-side CommonJS bundle:
```bash
npm run build
npm start
```

---

## 🧠 AI-Usage Note

As suggested in the guidelines, here is an honest summary of how AI tools assisted in crafting this solution:
* **UI/UX Refinement**: AI assisted in designing the warm warmth/amber culinary theme, selecting font pairings (Playfair Display & Inter), and proposing bento card proportions.
* **Schema Blueprinting**: Gemini was used to mock-up and iterate on the `Recipe` TypeScript type structure to guarantee scalable numerical fields for the servings calculator.
* **Web Audio Synthesis**: Claude suggested the specific Web Audio API oscillator parameters to synthesize a mechanical kitchen beep sound without requiring asset downloads.

---

## ⏱️ Time Spent

Total Time: **~4.5 Hours**
* **Hour 1**: Architecture design, schema setup, package.json scripts updating, and server proxy creation.
* **Hour 2**: Implementing the React core state, inputs, presets, and race-condition safety tracking.
* **Hour 3**: Building components (FaultSimulator, CookingTimer, SessionSidebar, and RecipeCard).
* **Hour 4**: Perfecting servings mathematical multipliers, layout responsiveness, and CSS alignments.
* **Hour 0.5**: Verification, linting, and compiling.

---

## ⚠️ Known Limitations

1. **Audio Block policy**: Browser modern security rules block AudioContext sounds until the user interacts with the document (by checking a step or clicking play/pause). The timer beep will print a warning in console if blocked.
2. **Offline-First Limits**: Active kitchen step-timers operate in memory; if the tab is completely closed or refreshed, active timers will reset, though recipe state remains preserved in LocalStorage.
3. **Refinement Context Length**: The refinement loop sends the current recipe as JSON. Refining a recipe more than 15-20 times consecutively could reach local token limits, though standard usage remains safe and speedy.
