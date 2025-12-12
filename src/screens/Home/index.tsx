import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import React, { use, useEffect, useMemo } from "react";

import { Feather } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OrderItemProps {
  category: string;
  description: string;
  image: string;
  name: string;
  price: number;
}

export default function Home() {
  const insets = useSafeAreaInsets();

  const [menuList, setMenuList] = React.useState<OrderItemProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );

      if (response.ok) {
        const { menu } = await response.json();

        console.log(menu);

        // setMenuList(menu);
      }
    };

    return () => {
      fetchData();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        keyExtractor={(item, index) => index.toString()}
        data={menuList}
        renderItem={({ item }) => <OrderItem item={item} />}
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

        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        ORDER FOR DELIVERY!
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingLeft: 20,
          paddingBottom: 20,
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

export function OrderItem({ item }: { item: OrderItemProps }) {
  const sourceImage = useMemo(
    () =>
      `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,

    [item]
  );
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          gap: 10,
        }}
      >
        {/* Container description */}
        <View style={{ justifyContent: "space-between", flex: 1, gap: 10 }}>
          {/* title */}
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          {/* Description */}
          <Text style={{ color: "#666", flexWrap: "wrap" }}>
            {item.description}
          </Text>
          {/* Price */}
          <Text style={{ fontWeight: "bold", color: "#666" }}>
            {`R$${item.price}`}
          </Text>
        </View>
        {/* Image */}
        <Image
          source={sourceImage}
          transition={2000}
          placeholder={{ blurhash }}
          contentFit="cover"
          style={{ width: 100, height: 100 }}
        />
        {/* <Image source={} /> */}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
