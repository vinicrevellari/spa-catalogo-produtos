import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { api } from "../services/api";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-4 py-2 w-full max-w-sm mb-4"
      />

      <h1 className="text-2xl font-bold mb-6">Catálogo de Produtos</h1>
      <div className="flex sm:pb-2 gap-2 mb-4 overflow-x-auto">
        {[
          "todos",
          "men's clothing",
          "women's clothing",
          "electronics",
          "jewelery",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded border transition-all ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) =>
              selectedCategory === "todos"
                ? true
                : product.category === selectedCategory
            )
            .filter((product) =>
              product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard key={product.id} product={product} />
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
