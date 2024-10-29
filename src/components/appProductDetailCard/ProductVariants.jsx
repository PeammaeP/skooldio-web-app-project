import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import QuantityChangeSelector from "./QuantityChangeSelector";

const sizeOrder = ["XS", "S", "M", "L", "XL"];

const ProductVariants = ({ variants }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [hasSize, setHasSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  // restructure the variants of the API
  const groupedVariants = useMemo(() => {
    return variants.reduce((acc, variant) => {
      if (!acc[variant.color]) {
        acc[variant.color] = { colorCode: variant.colorCode, sizes: {} };
      }
      if (!variant.size) {
        acc[variant.color].skuCode = variant.skuCode;
        acc[variant.color].remains = variant.remains;
      } else {
        acc[variant.color].sizes[variant.size] = {
          skuCode: variant.skuCode,
          remains: variant.remains,
        };
      }
      return acc;
    }, {});
  }, [variants]);

  // Set `hasSize` based on whether any variant includes sizes
  useEffect(() => {
    const hasAnySize = variants.some((variant) => variant.size);
    setHasSize(hasAnySize);
  }, [variants]);

  // need to use array to sort because the result was array !
  const sortSizes = (sizes) => {
    if (sizes) {
      return sizes
        .filter(([size]) => size) // filter out falsy values
        .sort(([a], [b]) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
    }
    return [];
  };

  const handleAddToCart = () => {
    if (selectedColor && (selectedSize || !hasSize)) {
      const selectedVariant = hasSize
        ? groupedVariants[selectedColor].sizes[selectedSize]
        : groupedVariants[selectedColor];
      console.log(
        `Added to cart: ${selectedVariant.skuCode} , Quantity ${selectedQuantity}`
      );
    }
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="color-select"
        className="flex flex-col justify-start items-start font-semibold mb-4 text-[#626262] text-lg"
      >
        Color
      </label>
      <div id="color-select" className="flex flex-wrap gap-4">
        {Object.entries(groupedVariants).map(([color, data]) => (
          <div key={color} className="flex flex-col items-start">
            <button
              className={`relative w-[54px] h-[54px] border ${
                selectedColor === color
                  ? "border-[#C1CD00]"
                  : "border-gray-300 hover:border-[#C1CD00]"
              }`}
              onClick={() => handleColorSelect(color)}
              aria-label={color}
              aria-checked={selectedColor === color}
            >
              <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                {[...Array(36)].map((_, index) => (
                  <div
                    key={index}
                    className="border border-white"
                    style={{ backgroundColor: data.colorCode }}
                  />
                ))}
              </div>
            </button>
            <span className="text-sm mt-2 text-gray-600">{color}</span>
          </div>
        ))}
      </div>
      {selectedColor && hasSize && (
        <div>
          <label
            htmlFor="size-select"
            className="text-[#626262] text-lg font-semibold mb-2 block"
          >
            Size
          </label>
          <div
            id="size-select"
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Size selection"
          >
            {sortSizes(
              Object.entries(groupedVariants[selectedColor].sizes)
            ).map(([size, data]) => (
              <button
                key={size}
                className={`relative w-[54px] h-[54px] border ${
                  selectedSize === size
                    ? "border-[#C1CD00]"
                    : "border-gray-300 hover:border-[#C1CD00]"
                }`}
                onClick={() => handleSizeSelect(size)}
                disabled={data.remains === 0}
                aria-label={`Size ${size}, ${data.remains} remaining`}
                aria-checked={selectedSize === size}
                role="radio"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedColor && (hasSize ? selectedSize : true) && (
        <div>
          <QuantityChangeSelector
            maxQuantity={
              hasSize
                ? groupedVariants[selectedColor].sizes[selectedSize].remains
                : groupedVariants[selectedColor].remains
            }
            onChange={handleQuantityChange} // Pass the callback
          />
        </div>
      )}
      <button
        className="flex flex-col justify-center items-center mt-4 bg-[#222222] text-white h-[54px] w-full hover:bg-[#222333]"
        onClick={handleAddToCart}
        disabled={!selectedColor || (!selectedSize && hasSize)}
      >
        Add to Cart
      </button>
    </div>
  );
};

ProductVariants.propTypes = {
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

export default ProductVariants;
