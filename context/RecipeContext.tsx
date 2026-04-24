import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Recipe = {
  id: string;
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string;
};

type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  getRecipeById: (id: string) => Recipe | undefined;
};

const STORAGE_KEY = "recipes";

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveRecipes();
    }
  }, [recipes, loaded]);

  async function loadRecipes() {
    try {
      const storedRecipes = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.log("Error loading recipes:", error);
    } finally {
      setLoaded(true);
    }
  }

  async function saveRecipes() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.log("Error saving recipes:", error);
    }
  }

  function addRecipe(recipe: Omit<Recipe, "id">) {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      ...recipe,
    };

    setRecipes((current) => [...current, newRecipe]);
  }

  function getRecipeById(id: string) {
    return recipes.find((recipe) => recipe.id === id);
  }

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, getRecipeById }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used inside RecipeProvider");
  }

  return context;
}