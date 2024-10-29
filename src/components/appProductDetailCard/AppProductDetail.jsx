import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchAPI from "../../utils/fetchAPI";
import ProductDetailCard from "./ProductDetail";
import NotFoundHandler from "../../error/NotFoundHandler";

const AppProductDetail = () => {
  const { permalink } = useParams();
  const navigate = useNavigate();

  const [dataProductDetail, setDataProductDetail] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);

  console.log(permalink);

  useEffect(() => {
    const functionGetProductDetail = async () => {
      try {
        setLoadingState(true);
        setError(null);

        const response = await fetchAPI(
          `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
        );

        if (response) {
          setDataProductDetail(response);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error loading product details");
        console.error("Fetch error:", err);
      } finally {
        setLoadingState(false);
      }
    };

    const loadingTimeOut = setTimeout(() => {
      functionGetProductDetail();
    }, 10);

    return () => clearTimeout(loadingTimeOut);
  }, [permalink]); // Add permalink as dependency

  if (loadingState) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image skeleton */}
            <div className="bg-gray-200 aspect-square rounded-lg"></div>

            {/* Content skeleton */}
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <NotFoundHandler error={error} />;
  }

  if (!dataProductDetail) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="text-yellow-800 text-lg font-semibold mb-2">
            Product Not Found
          </h2>
          <p className="text-yellow-600">
            The requested product could not be found.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-yellow-600 hover:text-yellow-800 font-medium"
          >
            Return to Product List
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductDetailCard
        id={dataProductDetail.id}
        name={dataProductDetail.name}
        skuCode={dataProductDetail.skuCode}
        permalink={dataProductDetail.permalink}
        description={dataProductDetail.description}
        price={dataProductDetail.price}
        promotionalPrice={dataProductDetail.promotionalPrice}
        categories={dataProductDetail.categories}
        collection={dataProductDetail.collection}
        ratings={dataProductDetail.ratings}
        imageUrls={dataProductDetail.imageUrls}
        variants={dataProductDetail.variants}
      />
    </>
  );
};

export default AppProductDetail;
