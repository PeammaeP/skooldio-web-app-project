import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import formatPrice from "../../utils/formatPrice";
import QuantityChangeSelector from "./QuantityChangeSelector";

const ProductDetailCard = ({
  id,
  name,
  skuCode,
  permalink,
  description,
  price,
  promotionalPrice,
  categories,
  collection,
  ratings,
  imageUrls,
  variants,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
  // const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [discounted, setDiscounted] = useState(price);

  useEffect(() => {
    const discount = Math.round((promotionalPrice / price) * 100);
    setDiscounted(discount);
  }, [promotionalPrice, price]);

  return (
    <div className="grid grid-cols-2 mt-6 gap-6 p-4 mx-auto max-w-7xl">
      {/* First Col */}
      <div className="relative flex flex-col">
        {/* Main Image */}
        <div className="relative w-full max-w-lg h-auto">
          <img src={selectedImage} alt={name} className="w-full h-auto" />
          {discounted !== 100 ? (
            <div className="absolute w-[66px] h-[34px] top-[24px] right-0 bg-[#FF000D] text-white text-center gap-2 pt-[7px] px-[10px] pb-[7px] text-sm">
              - {discounted}%{" "}
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Sub-Image */}
        <div className="flex flex-row gap-2 mt-4">
          {imageUrls.map((image, index) => (
            <div key={index} className="w-24 h-24 overflow-hidden bg-gray-100">
              <img
                src={image}
                alt={`${name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* end sub-image */}
      </div>
      {/* Second Col */}
      <div className="flex flex-col gap-6">
        {/* ID */}
        <h2 className="text-2xl font-bold text-[#222222]">ID : {id}</h2>
        {/* Name */}
        <h1 className="text-5xl font-bold text-[#222222] mt-4">{name}</h1>
        {/* Description */}
        <h2 className="text-[#626262] text-2xl mt-4">{description}</h2>
        {/* Promotional Price Display ( If has ) */}
        <div className="flex flex-col mt-4">
          {promotionalPrice && promotionalPrice < price ? (
            <>
              <div
                className="bg-[#FF000D] text-white text-4xl font-bold mr-2.5 mb-2 flex items-center justify-center"
                style={{
                  padding: "8px 10px",
                  gap: "10px",
                  width: "fit-content",
                  height: "fit-content",
                  opacity: 1, // opacity 0 hides it, so set to 1 for visible
                }}
              >
                <span>THB</span>
                <span>{formatPrice(promotionalPrice)}</span>
              </div>
              <div className="relative text-[#222222] text-lg">
                <span>From </span>
                <span className="line-through">THB {formatPrice(price)}</span>
              </div>
            </>
          ) : (
            <div className="text-gray-900 text-4xl font-bold">
              THB {formatPrice(price)}
            </div>
          )}
        </div>
        {/* Star ( Ratings ) */}
        <div className="flex items-center mt-2 gap-1 py-2 w-[130px] h-[30px]">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < ratings ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        {/* Variants */}
        <div className="space-y-4">
          {variants.map((variant) => {
            return (
              <div key={variant.skuCode} className="flex flex-col">
                <h2 className="flex flex-col justify-start items-start font-semibold mb-4 text-[#626262] text-lg">
                  Color
                </h2>
                {/* Color */}
                <div className="flex flex-col items-start">
                  <button
                    key={variant.skuCode}
                    className={`relative w-[54px] h-[54px] border ${
                      selectedColor === variant.color
                        ? "border-[#C1CD00]"
                        : "border-gray-300 hover:border-[#C1CD00]"
                    }`}
                    onClick={() => {
                      setSelectedColor(variant.color);
                    }}
                  >
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                      {[...Array(36)].map((_, index) => (
                        <div
                          key={index}
                          className={`border border-white `}
                          style={{ backgroundColor: variant.colorCode }}
                        ></div>
                      ))}
                    </div>
                  </button>
                  <span className="text-sm mt-2 text-gray-600">
                    {variant.color}
                  </span>
                </div>
                {/* Size */}
                <div className="gap-4">
                  <h2 className="font-semibold mb-4 text-[#626262] text-lg">
                    Size
                  </h2>
                  <div className="flex flex-row items-start justify-start space-x-3">
                    <button
                      key={variant.size}
                      className={`w-[106px] h-[54px] border text-lg font-medium transition-colors 
                          ${
                            selectedSize === variant.size
                              ? "border-[#C1CD00]"
                              : "border-gray-300 text-gray-700 hover:border-[#C1CD00]"
                          }`}
                      onClick={() => setSelectedSize(variant.size)}
                    >
                      {variant.size}
                    </button>
                  </div>
                </div>
                {/* Drop Down Quantity  => Using QuantityChangeSelector */}
                <div className="w-full max-w-[200px] gap-4 mt-4">
                  <QuantityChangeSelector maxQuantity={variant.remains}/>
                </div>
                {/* Add to Cart Button */}
              </div>
            );
          })}
          <button className="flex flex-col justify-center items-center mt-4 bg-[#222222] text-white h-[54px] w-full hover:bg-[#222333]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDetailCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  skuCode: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  promotionalPrice: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  collection: PropTypes.string.isRequired,
  ratings: PropTypes.number.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      skuCode: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      size: PropTypes.string,
      remains: PropTypes.number.isRequired,
      colorCode: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductDetailCard;
