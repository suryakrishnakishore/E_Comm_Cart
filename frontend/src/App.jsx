import CartDrawer from "./components/cartDrawer.jsx";
import CheckoutModal from "./components/checkOutModel.jsx";
import FloatingCartButton from "./components/flotingCartButton.jsx";
import ProductsPage from "./pages/productsPage.jsx";


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
