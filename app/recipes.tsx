import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useRecipes } from "../context/RecipeContext";

export default function RecipesScreen() {
  const { recipes } = useRecipes();

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Recipes</Text>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add")}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {recipes.length === 0 ? (
        <Text style={styles.emptyText}>No recipes yet. Add your first one.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/recipe/${item.id}`)}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>No image</Text>
                </View>
              )}

              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeSubtitle}>
                {item.ingredients.length} ingredients
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fffaf2",
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#d35400",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: 30,
    color: "#777",
    fontSize: 16,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 10,
  },
  placeholderImage: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#999",
  },
  recipeTitle: {
    fontSize: 21,
    fontWeight: "bold",
  },
  recipeSubtitle: {
    color: "#777",
    marginTop: 4,
  },
});