import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useGetOrderQuery } from "../store/apiSlice";

const TrackOrder = () => {
  const [ref, setRef] = useState("");

  const { data, isLoading, error } = useGetOrderQuery(ref);

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your Order Reference."
      />
      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && (
        <View style={styles.orderView}>
          <Text style={styles.orderNotFount}>Order Not Found.</Text>
        </View>
      )}
      {data?.status === "OK" && <Text>Order: {JSON.stringify(data.data)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgrey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  orderNotFount: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderView: {
    flexDirection: "row",
  },
});

export default TrackOrder;
