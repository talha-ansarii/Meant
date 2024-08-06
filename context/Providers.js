import { WishlistProvider } from "./WishlistContext";
import { CartProvider } from "./CartContext";
import { CheckoutProvider } from "./CheckoutContext";

const Providers = ({ children }) => (
  <CartProvider>
    <WishlistProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </WishlistProvider>
  </CartProvider>
);

export default Providers;
