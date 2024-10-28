import { useState, useEffect } from "react";
import fetchAPI from "../../utils/fetchAPI";
import TestProductDetailAPI from "../../data/productDetailAPI";
import ProductDetailCard from "./ProductDetail";

const AppProductDetail = () => {
  const [dataProductDetail, setDataProductDetail] = useState(null);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const functionGetProductDetail = async (API) => {
      const dataProductDetail = await fetchAPI(API);
      if (dataProductDetail) {
        setDataProductDetail(dataProductDetail);
        setLoadingState(false);
      } else {
        console.log("Have No ProductDetail on your page");
        setLoadingState(false);
      }
    };

    const loadingTimeOut = setTimeout(() => {
      functionGetProductDetail(TestProductDetailAPI);
    }, 10);

    return () => clearTimeout(loadingTimeOut);
  }, []);

  if (loadingState) {
    return <div>Loading...</div>;
  }

  if (!dataProductDetail) {
    return <div>No Product Data Available</div>;
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
