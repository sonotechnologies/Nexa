import { getProductById } from "@/data/products";
import type { CartLine } from "@/lib/store";
import type { Product } from "@/data/types";

export interface ResolvedLine {
  line: CartLine;
  product: Product;
}

export function resolveCartLines(cart: CartLine[]): ResolvedLine[] {
  return cart
    .map((line) => {
      const product = getProductById(line.productId);
      return product ? { line, product } : null;
    })
    .filter((x): x is ResolvedLine => x !== null);
}

export function cartSubtotal(resolved: ResolvedLine[]): number {
  return resolved.reduce((sum, { line, product }) => sum + product.price * line.qty, 0);
}
