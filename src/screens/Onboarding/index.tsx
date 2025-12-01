import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { store } from "../../store";

export function Onboarding() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const allowedNextPage = React.useMemo(
    () => name.length > 0 && email.length > 0,
    [name, email]
  );

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = async () => {
    // Handle navigation to the next onboarding screen
    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      await store.setStore("userInfo", { name, email, isLoggedIn: true });
      console.log("✅ User info saved to store");
    } else {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          style={{ width: 250, height: 150 }}
          source={require("../../../CURSO/figma/Little Lemon Images/Logo.png")}
        />
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Let us get to know you
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={"black"}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"black"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, { opacity: !allowedNextPage ? 0.7 : 1 }]}
          activeOpacity={0.7}
          disabled={!allowedNextPage}
        >
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  //----- HEADER
  header: {
    width: "100%",
    height: 150,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },

  //----- BODY
  body: {
    flex: 1,

    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  //----- FOOTER
  footer: { height: 100, backgroundColor: "lightgray" },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
