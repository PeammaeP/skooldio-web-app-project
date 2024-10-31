import React from "react";
import FeaturedProductCard from "@/components/appProductCard/FeaturedProductCard";
import fetchAPI from "@/utils/fetchAPI";
import allProductAPI from "@/data/allProductAPI";
import { Link } from "react-router-dom";

const AppProductCard = () => {
  const [productDisplay, setProductDisplay] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDataProduct = async (API) => {
      try {
        setIsLoading(true);
        const dataProduct = await fetchAPI(API);
        if (dataProduct && dataProduct.data) {
          setProductDisplay(dataProduct.data);
        } else {
          setError("No data available");
        }
      } catch (err) {
        setError("Error fetching products");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const loadingTimeout = setTimeout(() => {
      fetchDataProduct(allProductAPI);
    }, 50);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-6">
      {productDisplay.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.permalink}`}
          className="block transform hover:scale-[1.02] transition-transform duration-300"
        >
          <FeaturedProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            promotionalPrice={product.promotionalPrice}
            description={product.description}
            ratings={product.ratings}
            imageUrls={product.imageUrls[0]}
          />
        </Link>
      ))}
    </div>
  );
};

export default AppProductCard;
