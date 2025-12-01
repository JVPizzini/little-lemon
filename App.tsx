import { SafeAreaViewBase, StyleSheet, Text, View } from "react-native";
import LittleLemonHeader from "./src/components/header";
import LittleLemonFooter from "./src/components/footer";
import WelcomeScreen from "./src/components/welcome";
import MenuItems from "./src/components/menuItems";
import MenuItems2 from "./src/components/menuItems2";
import FeedbackForm from "./src/components/feedbackform";
import LoginScreen from "./src/components/loginScreen";
import Router from "./src/router";
import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/database/initializeDatabase";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent animated />
      <SQLiteProvider databaseName="littleLemon.db" onInit={initializeDatabase}>
        {/* <LittleLemonHeader /> */}

        <Router />
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#333333",
  },
});
