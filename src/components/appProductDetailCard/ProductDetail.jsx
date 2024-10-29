import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import formatPrice from "../../utils/formatPrice";
import ProductVariants from "./ProductVariants";
import ProductCardIntersection from "./ProductCardIntersection";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    handleImageChange(imageUrls[nextIndex], nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    handleImageChange(imageUrls[prevIndex], prevIndex);
  };

  const [discounted, setDiscounted] = useState(price);

  useEffect(() => {
    const discount = Math.round(100 - (promotionalPrice / price) * 100);
    setDiscounted(discount);
  }, [promotionalPrice, price]);

  return (
    <div className="mx-auto px-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 mt-6 gap-6 mx-auto max-w-7xl dtdf:max-w-screen-2xl">
        {/* First Col */}
        <div className="relative flex flex-col">
          {/* Main Image */}
          <div className="relative w-full max-w-7xl h-auto">
            <img src={selectedImage} alt={name} className="w-full h-auto" />
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-30 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-30 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {discounted !== 100 && discounted !== 0 ? (
              <div className="absolute w-[66px] h-[34px] top-[24px] right-0 bg-[#FF000D] text-white text-center gap-2 pt-[7px] px-[10px] pb-[7px] text-sm">
                - {discounted}%{" "}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Sub-Image */}
          <div className="flex flex-row justify-between items-center gap-2 mt-4">
            {imageUrls.map((image, index) => (
              <button
                key={index}
                className="h-auto w-full max-w-48 overflow-hidden bg-gray-100"
                onClick={() => handleImageChange(image, index)}
              >
                <img
                  src={image}
                  alt={`${name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
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
          <ProductVariants variants={variants} />
        </div>
      </div>
      <section className="relative flex flex-col items-start mt-36 dtdf:max-w-screen-2xl md:max-w-7xl mx-auto mb-auto">
        <h2 className="text-3xl md:text-3xl font-bold text-[#222222] flex items-start justify-start">
          People Also Like These
        </h2>
        <div className="bg-white overflow-hidden max-7xl">
          <ProductCardIntersection
            collection={collection}
            currentProductId={id}
          />
        </div>
      </section>
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
