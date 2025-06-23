import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6">Carregando produto...</div>;
  }

  if (error || !product) {
    return <div className="p-6 text-red-600">Produto não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain rounded"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product.category}</p>
          <p className="text-gray-800 text-sm mb-6">{product.description}</p>

          <p className="text-xl font-bold text-green-700 mb-6">
            R$ {product.price.toFixed(2)}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              toast.success("Produto adicionado ao carrinho!");
            }}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-all"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
