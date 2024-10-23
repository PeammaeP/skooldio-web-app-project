import { useState, useEffect } from "react";
import fetchAPI from "../../utils/fetchAPI";
import TestProductDetailAPI from "../../data/productDetailAPI";

const AppProductDetail = () => {
  const [dataProductDetail, setProductDetail] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  console.log(dataProductDetail);

  useEffect(() => {
    const functionGetProductDetail = async (API) => {
      const dataProductDetail = await fetchAPI(API);
      if (dataProductDetail) {
        console.log("Have DataProductDetail");
        setProductDetail(dataProductDetail);
        setLoadingState(false);
      } else {
        console.log("Have No ProductDetail on your page");
      }
    };
    try {
      const loadingTimeOut = setTimeout(() => {
        functionGetProductDetail(TestProductDetailAPI);
      }, 1000);
      return () => clearTimeout(loadingTimeOut);
    } finally {
      setLoadingState(false);
    }
  }, []);

  return <div>AppProductDetail</div>;
};

export default AppProductDetail;
