import CollectionCard from "../components/appProductCard/CollectionCard";
import AppProductCard from "../components/appProductCard/AppProductCard";

const FirstPage = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <section className="mb-12">
        <CollectionCard />
      </section>

      <section className="mt-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Featured Product
        </h2>
        <div className="gap-6 p-6">
          <AppProductCard />
        </div>
      </section>
    </div>
  );
};

export default FirstPage;
