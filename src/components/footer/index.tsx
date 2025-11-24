import { View, Text, StyleSheet } from "react-native";

export default function LittleLemonFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Todos os direitos reservados por Little Lemon, 2022
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EE9972",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    padding: 20,
    fontStyle: "italic",
  },
});
