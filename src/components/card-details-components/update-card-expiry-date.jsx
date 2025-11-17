// export default function CardExpiryInput({ form, setForm, errors }) {
//   //   const expMMRef = useRef(null);
//   //   const expYYRef = useRef(null);
//   //   const cvcRef = useRef(null);

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     value = value.replace(/\D/g, "").slice(0, 2);
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <>
//       {/* Exp. MM */}
//       <div className="flex-1">
//         <label className="text-gray-700 text-sm">MM</label>
//         <input
//           name="expMM"
//           value={form.expMM}
//           onChange={handleChange}
//           className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//             ${
//               errors
//                 ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                 : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//             }
//             focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//           `}
//         />
//         {errors.expMM && <p className="text-error text-xs">{errors.expMM}</p>}
//       </div>
//       {/* Exp. YY */}
//       <div className="flex-1">
//         <label className="text-gray-700 text-sm">YY</label>
//         <input
//           name="expYY"
//           value={form.expYY}
//           onChange={handleChange}
//           className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//             ${
//               errors
//                 ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                 : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//             }
//             focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//           `}
//         />
//         {errors.expYY && <p className="text-error text-xs">{errors.expYY}</p>}
//       </div>
//     </>
//   );
// }

export default function CardExpiryInput({
  form,
  setForm,
  errors,
  expYYRef,
  cvcRef,
  handleExpiryChange,
  handleFieldChange,
}) {
  // Handle MM input change
  const handleMMChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setForm((prev) => ({ ...prev, expMM: val }));

    // Validate and set errors
    const newErrors = handleExpiryChange("expMM", val);

    // Move to YY only if no error and length is 2
    if (!newErrors.expMM && val.length === 2) {
      expYYRef.current.focus();
    }

    // Validate CVC immediately
    handleFieldChange("expMM", val);
  };

  // Handle YY input change
  const handleYYChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setForm((prev) => ({ ...prev, expYY: val }));

    // Validate and set errors
    const newErrors = handleExpiryChange("expYY", val);

    // Move to CVC only if no error and length is 2
    if (!newErrors.expYY && val.length === 2) {
      cvcRef.current.focus();
    }

    // Validate CVC immediately
    handleFieldChange("expYY", val);
  };

  return (
    <>
      {/* Exp. MM */}
      <div className="flex-1">
        <label className="text-gray-700 text-sm">MM</label>
        <input
          name="expMM"
          value={form.expMM}
          onChange={handleMMChange}
          maxLength={2}
          className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
            ${
              errors.expMM
                ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
            }
            focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
          `}
        />
        {errors.expMM && <p className="text-error text-xs">{errors.expMM}</p>}
      </div>

      {/* Exp. YY */}
      <div className="flex-1">
        <label className="text-gray-700 text-sm">YY</label>
        <input
          name="expYY"
          value={form.expYY}
          onChange={handleYYChange}
          ref={expYYRef}
          maxLength={2}
          className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
            ${
              errors.expYY
                ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
            }
            focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
          `}
        />
        {errors.expYY && <p className="text-error text-xs">{errors.expYY}</p>}
      </div>
    </>
  );
}
