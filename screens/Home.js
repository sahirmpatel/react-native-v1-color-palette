import React, { useState, useEffect, Component, useCallback } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import PalettePreview from "../components/PalettePreview";
import loader from "../assets/loading-buffering.gif";
import { auto } from "async";
const Home = ({ navigation }) => {
  const SOLARIZED = [
    { colorName: "Base03", hexCode: "#002b36" },
    { colorName: "Base02", hexCode: "#073642" },
    { colorName: "Base01", hexCode: "#586e75" },
    { colorName: "Base00", hexCode: "#657b83" },
    { colorName: "Base0", hexCode: "#839496" },
    { colorName: "Base1", hexCode: "#93a1a1" },
    { colorName: "Base2", hexCode: "#eee8d5" },
    { colorName: "Base3", hexCode: "#fdf6e3" },
    { colorName: "Yellow", hexCode: "#b58900" },
    { colorName: "Orange", hexCode: "#cb4b16" },
    { colorName: "Red", hexCode: "#dc322f" },
    { colorName: "Magenta", hexCode: "#d33682" },
    { colorName: "Violet", hexCode: "#6c71c4" },
    { colorName: "Blue", hexCode: "#268bd2" },
    { colorName: "Cyan", hexCode: "#2aa198" },
    { colorName: "Green", hexCode: "#859900" },
  ];
  const RAINBOW = [
    { colorName: "Red", hexCode: "#FF0000" },
    { colorName: "Orange", hexCode: "#FF7F00" },
    { colorName: "Yellow", hexCode: "#FFFF00" },
    { colorName: "Green", hexCode: "#00FF00" },
    { colorName: "Violet", hexCode: "#8B00FF" },
  ];

  const FRONTEND_MASTERS = [
    { colorName: "Red", hexCode: "#c02d28" },
    { colorName: "Black", hexCode: "#3e3e3e" },
    { colorName: "Grey", hexCode: "#8a8a8a" },
    { colorName: "White", hexCode: "#ffffff" },
    { colorName: "Orange", hexCode: "#e66225" },
  ];
  const COLOR_PALETTES = [
    { paletteName: "Solarized", colors: SOLARIZED },
    { paletteName: "Frontend Masters", colors: FRONTEND_MASTERS },
    { paletteName: "Rainbow", colors: RAINBOW },
  ];

  const [colorPalettes, setColorPalettes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getColorsFromApi = useCallback(async () => {
    const result = await fetch(
      "https://color-palette-api.kadikraman.vercel.app/palettes"
    );

    if (result.ok) {
      const palettes = await result.json();
      setColorPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    setRefreshing(true);

    getColorsFromApi();
    setRefreshing(false);
  }, []);
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getColorsFromApi();

    setRefreshing(false);
  }, []);
  return (
    <FlatList
      style={styles.container}
      //   ListEmptyComponent={<Image style={styles.loading} source={loader} />}
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          onPress={() => navigation.push("ColorPalette", item)}
          palette={item}
        />
      )}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  loading: {
    height: 100,
    width: 100,
    margin: "auto",
  },
});
