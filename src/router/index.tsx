import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import WelcomeScreen from "../components/welcome2";
import MenuScreen from "../components/menuItems";
import Login from "../components/loginScreen";
import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import Welcome from "../components/welcome2";
import Subscribe from "../components/subscribe";
// import Tab from "./tab";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerPosition: "right" /*, useLegacyImplementation: true */,
      }}
    >
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
    </Drawer.Navigator>
  );
}

function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Main"
        component={DrawerRoutes}
        options={{
          title: "Main",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: ComponentProps<typeof Ionicons>["name"];
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />

      {/* <Tab.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: ComponentProps<typeof Ionicons>["name"];
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      /> */}
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: ComponentProps<typeof Ionicons>["name"];
            iconName = focused ? "list" : "list-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="Subscribe" component={Subscribe} />
        {/* <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Home" }}
        /> */}
        {/* <Stack.Screen name="Menu" component={MenuScreen} /> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
