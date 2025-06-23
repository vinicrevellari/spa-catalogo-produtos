import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="border rounded p-4 shadow flex flex-col gap-2 bg-white"
    >
      <Link
        to={`/produto/${product.id}`}
        className="border rounded p-4 flex flex-col gap-2 shadow hover:shadow-md transition-all bg-white"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain mb-2"
        />

        <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>

        <p className="text-gray-600 text-xs line-clamp-2">
          {product.description}
        </p>

        <span className="font-bold text-green-700 mt-auto">
          R$ {product.price.toFixed(2)}
        </span>
      </Link>
    </motion.div>
  );
}
