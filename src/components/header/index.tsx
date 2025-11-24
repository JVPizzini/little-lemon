import { View, Text, StyleSheet } from "react-native";

export default function LittleLemonHeader() {
  return (
    <View style={headerStyles.container}>
      <Text style={headerStyles.title}>Little Lemon</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#EE9972",
  },
  title: {
    paddingTop: 60,
    paddingBottom: 20,
    fontSize: 30,
    color: "#333333",
    textAlign: "center",
  },
});
