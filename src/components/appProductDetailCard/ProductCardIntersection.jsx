import { useState, useEffect } from "react";
import allProductAPI from "../../data/allProductAPI";
import fetchAPI from "../../utils/fetchAPI";
import FeaturedProductCard from "../appProductCard/FeaturedProductCard";
import PropTypes from "prop-types";

const ProductCardIntersection = ({ collection, currentProductId }) => {
  const [productDisplay, setProductDisplay] = useState([]);

  const filterValueCollection = (products, collection, currentProductId) => {
    if (collection === "") return products;
    return products.filter(
      (product) =>
        product.collection === collection && product.id !== currentProductId
    );
  };

  useEffect(() => {
    const fetchDataProduct = async (API) => {
      const dataProduct = await fetchAPI(API);
      if (dataProduct && dataProduct.data) {
        console.log("Have Product from FetchAPI");
        console.log(dataProduct.data);
        setProductDisplay(dataProduct.data);
      } else {
        console.log("Not Have Some Data from Fetch");
      }
    };
    const loadingTimeOut = setTimeout(() => {
      fetchDataProduct(allProductAPI);
    }, 10);
    return () => clearTimeout(loadingTimeOut);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
        {filterValueCollection(
          productDisplay,
          collection,
          currentProductId
        ).map((value) => (
          <FeaturedProductCard
            key={value.id}
            name={value.name}
            price={value.price}
            promotionalPrice={value.promotionalPrice}
            description={value.description}
            ratings={value.ratings}
            imageUrls={value.imageUrls[0]}
          />
        ))}
      </div>
    </div>
  );
};

ProductCardIntersection.propTypes = {
  collection: PropTypes.string.isRequired,
  currentProductId: PropTypes.string.isRequired,
};

export default ProductCardIntersection;
