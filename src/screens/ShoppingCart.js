import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe } from "@stripe/stripe-react-native";

import CartListItem from "../components/CartListItem";
import {
  cartSlice,
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from "../store/cartSlice";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "../store/apiSlice";

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>SubTotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: "Nirmalya",
        address: "India",
        email: "me@domain.com",
      },
    });

    if (result.data?.status === "OK") {
      Alert.alert(
        "Order Has Been Submitted.",
        `Your Order Reference ID: ${result.data.data.ref}`
      );

      dispatch(cartSlice.actions.clear());
    }
  };

  const onCheckout = async () => {
    // create a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    if (response.error) {
      Alert.alert("Something Went Wrong!");
      return;
    }

    // initialize the payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Nirmalya Nayak - Nike App",
      paymentIntentClientSecret: response.data.paymentIntent,
      defaultBillingDetails: {
        name: "Nirmlaya",
        email: "nirmalya@gmail.com",
        address: "Odisha, India",
      },
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something Went Wrong!");
      return;
    }

    // present the payment sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error Code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }

    // if payment OK -> create the order
    onCreateOrder();
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable style={styles.button} onPress={onCheckout}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Checkout</Text>
        )}
      </Pressable>
    </>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },

  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
