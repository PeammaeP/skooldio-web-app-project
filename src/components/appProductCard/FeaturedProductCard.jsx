import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";

const FeaturedProductCard = ({
  name,
  price,
  promotionalPrice,
  description,
  ratings,
  imageUrls,
}) => {
  const [discounted, setDiscounted] = useState(price);

  useEffect(() => {
    const discount = Math.ceil((promotionalPrice / price) * 100);
    setDiscounted(discount);
  }, [promotionalPrice, price]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img className="w-full" src={imageUrls} alt={name} />
        {discounted === 100 ? (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm font-bold">
            - {discounted}%{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < ratings ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="mt-4">
          {promotionalPrice && promotionalPrice < price ? (
            <>
              <span className="text-gray-500 line-through mr-2">
                THB {price}
              </span>
              <span className="text-red-500 font-bold text-xl">
                THB {promotionalPrice}
              </span>
            </>
          ) : (
            <>
              <span className="text-gray-500 font-bold mr-4 text-xl">
                THB {price}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

FeaturedProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  promotionalPrice: PropTypes.number,
  description: PropTypes.string.isRequired,
  ratings: PropTypes.number.isRequired,
  imageUrls: PropTypes.string.isRequired,
};

export default FeaturedProductCard;
