"use client";

import { useCart } from "@/contexts/cart-context";

type AddToCardButtonProps = {
  productId?: number;
};

export function AddToCardButton({ productId }: AddToCardButtonProps) {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    if (!productId) return;
    addToCart(productId);
  }

  return (
    <button
      onClick={handleAddProductToCart}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
}
