import ProductsPage from "./pages/ProductsPage";
import FloatingCartButton from "./components/FloatingCartButton";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  return (
    <div className="relative">
      <ProductsPage />
      <FloatingCartButton />
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}
