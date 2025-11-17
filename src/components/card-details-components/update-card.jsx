// import { useState } from "react";
// import dayjs from "dayjs";
// import CardNameInput from "./update-card-name-input";
// import CardNumberInput from "./update-card-number-input";
// import CardExpiryInput from "./update-card-expiry-date";
// import CVCInput from "./update-card-cvc";

// export default function UpdateCard({
//   card,
//   nickname,
//   cardLogos,
//   updateCard,
//   setShowUpdateModal,
//   cardNicknamesDefault,
// }) {
//   // -----------------------------
//   // INITIAL FORM
//   // -----------------------------
//   const initialForm = {
//     cardNumber: card.cardNumber || "",
//     expMM: card.expMM || "",
//     expYY: card.expYY || "",
//     cvc: card.cvc || "",
//     cardName: card.cardName || "",
//     nickname: nickname || cardNicknamesDefault[card.brand] || "Democard",
//   };

//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});

//   // -----------------------------
//   // CARD BRAND DETECTION
//   // -----------------------------
//   const detectBrand = (number) => {
//     const n = number.replace(/\D/g, "");
//     if (/^4/.test(n)) return "visa";
//     if (/^5[1-5]/.test(n)) return "mastercard";
//     if (/^3[47]/.test(n)) return "amex";
//     if (/^6/.test(n)) return "discover";
//     if (/^5078/.test(n)) return "verve";
//     return "unknown";
//   };

//   const brand = detectBrand(form.cardNumber);

//   // -----------------------------
//   // VALIDATION
//   // -----------------------------
//   const validateField = (name, value, formValues = form) => {
//     let msg = "";
//     const { expMM, expYY } = formValues;

//     switch (name) {
//       case "cardName":
//         if (!value.trim()) msg = "Cardholder name is required";
//         break;

//       case "cardNumber":
//         if (value.replace(/\D/g, "").length < 13)
//           msg = "Card number must be at least 13 digits";
//         break;

//       case "expMM": {
//         const month = Number(value); // convert to number

//         if (!value) {
//           msg = "Expiry month is required";
//         } else if (value.length !== 2) {
//           msg = "Month must be 2 digits";
//         } else if (month < 1 || month > 12) {
//           msg = "Invalid month (01–12)";
//         } else if (month && expYY) {
//           // Check if expired using Day.js
//           const isExpired = dayjs().isAfter(
//             dayjs(`20${expYY}-${value}-01`, "YYYY-MM-DD"),
//             "month"
//           );
//           if (isExpired) msg = "Card has expired";
//         }

//         break;
//       }

//       case "expYY": {
//         if (!value) msg = "Expiry year is required";
//         else if (value.length < 2) msg = "Invalid year";
//         else if (expMM) {
//           const cardDate = dayjs(`20${value}-${expMM}-01`);
//           const now = dayjs().startOf("month");
//           if (cardDate.isBefore(now)) msg = "Card has expired";
//         }
//         break;
//       }

//       case "cvc":
//         if (value.length < 3) msg = "CVC must be at least 3 digits";
//         break;
//     }

//     return msg;
//   };

//   // -----------------------------
//   // HANDLE INPUT
//   // -----------------------------
//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     // Format card number
//     if (name === "cardNumber") {
//       value = value
//         .replace(/\D/g, "")
//         .slice(0, 16)
//         .replace(/(.{4})/g, "$1 ")
//         .trim();

//       // Auto nickname update ONLY IF nickname is default
//       const detected = detectBrand(value);
//       const defaultNickname = cardNicknamesDefault[detected] || "Democard";

//       const nicknameIsDefault =
//         form.nickname === cardNicknamesDefault[card.brand] ||
//         form.nickname === cardNicknamesDefault[detectBrand(form.cardNumber)];

//       if (nicknameIsDefault) {
//         setForm((prev) => ({
//           ...prev,
//           cardNumber: value,
//           nickname: defaultNickname,
//         }));
//       } else {
//         setForm((prev) => ({ ...prev, cardNumber: value }));
//       }

//       const errorMsg = validateField(name, value);
//       setErrors((prev) => ({ ...prev, cardNumber: errorMsg }));
//       return;
//     }

//     // Force numeric for expiry & cvc
//     if (name === "expMM" || name === "expYY")
//       value = value.replace(/\D/g, "").slice(0, 2);

//     if (name === "cvc") value = value.replace(/\D/g, "").slice(0, 4);

//     // Update form
//     setForm((prev) => ({ ...prev, [name]: value }));

//     // Validate immediately
//     const msg = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: msg }));
//   };

//   // -----------------------------
//   // CHECK IF ANY CHANGES
//   // -----------------------------
//   const isChanged =
//     form.cardNumber.replace(/\D/g, "") !== card.cardNumber ||
//     form.expMM !== card.expMM ||
//     form.expYY !== card.expYY ||
//     form.cvc !== card.cvc ||
//     form.cardName !== card.cardName ||
//     form.nickname !== nickname;
//   // -----------------------------
//   // SUBMIT
//   // -----------------------------
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     // Validate all
//     const newErrors = {
//       cardName: validateField("cardName", form.cardName),
//       cardNumber: validateField("cardNumber", form.cardNumber),
//       expMM: validateField("expMM", form.expMM),
//       expYY: validateField("expYY", form.expYY),
//       cvc: validateField("cvc", form.cvc),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((msg) => msg)) return;
//     if (!isChanged) return;

//     updateCard(card.id, {
//       cardNumber: form.cardNumber.replace(/\D/g, ""),
//       expMM: form.expMM,
//       expYY: form.expYY,
//       cvc: form.cvc,
//       cardName: form.cardName,
//       nickname: form.nickname,
//       brand,
//     });

//     setShowUpdateModal(false);
//   };

//   const handleClose = () => setShowUpdateModal(false);

//   // -----------------------------
//   // UI
//   // -----------------------------
//   return (
//     <div
//       className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center"
//       onClick={handleClose}
//     >
//       <div
//         className="bg-white p-8 rounded-lg shadow-lg w-[400px] max-w-[95%]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold text-black">
//             Update Card Details
//           </h2>
//           <i
//             onClick={handleClose}
//             className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all"
//           />
//         </div>

//         <form onSubmit={handleUpdate}>
//           <CardNameInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardName}
//           />

//           <CardNumberInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardNumber}
//           />

//           {/* Card Brand */}
//           <div className="flex items-center gap-2 mb-4">
//             {brand && cardLogos[brand] ? (
//               <img src={cardLogos[brand]} className="w-12 h-8 object-contain" />
//             ) : (
//               <div className="flex items-center gap-1">
//                 <span className="w-6 h-6 bg-purple-950 rounded-full" />
//                 <span className="w-3 h-3 border-2 border-purple-950 rounded-full" />
//               </div>
//             )}
//           </div>

//           <div className="flex gap-3 mb-4">
//             {/* Exp. MM */}
//             <CardExpiryInput form={form} setForm={setForm} errors={errors} />
//             <CVCInput form={form} setForm={setForm} errors={errors} />
//           </div>

//           {/* Nickname */}
//           <label className="text-gray-700 text-sm">Nickname</label>
//           <input
//             name="nickname"
//             value={form.nickname}
//             onChange={handleChange}
//             className="w-full text-base p-2 mb-4 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//           />

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="text-gray-600"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={Object.values(errors).some((e) => e) || !isChanged}
//               className={`px-5 py-2 rounded text-white transition-all ${
//                 Object.values(errors).every((e) => !e) && isChanged
//                   ? "bg-purple-950 hover:opacity-80"
//                   : "bg-purple-950 opacity-50 cursor-not-allowed"
//               }`}
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import dayjs from "dayjs";
// import CardNameInput from "./update-card-name-input";
// import CardNumberInput from "./update-card-number-input";
// import CardExpiryInput from "./update-card-expiry-date";
// import CVCInput from "./update-card-cvc";
// // import { useNavigate } from "react-router";
// export default function UpdateCard({
//   card,
//   // nickname,
//   cardLogos,
//   updateCard,
//   setShowUpdateModal,
//   // cardNicknamesDefault,
// }) {
//   // FORM STATE
//   const [form, setForm] = useState({
//     cardNumber: card.cardNumber || "",
//     expMM: card.expMM || "",
//     expYY: card.expYY || "",
//     cvc: card.cvc || "",
//     cardName: card.cardName || "",
//     // nickname: nickname || cardNicknamesDefault[card.brand] || "Democard",
//   });

//   const [errors, setErrors] = useState({});

//   // CARD BRAND DETECTION
//   const detectBrand = (number) => {
//     const n = number.replace(/\D/g, "");
//     if (/^4/.test(n)) return "visa";
//     if (/^5[1-5]/.test(n)) return "mastercard";
//     if (/^3[47]/.test(n)) return "amex";
//     if (/^6/.test(n)) return "discover";
//     if (/^5078/.test(n)) return "verve";
//     return "unknown";
//   };

//   const brand = detectBrand(form.cardNumber);

//   // VALIDATION
//   const validateField = (name, value) => {
//     let msg = "";

//     switch (name) {
//       case "cardName":
//         if (!value.trim()) msg = "Cardholder name is required";
//         break;
//       case "cardNumber":
//         if (value.replace(/\D/g, "").length < 13)
//           msg = "Card number must be at least 13 digits";
//         break;
//       case "expMM": {
//         const month = Number(value);
//         if (!value) msg = "Expiry month is required";
//         else if (value.length !== 2) msg = "Month must be 2 digits";
//         else if (month < 1 || month > 12) msg = "Invalid month (01–12)";
//         break;
//       }
//       case "expYY": {
//         if (!value) msg = "Expiry year is required";
//         else if (value.length !== 2) msg = "Invalid year";
//         else if (form.expMM) {
//           const cardDate = dayjs(`20${value}-${form.expMM}-01`);
//           const now = dayjs().startOf("month");
//           if (cardDate.isBefore(now)) msg = "Card has expired";
//         }
//         break;
//       }
//       case "cvc":
//         if (value.length < 3) msg = "CVC must be at least 3 digits";
//         break;
//     }

//     return msg;
//   };

//   // UPDATE HANDLER
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const newErrors = {
//       cardName: validateField("cardName", form.cardName),
//       cardNumber: validateField("cardNumber", form.cardNumber),
//       expMM: validateField("expMM", form.expMM),
//       expYY: validateField("expYY", form.expYY),
//       cvc: validateField("cvc", form.cvc),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((msg) => msg)) return;

//     updateCard(card.id, {
//       cardNumber: form.cardNumber.replace(/\D/g, ""),
//       expMM: form.expMM,
//       expYY: form.expYY,
//       cvc: form.cvc,
//       cardName: form.cardName,
//       brand,
//     });

//     setShowUpdateModal(false);
//   };

//   // CLOSE MODAL
//   const handleClose = () => setShowUpdateModal(false);
//   // const navigate = useNavigate();
//   return (
//     <div
//       className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center"
//       onClick={handleClose}
//     >
//       <div
//         className="bg-white p-8 rounded-lg shadow-lg w-[400px] max-w-[95%]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold  text-black">
//             Update Card Details
//           </h2>
//           <i
//             onClick={handleClose}
//             className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"
//           />
//         </div>

//         <form onSubmit={handleUpdate}>
//           {/* Card Name */}
//           <CardNameInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardName}
//           />

//           {/* Card Number */}
//           <CardNumberInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardNumber}
//           />

//           {/* Card Brand Logo */}
//           <div className="flex items-center gap-2 mb-2">
//             {
//               brand && cardLogos[brand] ? (
//                 <img
//                   src={cardLogos[brand]}
//                   className="w-12 h-8 object-contain"
//                 />
//               ) : null
//               // <div className="flex items-center gap-1">
//               //   <span className="w-6 h-6 bg-purple-950 rounded-full" />
//               //   <span className="w-3 h-3 border-2 border-purple-950 rounded-full" />
//               // </div>
//             }
//           </div>

//           {/* Expiry and CVC */}
//           <div className="flex gap-3 mb-4">
//             <CardExpiryInput form={form} setForm={setForm} errors={errors} />
//             <CVCInput form={form} setForm={setForm} errors={errors} />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="text-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               // onClick={() => navigate("/")}
//               className="px-5 py-2 rounded text-white transition-all ease-in-out duration-75 bg-purple-950 hover:opacity-80"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import dayjs from "dayjs";
// import CardNameInput from "./update-card-name-input";
// import CardNumberInput from "./update-card-number-input";
// import CardExpiryInput from "./update-card-expiry-date";
// import CVCInput from "./update-card-cvc";

// export default function UpdateCard({
//   card,
//   nickname,
//   cardLogos,
//   updateCard,
//   setShowUpdateModal,
//   cardNicknamesDefault,
// }) {
//   const [form, setForm] = useState({
//     cardNumber: card.cardNumber || "",
//     expMM: card.expMM || "",
//     expYY: card.expYY || "",
//     cvc: card.cvc || "",
//     cardName: card.cardName || "",
//     nickname: nickname || cardNicknamesDefault[card.brand] || "Democard",
//   });

//   const [errors, setErrors] = useState({});

//   // -------------------------
//   // CARD BRAND DETECTION
//   // -------------------------
//   const detectBrand = (number) => {
//     const n = number.replace(/\D/g, "");
//     if (/^4/.test(n)) return "visa";
//     if (/^5[1-5]/.test(n)) return "mastercard";
//     if (/^3[47]/.test(n)) return "amex";
//     if (/^6/.test(n)) return "discover";
//     if (/^5078/.test(n)) return "verve";
//     return "unknown";
//   };
//   const brand = detectBrand(form.cardNumber);

//   // -------------------------
//   // VALIDATION
//   // -------------------------
//   const validateField = (name, value, allValues = {}) => {
//     const { expMM, expYY } = allValues;
//     let msg = "";

//     switch (name) {
//       case "cardName":
//         if (!value.trim()) msg = "Cardholder name is required";
//         break;
//       case "cardNumber":
//         if (value.replace(/\D/g, "").length < 13)
//           msg = "Card number must be at least 13 digits";
//         break;
//       case "expMM": {
//         const month = Number(value);
//         if (!value) msg = "Expiry month is required";
//         else if (value.length !== 2) msg = "Month must be 2 digits";
//         else if (month < 1 || month > 12) msg = "Invalid month (01–12)";
//         else if (month && expYY) {
//           const isExpired = dayjs().isAfter(
//             dayjs(`20${expYY}-${value}-01`, "YYYY-MM-DD"),
//             "month"
//           );
//           if (isExpired) msg = "Card has expired";
//         }
//         break;
//       }
//       case "expYY": {
//         if (!value) msg = "Expiry year is required";
//         else if (value.length !== 2) msg = "Invalid year";
//         else if (expMM) {
//           const cardDate = dayjs(`20${value}-${expMM}-01`);
//           const now = dayjs().startOf("month");
//           if (cardDate.isBefore(now)) msg = "Card has expired";
//         }
//         break;
//       }
//       case "cvc":
//         if (value.length < 3) msg = "CVC must be at least 3 digits";
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [name]: msg }));
//     return msg;
//   };

//   // -------------------------
//   // INPUT HANDLER
//   // -------------------------
//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     if (name === "cardNumber") {
//       value = value
//         .replace(/\D/g, "")
//         .replace(/(.{4})/g, "$1")
//         .trim();
//       const newBrand = detectBrand(value);

//       if (
//         form.nickname === cardNicknamesDefault[card.brand] ||
//         !form.nicknam
//       ) {
//         setForm((prev) => ({
//           ...prev,
//           cardNumber: value,
//           nickname: cardNicknamesDefault[newBrand] || "Democard",
//         }));
//       } else {
//         setForm((prev) => ({ ...prev, [name]: value }));
//       }

//       validateField(name, value);
//       return;
//     }

//     if (name === "expMM" || name === "expYY")
//       value = value.replace(/\D/g, "").slice(0, 2);
//     if (name === "cvc") value = value.replace(/\D/g, "").slice(0, 4);

//     setForm((prev) => ({ ...prev, [name]: value }));

//     // Validation for instant feedback
//     validateField(name, value, { ...form, [name]: value });
//   };

//   // -------------------------
//   // UPDATE HANDLER
//   // -------------------------
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const newErrors = {
//       cardName: validateField("cardName", form.cardName, form),
//       cardNumber: validateField("cardNumber", form.cardNumber, form),
//       expMM: validateField("expMM", form.expMM, form),
//       expYY: validateField("expYY", form.expYY, form),
//       cvc: validateField("cvc", form.cvc, form),
//     };

//     setErrors(newErrors);
//     if (Object.values(newErrors).some((msg) => msg)) return;

//     updateCard(card.id, {
//       cardNumber: form.cardNumber.replace(/\D/g, ""),
//       expMM: form.expMM,
//       expYY: form.expYY,
//       cvc: form.cvc,
//       cardName: form.cardName,
//       nickname: form.nickname,
//       brand,
//     });

//     setShowUpdateModal(false);
//   };

//   const handleClose = () => setShowUpdateModal(false);

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center"
//       onClick={handleClose}
//     >
//       <div
//         className="bg-white p-8 rounded-lg shadow-lg w-[400px] max-w-[95%]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-lg font-semibold  text-black">
//             Update Card Details
//           </h2>
//           <i
//             onClick={handleClose}
//             className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"
//           />
//         </div>

//         <form onSubmit={handleUpdate}>
//           <CardNameInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardName}
//           />
//           <CardNumberInput
//             form={form}
//             setForm={setForm}
//             error={errors.cardNumber}
//           />

//           <div className="flex items-center gap-2 mb-4">
//             {brand && cardLogos[brand] ? (
//               <img src={cardLogos[brand]} className="w-12 h-8 object-contain" />
//             ) : (
//               <div className="flex items-center gap-1">
//                 <span className="w-6 h-6 bg-purple-950 rounded-full" />
//                 <span className="w-3 h-3 border-2 border-purple-950 rounded-full" />
//               </div>
//             )}
//           </div>

//           <div className="flex gap-3 mb-4">
//             <CardExpiryInput form={form} setForm={setForm} errors={errors} />
//             <CVCInput form={form} setForm={setForm} errors={errors} />
//           </div>

//           <label className="text-gray-700 text-sm">Nickname</label>
//           <input
//             name="nickname"
//             value={form.nickname}
//             onChange={handleChange}
//             className="w-full text-base p-2 mb-4 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//           />

//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="text-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 rounded text-white transition-all ease-in-out duration-75 bg-purple-950 hover:opacity-80"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import dayjs from "dayjs";
import CardNameInput from "./update-card-name-input";
import CardNumberInput from "./update-card-number-input";
import CardExpiryInput from "./update-card-expiry-date";
import CVCInput from "./update-card-cvc";

export default function UpdateCard({
  card,
  cardLogos,
  updateCard,
  setShowUpdateModal,
}) {
  const [isDirty, setIsDirty] = useState(false);

  const [form, setForm] = useState({
    cardNumber: card.cardNumber || "",
    expMM: card.expMM || "",
    expYY: card.expYY || "",
    cvc: card.cvc || "",
    cardName: card.cardName || "",
  });

  const [errors, setErrors] = useState({});

  const expYYRef = useRef(null);
  const cvcRef = useRef(null);

  const detectBrand = (number) => {
    const n = number.replace(/\D/g, "");
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n)) return "mastercard";
    if (/^3[47]/.test(n)) return "amex";
    if (/^6/.test(n)) return "discover";
    if (/^5078/.test(n)) return "verve";
    return "unknown";
  };

  const brand = detectBrand(form.cardNumber);

  // ---------------------
  // VALIDATION FUNCTIONS
  // ---------------------
  const validateExpiry = (month, year) => {
    const errs = { expMM: "", expYY: "" };
    const m = Number(month);
    // const y = Number(year);

    if (!month) errs.expMM = "Expiry month is required";
    else if (month.length !== 2) errs.expMM = "Month must be 2 digits (01–12)";
    else if (m < 1 || m > 12) errs.expMM = "Invalid month (01–12)";

    if (!year) errs.expYY = "Expiry year is required";
    else if (year.length !== 2) errs.expYY = "Invalid year";

    if (!errs.expMM && !errs.expYY) {
      const cardDate = dayjs(`20${year}-${month}-01`);
      const now = dayjs().startOf("month");
      if (cardDate.isBefore(now)) {
        errs.expMM = errs.expYY = "Card has expired";
      }
    }

    return errs;
  };

  const validateField = (name, value) => {
    let msg = "";

    switch (name) {
      case "cardName":
        if (!value.trim()) msg = "Cardholder name is required";
        break;
      case "cardNumber":
        if (value.replace(/\D/g, "").length < 13)
          msg = "Card number must be at least 13 digits";
        break;
      case "cvc":
        if (value.length < 3) msg = "CVC must be at least 3 digits";
        break;
    }

    return msg;
  };

  // ---------------------
  // HANDLE EXPIRY CHANGE
  // ---------------------
  const handleExpiryChange = (name, value) => {
    value = value.replace(/\D/g, "").slice(0, 2);
    setForm((prev) => ({ ...prev, [name]: value }));

    const newErrors = validateExpiry(
      name === "expMM" ? value : form.expMM,
      name === "expYY" ? value : form.expYY
    );
    setErrors((prev) => ({ ...prev, ...newErrors }));

    return newErrors;
  };

  const handleFieldChange = (name, value) => {
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));

    // Mark form as dirty if value differs from original
    if (value !== card[name]) setIsDirty(true);
    return msg;
  };

  // ---------------------
  // SUBMIT
  // ---------------------
  const handleUpdate = (e) => {
    e.preventDefault();

    const newErrors = {
      cardName: validateField("cardName", form.cardName),
      cardNumber: validateField("cardNumber", form.cardNumber),
      cvc: validateField("cvc", form.cvc),
      ...validateExpiry(form.expMM, form.expYY),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg)) return;

    updateCard(card.id, {
      cardNumber: form.cardNumber.replace(/\D/g, ""),
      expMM: form.expMM,
      expYY: form.expYY,
      cvc: form.cvc,
      cardName: form.cardName,
      brand,
    });

    setShowUpdateModal(false);
  };

  const handleClose = () => setShowUpdateModal(false);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-10 flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-[400px] max-w-[95%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-black">
            Update Card Details
          </h2>
          <i
            onClick={handleClose}
            className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"
          />
        </div>

        <form onSubmit={handleUpdate}>
          {/* Card Name */}
          <CardNameInput
            form={form}
            setForm={setForm}
            error={errors.cardName}
            handleFieldChange={handleFieldChange}
          />

          {/* Card Number */}
          <CardNumberInput
            form={form}
            setForm={setForm}
            error={errors.cardNumber}
            handleFieldChange={handleFieldChange}
          />

          {/* Card Brand Logo */}
          {brand && cardLogos[brand] && (
            <div className="flex items-center gap-2 mb-2">
              <img src={cardLogos[brand]} className="w-12 h-8 object-contain" />
            </div>
          )}

          {/* Expiry and CVC */}
          <div className="flex gap-3 mb-10">
            <CardExpiryInput
              form={form}
              setForm={setForm}
              errors={errors}
              expYYRef={expYYRef}
              cvcRef={cvcRef}
              handleExpiryChange={handleExpiryChange} // pass handler to child
              handleFieldChange={handleFieldChange}
            />
            <CVCInput
              form={form}
              setForm={setForm}
              errors={errors}
              cvcRef={cvcRef}
              handleFieldChange={handleFieldChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty} // disabled until form is dirty
              className={`px-5 py-2 rounded text-white transition-all ease-in-out duration-75
                bg-purple-950 hover:opacity-80 ${
                  !isDirty ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
