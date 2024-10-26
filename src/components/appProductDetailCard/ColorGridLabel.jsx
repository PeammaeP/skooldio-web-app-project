import PropTypes from "prop-types";
import { useState } from "react";

const ColorGridLabel = ({ colorCode, label }) => {
  const [selectedColor, setSelectedColor] = useState(label);

  console.log("MyColor in Component : ", selectedColor, "Label Color", label);

  return (
    <div className="flex flex-col items-start">
      <button
        className={`relative w-[54px] h-[54px] border border-gray-200 border-[#C1CD00]${
          selectedColor === label
            ? "border-[#C1CD00]"
            : "border-gray-300 text-gray-700 hover:border-[#C1CD00]"
        }`}
        onClick={() => {
          setSelectedColor(label);
        }}
      >
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {[...Array(36)].map((_, index) => (
            <div
              key={index}
              className="border border-white"
              style={{ backgroundColor: colorCode }}
            ></div>
          ))}
        </div>
      </button>
      <span className="text-sm mt-2 text-gray-600">{label}</span>
    </div>
  );
};

ColorGridLabel.propTypes = {
  colorCode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ColorGridLabel;
