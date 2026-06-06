"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/types/product";

type ShopContextValue = {
  cart: CartItem[];
  wishlist: Product[];
  quickViewProduct: Product | null;
  cartOpen: boolean;
  wishlistOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "beauty-store-test-cart";
const WISHLIST_KEY = "beauty-store-test-wishlist";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      wishlist,
      quickViewProduct,
      cartOpen,
      wishlistOpen,
      setCartOpen,
      setWishlistOpen,
      openQuickView: setQuickViewProduct,
      closeQuickView: () => setQuickViewProduct(null),
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      cartTotal: cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    }),
    [
      cart,
      wishlist,
      quickViewProduct,
      cartOpen,
      wishlistOpen,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      isInWishlist,
    ],
  );

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
