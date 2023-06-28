import { StyleSheet, Image, View } from "react-native";
import React from "react";

import products from "../data/products";

const ProductDetailsScreen = () => {
  const product = products[0];

  return (
    <View>
      {/* Image Carousel */}
      <Image
        source={{ uri: product.image }}
        style={{ width: "100%", aspectRatio: 1 }}
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
