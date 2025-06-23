import { render, screen } from "@testing-library/react";
import { CartProvider } from "../../contexts/CartContext";
import Checkout from "../Checkout";
import { BrowserRouter } from "react-router-dom";

describe("Checkout Page", () => {
  it("exibe mensagem se carrinho estiver vazio", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument();
  });
});
