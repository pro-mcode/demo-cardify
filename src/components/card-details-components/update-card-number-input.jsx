import { useState } from "react";

export default function CardNumberInput({
  form,
  setForm,
  error,
  handleFieldChange,
}) {
  const [displayValue, setDisplayValue] = useState(
    form.cardNumber ? formatCardNumber(form.cardNumber) : ""
  );

  function formatCardNumber(number) {
    const cleaned = number.replace(/\D/g, "").slice(0, 16); // only digits
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16); // clean digits
    setDisplayValue(formatCardNumber(raw)); // update formatted display
    setForm((prev) => ({ ...prev, cardNumber: raw })); // update parent form
    handleFieldChange("cardNumber", raw);
  };

  return (
    <div className="relative mb-2">
      <label className="text-gray-700 text-sm">Card Number</label>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        maxLength={19} // 16 digits + 3 spaces
        placeholder="1234 5678 9012 3456"
        className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
            ${
              error
                ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
            }
            focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
          `}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
