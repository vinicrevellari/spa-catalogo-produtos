import { render } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { BrowserRouter } from "react-router-dom";

const mockProduct = {
  id: 1,
  title: "Produto Teste",
  price: 99.99,
  description: "Descrição do produto",
  category: "categoria",
  image: "https://via.placeholder.com/150",
};

describe("ProductCard", () => {
  it("renderiza título e preço", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(getByText("Produto Teste")).toBeInTheDocument();
    expect(getByText("R$ 99.99")).toBeInTheDocument();
  });
});
