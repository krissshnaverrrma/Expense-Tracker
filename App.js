import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen, { CURRENCIES } from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
const Tab = createBottomTabNavigator();
export default function App() {
	const [currency, setCurrency] = useState(CURRENCIES[0]);
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === "Home")
							iconName = focused ? "home" : "home-outline";
						else if (route.name === "About")
							iconName = focused
								? "information-circle"
								: "information-circle-outline";
						else if (route.name === "Contact")
							iconName = focused ? "mail" : "mail-outline";
						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: "#000000ff",
					tabBarInactiveTintColor: "gray",
					tabBarStyle: { paddingBottom: 5, height: 60 },
				})}
			>
				<Tab.Screen name="Home">
					{() => (
						<HomeScreen
							currency={currency}
							setCurrency={setCurrency}
						/>
					)}
				</Tab.Screen>
				<Tab.Screen name="About" component={AboutScreen} />
				<Tab.Screen name="Contact" component={ContactScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
