import CollectionCard from "../components/appProductCard/CollectionCard";
import AppProductCard from "../components/appProductCard/AppProductCard";
import Footer from "@/components/landingCard/Footer";

const FirstPage = () => {
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
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
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default FirstPage;
