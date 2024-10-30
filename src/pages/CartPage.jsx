import { Link } from "react-router-dom";
import AppProductCard from "../components/appProductCard/AppProductCard";
import CartCard from "../components/appCart/CartCard";

const CartPage = () => {
  return (
    <div className="bg-[#fafafa]">
      <div>
        <CartCard />
      </div>
      <section className="flex flex-col justify-center items-center flex-1">
        <h2 className="text-3xl font-bold mb-4 mt-16 text-center">
          Featured Product
        </h2>
        <div className="mt-6 gap-6 p-6">
          <AppProductCard />
        </div>
      </section>
    </div>
  );
};

export default CartPage;
