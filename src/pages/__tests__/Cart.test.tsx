import { render } from "@testing-library/react";
import { CartProvider } from "../../contexts/CartContext";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";

describe("Cart Page", () => {
  it("exibe mensagem de carrinho vazio", () => {
    const { getByText } = render(
      <BrowserRouter>
        <CartProvider>
          <Cart />
        </CartProvider>
      </BrowserRouter>
    );

    expect(getByText("Seu carrinho está vazio.")).toBeInTheDocument();
  });
});
