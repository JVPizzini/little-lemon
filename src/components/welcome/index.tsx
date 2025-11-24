import React, { useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

import {
  useDeviceOrientation,
  useAppState,
} from "@react-native-community/hooks";

const Welcome = () => {
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const orientation = useDeviceOrientation();

  useEffect(() => {
    console.log("colorScheme", colorScheme);
  }, [colorScheme]);

  return (
    <ScrollView
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#fff" }
          : { backgroundColor: "#333333" },
      ]}
      contentContainerStyle={{ alignItems: "center", gap: 10 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
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

      <Text>Window Dimensions</Text>
      <Text>Height: {window.height}</Text>
      <Text>Width: {window.width}</Text>
      <Text>Font scale: {window.fontScale}</Text>
      <Text>Orientation: {orientation}</Text>
      <Text style={styles.title}>Little Lemon</Text>
      <Image
        style={styles.image}
        source={require("../../img/Picture1.png")}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      <Image
        style={styles.image}
        source={require("../../img/Picture2.png")}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      <Image
        style={styles.image}
        source={require("../../img/Picture3.png")}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
      <Image
        style={styles.image}
        source={require("../../img/Picture4.png")}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel={"Little Lemon Logo"}
      />
    </ScrollView>
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
    padding: 24,
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
