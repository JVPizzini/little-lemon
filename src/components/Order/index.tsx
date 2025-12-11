import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";

export function Order() {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Container description */}
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          {/* title */}
          <Text style={{ fontWeight: "bold" }}> Title</Text>
          {/* Description */}
          <Text style={{ color: "#666" }}>Description</Text>
          {/* Price */}
          <Text style={{ fontWeight: "bold", color: "#666" }}>R$0.00</Text>
        </View>
        {/* Image */}
        {/* <Image source={} /> */}
      </View>
    </View>
  );
}
