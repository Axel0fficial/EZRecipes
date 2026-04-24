import { Stack } from "expo-router";
import { RecipeProvider } from "../context/RecipeContext";

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="recipes" options={{ title: "My Recipes" }} />
        <Stack.Screen name="add" options={{ title: "Add Recipe" }} />
        <Stack.Screen name="recipe/[id]" options={{ title: "Recipe" }} />
      </Stack>
    </RecipeProvider>
  );
}