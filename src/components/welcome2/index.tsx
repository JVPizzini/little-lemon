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
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Text style={{ fontSize: 25 }}>LITTLE</Text>
          <Image
            style={styles.logo}
            source={require("../../img/backgroundImage.png")}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel={"Little Lemon Logo"}
          />
          <Text style={{ fontSize: 25 }}>LEMON</Text>
        </View>
        <Text style={{ fontSize: 20 }}>Little Lemon, your local </Text>
        <Text style={{ fontSize: 20 }}>Mediterranean bistro</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Subscribe")}
        style={{
          backgroundColor: "#144d16",
          padding: 10,
          borderRadius: 5,
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          margin: 40,
        }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Newsletter</Text>
      </TouchableOpacity>
    </>
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

export default Welcome;
