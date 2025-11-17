// export default function CVCInput({ form, setForm, errors }) {
//   const handleChange = (e) => {
//     let { value } = e.target;
//     value = value.replace(/\D/g, "").slice(0, 4);
//     setForm((prev) => ({ ...prev, cvc: value }));
//   };

//   return (
//     <div className="flex-1">
//       <label className="text-gray-700 text-sm">CVC</label>
//       <input
//         name="cvc"
//         value={form.cvc}
//         onChange={handleChange}
//         className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//           ${
//             errors
//               ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//               : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//           }
//           focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//         `}
//       />
//       {errors.cvc && <p className="text-errors text-xs">{errors.cvc}</p>}
//     </div>
//   );
// }

export default function CVCInput({
  form,
  setForm,
  errors,
  handleFieldChange,
  cvcRef,
}) {
  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4); // Only digits, max 4
    setForm((prev) => ({ ...prev, cvc: val }));

    // Validate CVC immediately
    handleFieldChange("cvc", val);
  };

  return (
    <div className="flex-1">
      <label className="text-gray-700 text-sm">CVC</label>
      <input
        name="cvc"
        value={form.cvc}
        onChange={handleChange}
        maxLength={4}
        placeholder="123"
        ref={cvcRef}
        className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
          ${
            errors.cvc
              ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
              : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
          }
          focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
        `}
      />
      {errors.cvc && <p className="text-error text-xs">{errors.cvc}</p>}
    </div>
  );
}
