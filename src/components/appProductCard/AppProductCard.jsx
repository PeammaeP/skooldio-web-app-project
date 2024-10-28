import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import fetchAPI from "../../utils/fetchAPI";
import allProductAPI from "../../data/allProductAPI";

const AppProductCard = () => {
  const [productDisplay, setProductDisplay] = React.useState([]);

  React.useEffect(() => {
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
    }, 1000);
    return () => clearTimeout(loadingTimeOut);
  }, []);

  return (
    <div className="grid grid-cols-4 p-12 gap-6 justify-start items-start">
      {productDisplay.map((value) => (
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
  );
};

export default AppProductCard;
