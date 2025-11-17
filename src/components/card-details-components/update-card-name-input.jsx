import { useState } from "react";

export default function CardNameInput({
  form,
  setForm,
  error,
  handleFieldChange,
}) {
  const [nameLength, setNameLength] = useState(form.cardName?.length || 0);

  const handleChange = (e) => {
    const val = e.target.value.slice(0, 20); // enforce max length
    setForm((prev) => ({ ...prev, cardName: val }));
    setNameLength(val.length);

    handleFieldChange("cardName", val);
  };

  return (
    <div className="relative  mb-4">
      <label className="text-gray-700 text-sm">Cardholder Name</label>
      <input
        name="cardName"
        value={form.cardName}
        onChange={handleChange}
        maxLength={20}
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
      {nameLength > 0 && (
        <p className="absolute top-[50%] mt-[2px] right-4 text-sm text-gray-500">
          {nameLength}/20
        </p>
      )}
    </div>
  );
}
