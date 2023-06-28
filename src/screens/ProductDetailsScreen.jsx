import { StyleSheet, Image, View, FlatList } from "react-native";
import React from "react";

import products from "../data/products";

const ProductDetailsScreen = () => {
  const product = products[0];

  return (
    <View>
      {/* Image Carousel */}
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: 300, aspectRatio: 1 }}
          />
        )}
        horizontal
      />

      {/* Title */}

      {/* Price */}

      {/* Description */}

      {/* Add to cart button */}

      {/* Navigation icon */}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
