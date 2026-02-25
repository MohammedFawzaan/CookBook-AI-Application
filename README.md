<body>
  <p align="center">
     <img src="./assets/images/icon.png" alt="App Icon" height="120">
  </p>

  <h1>🍽️ CookBook - AI Recipe Creator App</h1>
</body>

<p align="center">
  <strong>An AI-powered mobile application that generates complete, personalized recipes from a dish name — including ingredients, step-by-step instructions, calorie info, and a generated dish photo.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Built%20With-Expo-000020?style=flat&logo=expo" alt="Expo" />
  <img src="https://img.shields.io/badge/Framework-React%20Native-61DAFB?style=flat&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/Backend-Strapi%20CMS-2F2F2F?style=flat&logo=strapi" alt="Strapi" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat&logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat&logo=clerk" alt="Clerk" />
  <img src="https://img.shields.io/badge/Images-Cloudinary-3448C5?style=flat&logo=cloudinary" alt="Cloudinary" />
</p>

---

## 📱 App Overview

**CookBook AI** is a feature-rich React Native app that leverages **Google Gemini AI** to instantly generate complete recipes from a user-provided dish name. Users can authenticate with Google via **Clerk**, browse recipes by category, explore the full global recipe feed, and manage their personal recipe collection — all with a beautiful **dark/light theme** toggle.

---

## ✨ Features

### 🔐 Authentication
- **Google Sign-In** via Clerk OAuth SSO flow
- Guests are redirected to the landing page; authenticated users go directly to Home
- Animated **landing page** with scrolling food imagery (marquee effect)

### 🤖 AI Recipe Generation
- Type any dish name (e.g. "Butter Chicken", "Tiramisu", "Avocado Toast")
- **Gemini AI** generates:
  - Recipe name and description
  - Calorie count, cook time, and serving size
  - Full ingredients list with quantities and emoji icons
  - Step-by-step cooking instructions
- Users choose from **3 AI-suggested recipe options** via a bottom action sheet
- **Cancellation** support — generation can be aborted mid-process

### 📸 AI Recipe Image Generation
- Automatically generates a **photorealistic dish image** using **Google Imagen 4.0**
- Image is uploaded and hosted on **Cloudinary**
- Falls back to **Pollinations.ai** if Imagen fails (due to quota, network, etc.)

### 🏠 Home Screen
- Personalized greeting with app branding
- Category quick-filter row (Breakfast, Lunch, Dinner, Dessert, etc.)
- **Latest Recipes** horizontal scroll feed — auto-refreshes after every new recipe
- **Dark/Light theme toggle** button in the header

### 🗂️ My CookBook (Book Tab)
- Displays all recipes created by the currently logged-in user
- **2-column grid** layout with recipe cards
- Pull-to-refresh support
- Empty state message for new users

### 🔍 Explore Tab
- Browse **all recipes** created by all users
- **Real-time search bar** — filters recipes by name as you type
- Pull-to-refresh support
- 2-column grid with recipe cards

### 📖 Recipe Detail Pages
Two detail views for full recipe access:
1. **RecipeDetails** — accessed after generating a new recipe
2. **Recipe Detail (History)** — accessed from CookBook or Explore

Both pages include:
- Full-screen recipe hero image with loading indicator
- **Back button** and **Share button** overlaid on the image (safe-area aware)
- Author chip ("You" or email of creator)
- Stats card: 🔥 Calories | ⏱️ Time | 👥 Servings
- Ingredient list with emoji icons and quantities
- Numbered step-by-step instructions
- Green gradient footer card: "Enjoy your Meal!"

### 📤 Share Recipe
- Tap the share icon on any recipe detail page
- Shares the full formatted recipe text via the **native share sheet**
- Share to WhatsApp, Telegram, Notes, or any app on the device
- Formatted message includes name, description, stats, ingredients, and steps

### 👤 Profile Tab
- Displays user avatar (from Google account), full name, and email
- **Recipes Created** count — fetched live from Strapi
- **Sign Out** button with navigation back to the landing page
- Fully themed with dark/light mode support

### 📊 User Management (Strapi)
- On first login, the user is automatically saved to the `user-list` collection in Strapi
- Stores: `name`, `email`, `clerkId`, and `credits` (default: 5)
- Duplicate detection ensures each user is only saved once
- Fails silently — login is never blocked by a Strapi error

### 🌙 Dark / Light Theme
- System-aware theme toggle stored persistently via **AsyncStorage**
- **Defaults to dark mode**
- Applies globally across all screens and components via `ThemeContext`
- Light and dark color palettes cover all UI elements

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| [Expo](https://expo.dev) + [React Native](https://reactnative.dev) | Mobile app framework |
| [Expo Router](https://expo.github.io/router) | File-based navigation |
| [Clerk](https://clerk.dev) | Authentication (Google SSO) |
| [Google Gemini AI](https://ai.google.dev) | Recipe text generation |
| [Google Imagen 4.0](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview) | AI dish image generation |
| [Cloudinary](https://cloudinary.com) | Image hosting and CDN |
| [Pollinations.ai](https://pollinations.ai) | Image generation fallback |
| [Strapi CMS](https://strapi.io) | Backend / API / Database |
| [Axios](https://axios-http.com) | HTTP client for API calls |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Theme persistence |
| [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | Gradient UI elements |
| [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) | Native share sheet |
| [react-native-actions-sheet](https://github.com/ammarahm-ed/react-native-actions-sheet) | Bottom sheet for recipe selection |

---

## 📂 Project Structure

```
CookBook/
├── app/
│   ├── index.tsx              # Landing / Login page (animated marquee + Google Sign-In)
│   ├── RecipeDetails.tsx      # Full recipe detail (after generation)
│   ├── sso-callback.tsx       # Clerk OAuth callback handler
│   ├── _layout.tsx            # Root layout with Clerk + ThemeProvider
│   ├── (tabs)/
│   │   ├── Home.tsx           # Home feed with category filter + latest recipes
│   │   ├── Book.tsx           # My CookBook (user's own recipes)
│   │   ├── Explore.tsx        # Global recipe feed with search
│   │   ├── Profile.tsx        # User profile + stats + sign out
│   │   └── _layout.tsx        # Tab bar configuration
│   ├── recipe-detail/
│   │   └── index.tsx          # Recipe detail accessed from history
│   └── recipe-by-category/
│       └── index.tsx          # Recipes filtered by category
├── components/
│   ├── Header.tsx             # App header with logo + theme toggle
│   ├── CreateRecipe.tsx       # AI recipe generation input + logic
│   ├── CategoryList.tsx       # Horizontal category scroll filter
│   ├── LatestRecipes.tsx      # Home page latest recipes feed
│   ├── RecipeCard.tsx         # Recipe card for grid views
│   ├── RecipeCardHome.tsx     # Recipe card for horizontal feed
│   ├── Button.tsx             # Reusable button component
│   ├── LoadingDialog.tsx      # Full-screen loading overlay with cancel
│   └── CustomAlert.tsx        # Custom alert modal (success/error/warning/info)
├── context/
│   └── ThemeContext.tsx       # Global dark/light theme context + persistence
├── hooks/
│   └── useClerkAuth.ts        # Google SSO auth flow + user save to Strapi
├── services/
│   ├── GlobalApi.tsx          # All API calls (Gemini, Strapi, Cloudinary, Imagen)
│   └── Prompt.ts              # Gemini AI prompt templates
├── utils/
│   └── ShareRecipe.ts         # Recipe text formatter + native share
├── assets/
│   └── images/                # App icon, food category images, gifs
├── app.json                   # Expo app configuration
├── eas.json                   # EAS Build configuration (APK profile)
└── .env                       # Environment variables (API keys)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Active accounts for: Clerk, Strapi, Google AI Studio, Cloudinary

### 1. Clone and Install

```bash
git clone https://github.com/MohammedFawzaan/cookbook.git
cd cookbook
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project:

```env
EXPO_PUBLIC_GEMINI_KEY=your_gemini_api_key
EXPO_PUBLIC_STRAPI_API_KEY=your_strapi_api_key
EXPO_PUBLIC_BACKEND_URL=https://your-strapi-instance.com/api
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Run in Development

```bash
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for Android emulator.

---

## 🙏 License

Built with ❤️ by **Mohammed Fawzaan**

Powered by Google Gemini AI, Clerk Auth, Strapi CMS, Cloudinary, and Expo.
