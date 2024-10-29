import { useState, useEffect } from "react";
import allProductAPI from "../../data/allProductAPI";
import fetchAPI from "../../utils/fetchAPI";
import FeaturedProductCard from "../appProductCard/FeaturedProductCard";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">
      {filterValueCollection(productDisplay, collection, currentProductId).map(
        (product) => (
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
        )
      )}
    </div>
  );
};

ProductCardIntersection.propTypes = {
  collection: PropTypes.string.isRequired,
  currentProductId: PropTypes.string.isRequired,
};

export default ProductCardIntersection;
