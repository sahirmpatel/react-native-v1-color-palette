// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, SafeAreaView } from "react-native";
import ColorPalette from "./screens/ColorPalette";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen
          name="ColorPalette"
          component={ColorPalette}
          options={({ route }) => ({ title: route.params.paletteName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
