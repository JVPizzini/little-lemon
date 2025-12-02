import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function Home() {
  const menuList = [] as any[];
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        keyExtractor={(item) => item.id.toString()}
        data={menuList}
        renderItem={() => <Text>Item</Text>}
      />
    </View>
  );
}

const Header = () => {
  return (
    <>
      <Banner />
      <OrderList />
    </>
  );
};

const Banner = () => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#495E57",
        paddingTop: 80,
        paddingHorizontal: 20,
      }}
    >
      {/* Title */}
      <Text style={{ fontSize: 50, fontWeight: "bold", color: "#d4c708" }}>
        Little Lemon
      </Text>
      {/* SubTitle */}
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#ffff" }}>
        Chicago
      </Text>
      {/* Description */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#ffff",
            flex: 1,
            marginRight: 10,
          }}
        >
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
        <Image
          source={require("../../../CURSO/figma/Little Lemon Images/Hero image.png")}
          transition={2000}
          placeholder={{ blurhash }}
          contentFit="cover"
          style={{ width: 140, height: 140, borderRadius: 10, bottom: 20 }}
        />
      </View>
      {/* Search Bar */}
      <View style={{ paddingVertical: 20 }}>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: "#ffff",
          }}
        >
          <Feather name="search" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const OrderList = () => {
  const listOrders = [
    { id: 1, name: "Starters" },
    { id: 2, name: "Mains" },
    { id: 3, name: "Desserts" },
    { id: 4, name: "Drinks" },
  ];

  return (
    <View
      style={{
        width: "100%",

        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        ORDER FOR DELIVERY!
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {listOrders.map((order) => (
          <Pressable
            key={order.id}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              {
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: "#bbbbbb",
                marginRight: 10,
              },
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>{order.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
