import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { productsSlice } from "../store/productsSlice";
import { useGetProductsQuery } from "../store/apiSlice";

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <ActivityIndicator style={styles.loading} />;

  if (error) return <Text>Error Fetching Products: {error.error}</Text>;

  return (
    <FlatList
      data={data.data}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("Product Details", { id: item._id });
          }}
          style={styles.itemContainer}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsScreen;
