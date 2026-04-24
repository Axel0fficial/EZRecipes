import { useLocalSearchParams, router } from "expo-router";
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRecipes } from "../../context/RecipeContext";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeById } = useRecipes();

  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.notFoundTitle}>Recipe not found</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/recipes")}>
          <Text style={styles.backButtonText}>Back to recipes</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No image</Text>
        </View>
      )}

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>

      {recipe.ingredients.length === 0 ? (
        <Text style={styles.emptyText}>No ingredients added.</Text>
      ) : (
        recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            • {ingredient}
          </Text>
        ))
      )}

      <Text style={styles.sectionTitle}>Instructions</Text>

      {recipe.instructions ? (
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      ) : (
        <Text style={styles.emptyText}>No instructions added.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
  },
  placeholderImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#999",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 17,
    marginBottom: 6,
  },
  instructions: {
    fontSize: 17,
    lineHeight: 25,
  },
  emptyText: {
    color: "#777",
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: "#fffaf2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#d35400",
    padding: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});