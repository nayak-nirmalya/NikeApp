import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

import { PUBLISHABLE_KEY } from "@env";

import Navigation from "./src/navigation";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}
