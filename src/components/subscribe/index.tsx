import React, { useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Welcome from "../welcome";

const Subscribe = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");

  /**
   * Expressão regular para validação básica de endereços de e-mail no formato "local@dominio.tld".
   *
   * Detalhes da correspondência:
   * - ^ e $ ancoram o início e o fim da string (garante que toda a string seja validada).
   * - [^\s@]+ corresponde ao "local-part": um ou mais caracteres que não sejam espaço em branco nem '@'.
   * - @ exige o separador '@'.
   * - [^\s@]+ corresponde ao domínio (sem espaços nem '@').
   * - \. exige um ponto literal entre domínio e TLD.
   * - [^\s@]+ corresponde ao TLD: um ou mais caracteres sem espaço nem '@'.
   *
   * Observações:
   * - Validação simples; não cobre todos os casos do RFC 5322 (ex.: aspas, comentários, domínios com IDN/punycode, IPs entre colchetes).
   * - Não valida existência de domínio nem comprimentos mínimos/máximos de rótulos de domínio/TLD.
   *
   * Exemplos:
   * - Válidos: "user@example.com", "nome.sobrenome@empresa.co"
   * - Inválidos: "user@dominio", "user@@exemplo.com", "user exemplo@site.com"
   */
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = () => {
    if (emailValidationRegex.test(email)) {
      Alert.alert(
        "Thanks for subscribing!",
        `You have subscribed with ${email}`
      );
    } else {
      Alert.alert("Invalid email", "Please enter a valid email address");
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 40, alignItems: "center" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../img/backgroundImage.png")}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Subscribe to our newsletter for our {"\n"} latest delicious recipes
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={{
          margin: 40,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          width: "80%",
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        disabled={!email}
        activeOpacity={0.7}
        onPress={handleSubscribe}
        style={[
          !email ? { opacity: 0.5 } : {},
          {
            backgroundColor: "#144d16",
            padding: 10,
            borderRadius: 5,
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Newsletter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    // padding: 24,
    // marginTop: 25,
    backgroundColor: "#fff",
  },

  title: {
    // marginTop: 16,
    // paddingVertical: 10,
    color: "#333333",
    // textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Subscribe;
