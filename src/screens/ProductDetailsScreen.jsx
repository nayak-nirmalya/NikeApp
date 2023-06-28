import {
  StyleSheet,
  Image,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React from "react";

import products from "../data/products";

const ProductDetailsScreen = () => {
  const product = products[0];

  const { width } = useWindowDimensions();

  return (
    <View>
      {/* Image Carousel */}
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      {/* Title */}

      {/* Price */}

      {/* Description */}

      {/* Add to Cart Button */}

      {/* Navigation Icon */}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
