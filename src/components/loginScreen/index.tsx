import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert,
} from "react-native";

export default function LoginScreen() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const navigation = useNavigation();

  const x = useRef<TextInput>(null);
  x.current?.isFocused();

  const handleLogin = () => {
    const defaultPassword = "123321";
    const defaultLogin = "admin";

    if (email === "" || password === "") {
      Alert.alert("Erro no login", "E-mail ou senha não podem ser vazios");
      return;
    }

    if (defaultLogin !== email && defaultPassword !== password) {
      Alert.alert("Erro no login", "E-mail ou senha inválido");
      return;
    }

    Alert.alert("Sucesso", "Você está logado");

    navigation.navigate("Welcome");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      <Text style={styles.regularText}>Login to continue </Text>

      {isSigned ? (
        <Text style={styles.regularText}>You are Logged in!</Text>
      ) : (
        <>
          <TextInput
            ref={x}
            style={styles.inputBox}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"email"}
            keyboardType={"email-address"}
          />
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={onChangePassword}
            placeholder={"password"}
            keyboardType={"default"}
            secureTextEntry={true}
            clearButtonMode="always"
          />
        </>
      )}
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 40,

    backgroundColor: "#e8a070",
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    fontSize: 30,
  },
});
