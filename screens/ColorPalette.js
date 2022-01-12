import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import ColorBox from "../components/ColorBox";
const ColorPalette = ({ route }) => {
  console.log("route params", route.params);

  return (
    <View>
      <SafeAreaView>
        <FlatList
          style={styles.container}
          data={route.params.colors}
          keyExtractor={(item) => item.hexCode}
          renderItem={({ item }) => (
            <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ColorPalette;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
