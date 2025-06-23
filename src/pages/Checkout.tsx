import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  function handleFinish() {
    clearCart();
    alert("Pedido finalizado com sucesso!");
    navigate("/");
  }
  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items]);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li key={item.product.id} className="border p-4 rounded shadow">
                <p className="font-semibold">{item.product.title}</p>
                <p className="text-sm text-gray-600">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-sm font-medium text-green-700">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <p className="text-lg font-bold mb-4">Total: R$ {total.toFixed(2)}</p>

          <button
            onClick={handleFinish}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
          >
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}
