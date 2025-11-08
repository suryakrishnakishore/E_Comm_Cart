import CartDrawer from "./components/cartDrawer.jsx";
import FloatingCartButton from "./components/flotingCartButton.jsx";
import ProductsPage from "./pages/productsPage.jsx";


export default function App() {
  return (
    <div className="relative">
      <ProductsPage />
      <FloatingCartButton />
      <CartDrawer />
    </div>
  );
}
