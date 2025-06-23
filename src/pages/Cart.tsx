import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Carrinho</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="border rounded p-4 flex justify-between items-center shadow"
              >
                <div>
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity}
                  </p>
                  <p className="text-sm text-green-700 font-bold">
                    Total: R$ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 text-sm hover:underline transition-all"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right">
            <p className="text-lg font-bold mb-4">
              Total geral: R$ {total.toFixed(2)}
            </p>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded transition-all"
            >
              Limpar Carrinho
            </button>
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Finalizar compra
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
