import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QuantityChangeSelector = (maxQuantity) => {
  const [quantity, setQuantity] = useState(1);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setIsToggleOpen(false);
  };

  return (
    <div className="w-full max-w-[200px]">
      <label
        htmlFor="quantity"
        className="block font-semibold mb-4 text-[#626262] text-lg"
      >
        Qty.
      </label>
      <div className="relative">
        <button
          type="button"
          className="relative w-[224px] h-[54px] bg-white border border-gray-300 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onClick={() => setIsToggleOpen(!isToggleOpen)}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <span className="block truncate">{quantity}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </button>
        {isToggleOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-0"
          >
            {[...Array(maxQuantity.maxQuantity)].map((_, index) => (
              <li
                key={index}
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                id={`listbox-option-${index}`}
                role="option"
                onClick={() => handleQuantityChange(index + 1)}
              >
                <span className="block truncate">{index + 1}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

QuantityChangeSelector.propTypes = {
  maxQuantity: PropTypes.number.isRequired,
};

export default QuantityChangeSelector;
