import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipeScreen() {
  const { addRecipe } = useRecipes();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function saveRecipe() {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please add the dish name.");
      return;
    }

    addRecipe({
      title: title.trim(),
      image,
      ingredients: ingredientsText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
    });

    router.push("/recipes");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Choose Recipe Picture</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TextInput
        style={styles.input}
        placeholder="Dish name"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.largeInput]}
        placeholder={"Ingredients\nExample:\n2 eggs\n1 cup flour\nSalt"}
        value={ingredientsText}
        onChangeText={setIngredientsText}
        multiline
      />

      <TextInput
        style={[styles.input, styles.largeInput]}
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
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
  imageButton: {
    backgroundColor: "#f1c40f",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  imageButtonText: {
    fontWeight: "bold",
    color: "#3b2f00",
  },
  previewImage: {
    width: "100%",
    height: 230,
    borderRadius: 14,
    marginTop: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    fontSize: 16,
  },
  largeInput: {
    minHeight: 130,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#d35400",
    padding: 16,
    borderRadius: 12,
    marginTop: 22,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});