import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import formatPrice from "../../utils/formatPrice";

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
    const discount = Math.round(100 - (promotionalPrice / price) * 100);
    setDiscounted(discount);
  }, [promotionalPrice, price]);

  return (
    <div className="mt-6 dtdf:w-[370px] dtdf:h-[524px] dtcs:w-[267px] dtcs:h-[425px] overflow-hidden justify-start bg-white hover:-translate-y-2">
      <div className="relative">
        <img
          className="dtdf:w-[370px] dtdf:h-[370px] dtcs:w-[267px] dtcs:h-[267px] object-cover"
          src={imageUrls}
          alt={name}
        />
        {discounted !== 100 && discounted !== 0 ? (
          <div className="absolute w-[66px] h-[34px] top-[24px] right-0 bg-[#FF000D] text-white break-all text-center gap-2 pt-[7px] px-[10px] pb-[7px] text-sm">
            - {discounted}%{" "}
          </div>
        ) : null}
      </div>
      <div className="mt-4">
        <div className="font-bold text-xl mb-2 line-clamp-1 ">{name}</div>
        <p
          className=" 
          text-muted-foreground
          text-base
          line-clamp-1
          break-all
          mb-2
          overflow-hidden"
          title={description}
        >
          {description}
        </p>
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
        <div className="flex flex-col mt-3 items-end">
          {promotionalPrice && promotionalPrice < price ? (
            <div className="flex flex-row items-center gap-4">
              <span className="text-gray-500 line-through mr-2">
                {formatPrice(price)}
              </span>
              <span className="text-[#FF000D] font-bold text-2xl">
                THB {formatPrice(promotionalPrice)}
              </span>
            </div>
          ) : (
            <>
              <span className="text-[#080808] font-bold text-2xl justify-items-end">
                THB {formatPrice(price)}
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
  collection: PropTypes.string,
};

export default FeaturedProductCard;
