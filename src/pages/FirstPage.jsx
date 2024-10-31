import CollectionCard from "../components/appProductCard/CollectionCard";
import AppProductCard from "../components/appProductCard/AppProductCard";
import Footer from "@/components/landingCard/Footer";
import Navbar from "@/components/landingCard/Navbar";

const FirstPage = () => {
  return (
    <div>
      <section className="mt-32">
        <Navbar />
      </section>
      <section className="mb-12">
        <CollectionCard />
      </section>

      <section className="flex flex-col justify-center items-center flex-1">
        <h2 className="text-3xl font-bold mb-4 mt-16 text-center">
          Featured Product
        </h2>
        <div className="mt-6 gap-6 p-6">
          <AppProductCard />
        </div>
      </section>
      <section className="mt-12">
        <Footer />
      </section>
    </div>
  );
};

export default FirstPage;
