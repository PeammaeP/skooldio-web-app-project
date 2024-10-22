import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import fetchAPI from "../../utils/fetchAPI";
import allProductAPI from "../../data/allProductAPI";

const AppProductCard = () => {
  const [productDisplay, setProductDisplay] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState(true);

  React.useEffect(() => {
    const fetchDataProduct = async (API) => {
      const dataProduct = await fetchAPI(API);
      if (dataProduct && dataProduct.data) {
        console.log("Have Product from FetchAPI");
        console.log(dataProduct.data);
        setProductDisplay(dataProduct.data);
        setLoadingState(false);
      } else {
        console.log("Not Have Some Data from Fetch");
      }
    };
    try {
      const loadingTimeOut = setTimeout(() => {
        fetchDataProduct(allProductAPI);
      }, 1000);
      return () => clearTimeout(loadingTimeOut);
    } finally {
      setLoadingState(false);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-6 justify-center">
      {productDisplay.map((value) => (
        <FeaturedProductCard
          key={value.id}
          name={value.name}
          price={value.price}
          promotionalPrice={value.promotionalPrice}
          description={value.description}
          ratings={value.ratings}
          imageUrls={value.imageUrls[0]}
          loadingState={loadingState}
        />
      ))}
    </div>
  );
};

export default AppProductCard;
