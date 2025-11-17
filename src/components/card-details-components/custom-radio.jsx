import React from "react";

export default function CustomRadio({
  id,
  label,
  value,
  selectedValue,
  setSelectedValue,
  disabled,
}) {
  return (
    <label
      htmlFor={id}
      className={`flex justify-start items-center space-x-6 w-full border-b-2 border-gray-200 pb-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* Custom radio */}
      <div
        className={`w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center
          ${selectedValue != value ? "bg-white" : "bg-white"} 
          transition-colors duration-150`}
      >
        {selectedValue === value && (
          <div className="w-3 h-3 rounded-full bg-purple-950"></div>
        )}
      </div>

      <span className="text-black text-base font-light tracking-wide">
        {label}
      </span>

      {/* Hidden native radio */}
      <input
        type="radio"
        id={id}
        value={value}
        checked={selectedValue === value}
        onChange={() => setSelectedValue(value)}
        disabled={disabled}
        className="hidden"
      />
    </label>
  );
}
