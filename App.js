import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

import Navigation from "./src/navigation";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider>
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}
