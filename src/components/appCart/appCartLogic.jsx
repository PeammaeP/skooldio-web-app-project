import { createContext, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import formatPrice from "@/utils/formatPrice";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProductCardIntersection from "../appProductDetailCard/ProductCardIntersection";

// Create cart context
export const CartContext = createContext(null);

// Cart provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [lastAddedItem, setLastAddedItems] = useState([]);
  const [cartId, setCardId] = useState(null);

  const addToCart = async (items) => {
    try {
      const response = await fetch(
        "https://api.storefront.wdb.skooldio.dev/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add items to cart");
      }

      const data = await response.json();

      console.log(data);
      console.log(items);

      setCart(data || []);
      setCardId(data.id);
      setLastAddedItems(items);
      setIsNotificationOpen(true);
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  const removeFromCart = (skuCode) => {
    setCart((prevCart) => prevCart.filter((item) => item.skuCode !== skuCode));
  };

  const updateQuantity = (skuCode, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.skuCode === skuCode ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isNotificationOpen,
        lastAddedItem,
        closeNotification,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, lastAddedItem } =
    useContext(CartContext);

  console.log(cart);
  console.log(lastAddedItem);

  const subtotal = cart.items
    ? cart.items.reduce((sum, item) => {
        const lastAdded = lastAddedItem.find(
          (added) => added.skuCode === item.skuCode
        );
        return sum + (lastAdded ? lastAdded.price * item.quantity : 0);
      }, 0)
    : 0;
  const shippingFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + shippingFee;

  const myCollection = ["all-ladies", "ladies-accessories"];

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container px-4 py-6 md:py-12">
        <h1 className="text-2xl font-bold mb-6">My cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mb-6" />
                <h2 className="text-2xl font-semibold mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Looks like you have not added anything to your cart. Go ahead
                  & explore top categories.
                </p>
                <Button asChild>
                  <Link to="/">Continue shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Summary</CardTitle>
                  <span className="text-muted-foreground">0 items</span>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">No item</span>
                  <span>0.00</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>0.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping fee</span>
                  <span>0.00</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>0.00</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" disabled>
                  Check out
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Continue shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <section className="relative flex flex-col items-start justify-between mt-36 md:max-w-7xl dtdf:max-w-screen-2xl mx-auto mb-auto">
          <h2 className="text-3xl md:text-3xl font-bold text-[#222222] flex items-start justify-start">
            People Also Like These
          </h2>
          <div className="bg-white overflow-hidden max-7xl">
            <ProductCardIntersection collection={myCollection[0]} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:py-12 mx-auto">
      <h1 className="text-2xl font-bold mb-6">My cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {cart.items.map((item) => {
                const lastAdded = lastAddedItem.find(
                  (added) => added.skuCode === item.skuCode
                );
                return (
                  <div key={item.skuCode} className="flex gap-4 py-3">
                    <div className="w-24 h-24 bg-muted rounded-md overflow-hidden">
                      {lastAdded && lastAdded.imageUrls?.[0] && (
                        <img
                          src={lastAdded.imageUrls[0]}
                          alt={lastAdded.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 grid gap-1">
                      <h3 className="font-medium">
                        {lastAdded ? lastAdded.name : "Unknown Item"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.skuCode}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.skuCode, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.skuCode, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto"
                          onClick={() => removeFromCart(item.skuCode)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                    <div className="font-medium">
                      THB{" "}
                      {lastAdded
                        ? formatPrice(lastAdded.price * item.quantity)
                        : "N/A"}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Summary</CardTitle>
                <span className="text-muted-foreground">
                  {cart.items.length} items
                </span>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>THB {formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping fee</span>
                <span>THB {formatPrice(shippingFee)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>THB {formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Check out</Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Continue shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
