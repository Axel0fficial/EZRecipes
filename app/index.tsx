import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍲</Text>
      <Text style={styles.title}>Recipe Book</Text>
      <Text style={styles.subtitle}>Your simple homemade recipe app.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/recipes")}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf2",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    fontSize: 80,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#d35400",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    minWidth: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});