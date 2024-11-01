import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";
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

import ProductCardIntersection from "../components/appProductDetailCard/ProductCardIntersection";
import CartCard from "../components/appCart/CartCard";
import Footer from "../components/landingCard/Footer";
import Navbar from "../components/landingCard/Navbar";

// Create cart context
export const CartContext = createContext(null);

// Cart provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [lastAddedItem, setLastAddedItems] = useState([]);
  const [cartId, setCardId] = useState(null);
  const [stock, setStock] = useState({});
  const [initialStock, setInitialStock] = useState({}); // Store the initial stock here
  const [currentProductStock, setCurrentProductStock] = useState(0);

  // Update stock and track initial stock if not already set
  const updateStock = (skuCode, newStock) => {
    setStock((prevStock) => ({
      ...prevStock,
      [skuCode]: newStock,
    }));
    if (!initialStock[skuCode]) {
      setInitialStock((prev) => ({
        ...prev,
        [skuCode]: newStock,
      }));
    }
  };

  const fetchProductStock = async (productPermalink, skuCode) => {
    try {
      const response = await fetch(
        `https://api.storefront.wdb.skooldio.dev/products/${productPermalink}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const productData = await response.json();
      const variant = productData.variants.find((v) => v.skuCode === skuCode);
      return variant ? variant.remains : 0;
    } catch (error) {
      console.error("Error fetching product stock:", error);
      return 0;
    }
  };

  const addToCart = async (items) => {
    try {
      let url = "https://api.storefront.wdb.skooldio.dev/carts";
      let method = "POST";
      let body = { items };

      if (cartId) {
        url += `/${cartId}/items`;
        method = "POST";
        body = { items };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to add items to cart");
      }

      const data = await response.json();

      // adjust the stock of items
      items.forEach((item) => {
        const newStock = (stock[item.skuCode] || item.remains) - item.quantity;
        updateStock(item.skuCode, newStock);
      });

      // console.log(data);
      // console.log(items);

      setCart(data || []);
      setCardId(data.id);
      setLastAddedItems((prevItems) => {
        const newItems = [...prevItems];
        items.forEach((item) => {
          const index = newItems.findIndex((i) => i.skuCode === item.skuCode);
          if (index !== -1) {
            newItems[index] = item;
          } else {
            newItems.push(item);
          }
        });
        return newItems;
      });
      setIsNotificationOpen(true);
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!cartId) {
      console.error("Cannot remove item: Cart ID is not set");
      return;
    }

    try {
      const response = await fetch(
        `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const removedItem = cart.items.find((item) => item.id === itemId);
      if (removedItem) {
        // Restore stock to the original stock for removed item
        const restoredStock =
          (stock[removedItem.skuCode] || 0) + removedItem.quantity;

        updateStock(removedItem.skuCode, restoredStock);

        // Update local state
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== itemId),
        }));

        setLastAddedItems((prevItems) =>
          prevItems.filter((item) => item.skuCode !== removedItem.skuCode)
        );
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (
    itemId,
    skuCode,
    productPermalink,
    isIncreasing
  ) => {
    if (!cartId) {
      console.error("Cannot update item: Cart ID is not set");
      return;
    }

    try {
      // Fetch current stock
      const currentStock = await fetchProductStock(productPermalink, skuCode);

      setCurrentProductStock(currentStock);

      // Find the current item in the cart
      const currentItem = cart.items.find((item) => item.id === itemId);
      if (!currentItem) {
        console.error("Item not found in cart");
        return;
      }

      // Calculate new quantity
      const newQuantity = isIncreasing
        ? currentItem.quantity + 1
        : currentItem.quantity - 1;

      // Validate quantity
      if (newQuantity < 1) {
        console.error("Quantity must be at least 1");
        return;
      }

      if (newQuantity > currentStock) {
        console.error("Requested quantity exceeds available stock");
        return;
      }

      const response = await fetch(
        `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity, skuCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      const updatedCart = await response.json();

      // Update stock
      updateStock(skuCode, currentStock - newQuantity);

      setCart(updatedCart);

      // Update last added items
      setLastAddedItems((prevItems) =>
        prevItems.map((item) =>
          item.skuCode === skuCode
            ? {
                ...item,
                quantity: newQuantity,
                remains: currentStock - newQuantity,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
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
        stock, // Add stock here
        updateStock, // Add updateStock here
        currentProductStock,
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
  const {
    cart,
    removeFromCart,
    updateQuantity,
    lastAddedItem,
    stock,
    currentProductStock,
  } = useContext(CartContext);

  // console.log("Stock", stock);
  // console.log("CurrentProduct", currentProductStock);

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
      <div>
        <section className="mt-32">
          <Navbar />
        </section>
        <section>
          <CartCard />
        </section>
        <section className="relative mt-36 md:max-w-7xl dtdf:max-w-screen-2xl mx-auto mb-auto">
          <h2 className="text-3xl md:text-3xl font-bold text-[#222222] md:px-6 flex md:items-start md:justify-start items-center justify-center">
            People Also Like These
          </h2>
          <div className="bg-white overflow-hidden max-7xl">
            <ProductCardIntersection collection={myCollection[0]} />
          </div>
        </section>
        <section className="mt-20">
          <Footer />
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mt-32">
          <Navbar />
        </section>
        <section className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">My cart</h1>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.items.map((item) => {
                    const lastAdded = lastAddedItem.find(
                      (added) => added.skuCode === item.skuCode
                    );
                    return (
                      <div
                        key={item.skuCode}
                        className="flex gap-4 py-4 border-b last:border-b-0"
                      >
                        <div className="w-24 h-24 bg-muted rounded-md overflow-hidden">
                          {lastAdded && lastAdded.imageUrls?.[0] && (
                            <img
                              src={lastAdded.imageUrls[0]}
                              alt={lastAdded.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 grid gap-2">
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
                                updateQuantity(
                                  item.id,
                                  item.skuCode,
                                  item.productPermalink,
                                  false // Decrease quantity
                                )
                              }
                              disabled={
                                stock[item.skuCode] === currentProductStock - 1
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
                                updateQuantity(
                                  item.id,
                                  item.skuCode,
                                  item.productPermalink,
                                  true // Increase quantity
                                )
                              }
                              disabled={stock[item.skuCode] === 0}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                        <div className="font-medium text-right">
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
              <Card className="shadow-lg sticky top-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Summary</CardTitle>
                    <span className="text-muted-foreground">
                      {cart.items.length} items
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" size="lg">
                    Check out
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/">Continue shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
}
