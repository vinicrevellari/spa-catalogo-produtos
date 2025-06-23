import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { items } = useCart();
  const location = useLocation();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          🛍️ VC Fake Store
        </Link>

        {location.pathname !== "/carrinho" && (
          <Link
            to="/carrinho"
            className="relative bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Carrinho
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
