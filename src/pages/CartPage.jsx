import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CartPage = () => {
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
                Looks like you have not added anything to your cart. Go ahead &
                explore top categories.
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
                <Link href="#">Continue shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
