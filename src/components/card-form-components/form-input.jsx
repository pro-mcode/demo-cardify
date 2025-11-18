// import { useRef, useState } from "react";
// import dayjs from "dayjs";
// import Disclaimer from "./disclaimer";

// export default function FormInput({
//   setIsSubmited,
//   cardName,
//   setCardName,
//   cardNumber,
//   setCardNumber,
//   expMM,
//   setExpMM,
//   expYY,
//   setExpYY,
//   cvc,
//   setCvc,
//   cardLogos,
//   brand,
//   getCardBrand,
//   addCard,
// }) {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [nameLength, setNameLength] = useState(0);

//   const expMMRef = useRef(null);
//   const expYYRef = useRef(null);
//   const cvcRef = useRef(null);

//   const formatCardNumber = (value) => {
//     return value
//       .replace(/\D/g, "") // remove non-digits
//       .replace(/(.{4})/g, "$1 ") // add space every 4 digits
//       .trim(); // remove last space
//   };

//   const handleClose = () => {
//     setShowDisclaimer(false);
//   };

//   // Mask card number to **** **** **** 1234
//   // const maskCardNumber = (number) => {
//   //   const cleaned = number.replace(/\D/g, "");
//   //   const last4 = cleaned.slice(-4);
//   //   return "**** **** " + last4;
//   // };

//   const validateField = (name, value, allValues = {}) => {
//     const { expMM, expYY } = allValues;
//     let msg = "";

//     switch (name) {
//       case "cardName":
//         if (!value.trim()) msg = "Cardholder name is required";
//         break;

//       case "cardNumber": {
//         const digits = value.replace(/\D/g, "");
//         if (digits.length < 16) msg = "Card number must be 16 digits";
//         break;
//       }

//       // case "expMM": {
//       //   const month = Number(value); // convert to number

//       //   if (!value) {
//       //     msg = "Expiry month is required";
//       //   } else if (value.length !== 2) {
//       //     msg = "Month must be 2 digits";
//       //   } else if (month < 1 || month > 12) {
//       //     msg = "Invalid month (01–12)";
//       //   } else if (month && expYY) {
//       //     // Check if expired using Day.js
//       //     const isExpired = dayjs().isAfter(
//       //       dayjs(`20${expYY}-${value}-01`, "YYYY-MM-DD"),
//       //       "month"
//       //     );
//       //     if (isExpired) msg = "Card has expired";
//       //   }

//       //   break;
//       // }

//       // case "expYY": {
//       //   if (!value) msg = "Expiry year is required";
//       //   else if (value.length < 2) msg = "Invalid year";
//       //   else if (expMM) {
//       //     const cardDate = dayjs(`20${value}-${expMM}-01`);
//       //     const now = dayjs().startOf("month");
//       //     if (cardDate.isBefore(now)) msg = "Card has expired";
//       //   }
//       //   break;
//       // }

//       const { expMM, expYY } = form;

//       switch (name) {
//         case "expMM": {
//           const month = Number(value);

//           if (!value) msg = "Expiry month is required";
//           else if (value.length !== 2) msg = "Month must be 2 digits";
//           else if (month < 1 || month > 12) msg = "Invalid month (01–12)";
//           else if (expYY) {
//             const cardDate = dayjs(`20${expYY}-${value}-01`);
//             const now = dayjs().startOf("month");
//             if (cardDate.isBefore(now)) msg = "Card has expired";
//           }
//           break;
//         }

//         case "expYY": {
//           if (!value) msg = "Expiry year is required";
//           else if (value.length !== 2) msg = "Invalid year";
//           else if (expMM) {
//             const cardDate = dayjs(`20${value}-${expMM}-01`);
//             const now = dayjs().startOf("month");
//             if (cardDate.isBefore(now)) msg = "Card has expired";
//           }
//           break;
//         }

//       case "cvc":
//         if (value.length < 3) msg = "CVC must be 3 digits";
//         break;
//     }

//     // store error for immediate UI feedback
//     setErrors((prev) => ({ ...prev, [name]: msg }));

//     // return message for synchronous validation
//     return msg;
//   };

//   const handleChange = (name, value) => {
//     setForm((prev) => ({ ...prev, [name]: value }));

//     setErrors((prev) => ({
//       ...prev,
//       expMM: validateField("expMM", name === "expMM" ? value : prev.expMM, {
//         ...form,
//         [name]: value,
//       }),
//       expYY: validateField("expYY", name === "expYY" ? value : prev.expYY, {
//         ...form,
//         [name]: value,
//       }),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Build fresh error object locally
//     const newErrs = {};

//     newErrs.cardName =
//       validateField("cardName", cardName, { expMM, expYY }) || "";
//     newErrs.cardNumber =
//       validateField("cardNumber", cardNumber, { expMM, expYY }) || "";
//     newErrs.expMM = validateField("expMM", expMM, { expMM, expYY }) || "";
//     newErrs.expYY = validateField("expYY", expYY, { expMM, expYY }) || "";
//     newErrs.cvc = validateField("cvc", cvc, { expMM, expYY }) || "";

//     // Update UI with errors
//     setErrors(newErrs);

//     // ❗ STOP if ANY validation failed
//     if (Object.values(newErrs).some((msg) => msg)) return;

//     const newCard = {
//       id: crypto.randomUUID(),
//       cardName,
//       cardNumber,
//       // cardNumber: maskedNumber,
//       expMM,
//       expYY,
//       brand: getCardBrand(cardNumber),
//     };

//     const existing = JSON.parse(localStorage.getItem("cards")) || [];
//     const updated = [...existing, newCard];
//     localStorage.setItem("cards", JSON.stringify(updated));

//     addCard(newCard);

//     setCardName("");
//     setCardNumber("");
//     setExpMM("");
//     setExpYY("");
//     setCvc("");
//     setErrors({});

//     setIsSubmited(true);
//   };

//   return (
//     <>
//       {/* <Disclaimer showDisclaimer={showDisclaimer} /> */}
//       {showDisclaimer && <Disclaimer onClose={handleClose} />}

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-[90%] translate-y-[0%] md:translate-y-[0] pb-12 md:pb-0"
//         id="cardForm"
//       >
//         <label
//           htmlFor="card-holder"
//           className="text-xs text-primary font-medium tracking-widest uppercase cursor-pointer"
//         >
//           Cardholder name
//         </label>
//         <div className="relative">
//           <input
//             required
//             id="card-holder"
//             type="text"
//             value={cardName}
//             onChange={(e) => {
//               const val = e.target.value;
//               setCardName(val);
//               setNameLength(val.length); // update length
//               validateField("cardName", val);
//             }}
//             placeholder="Adedamola Maxwell"
//             maxLength={20}
//             className="w-full text-base p-2 mt-2 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//           />
//           {nameLength > 0 && (
//             <p className="absolute top-[50%] translate-y-[-50%] mt-1 right-4 text-sm text-gray-500">
//               {nameLength}/20
//             </p>
//           )}
//         </div>
//         <p className="text-error text-sm mb-2">{errors.cardName}</p>

//         <label
//           htmlFor="card-number"
//           className="text-xs text-primary font-medium tracking-widest uppercase cursor-pointer"
//         >
//           Card number
//         </label>
//         <div className="relative">
//           <input
//             required
//             id="card-number"
//             type="text"
//             value={cardNumber}
//             onChange={(e) => {
//               const val = formatCardNumber(e.target.value);
//               setCardNumber(val);
//               validateField("cardNumber", val);
//             }}
//             inputMode="numeric"
//             autoComplete="cc-number"
//             maxLength={19}
//             placeholder="1234 5678 9012 3456"
//             className="w-full text-base p-2 mt-2 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//           />
//           <div className="absolute inset-y-0 right-2 flex items-center">
//             {cardLogos[brand] && (
//               <img
//                 src={cardLogos[brand]}
//                 alt={brand}
//                 className="h-6 w-14 object-contain mt-2"
//               />
//             )}
//           </div>
//         </div>
//         <p className="text-error text-sm mb-2">{errors.cardNumber}</p>

//         <div className="flex w-fll gap-2 md:max-w-">
//           {/* <!-- Exp. Date --> */}
//           <div className="flex-1">
//             <div className="flex gap-2">
//               <div className="">
//                 <label
//                   htmlFor="expMM"
//                   className="text-xs text-primary font-medium tracking-widest uppercase cursor-pointer"
//                 >
//                   Exp. (MM)
//                 </label>
//                 <input
//                   required
//                   id="expMM"
//                   type="text"
//                   value={expMM}
//                   onChange={(e) => {
//                     const val = e.target.value.replace(/\D/g, "").slice(0, 2);
//                     setExpMM(val);
//                     validateField("expMM", val, { expMM: val, expYY });

//                     if (val.length === 2) expYYRef.current.focus();
//                   }}
//                   ref={expMMRef}
//                   inputMode="numeric"
//                   placeholder="MM"
//                   maxLength={2}
//                   className="w-full text-base p-2 mt-2 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//                 />
//                 <p className="text-error text-sm mb-2">{errors.expMM}</p>
//               </div>
//               <div className="relative">
//                 <label
//                   htmlFor="expYY"
//                   className="text-xs text-primary font-medium tracking-widest uppercase cursor-pointer"
//                 >
//                   Exp. (YY)
//                 </label>
//                 <input
//                   id="expYY"
//                   type="text"
//                   value={expYY}
//                   onChange={(e) => {
//                     setExpYY(e.target.value);
//                     validateField("expYY", e.target.value, {
//                       expMM,
//                       expYY: e.target.value,
//                     });

//                     if (e.target.value.length === 2) cvcRef.current.focus();
//                   }}
//                   ref={expYYRef}
//                   inputMode="numeric"
//                   placeholder="YY"
//                   maxLength={2}
//                   className="w-full text-base p-2 mt-2 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//                 />
//                 <p className="text-error text-sm mb-2">{errors.expYY}</p>
//               </div>
//             </div>
//           </div>

//           {/* <!-- CVC --> */}
//           <div className="flex-1">
//             <label
//               htmlFor="cvc"
//               className="text-xs text-primary font-medium tracking-widest uppercase cursor-pointer"
//             >
//               CVC
//             </label>
//             <input
//               required
//               id="cvc"
//               type="text"
//               value={cvc}
//               onChange={(e) => {
//                 setCvc(e.target.value.replace(/\D/g, ""));
//                 validateField("cvc", e.target.value);
//               }}
//               ref={cvcRef}
//               inputMode="numeric"
//               maxLength={4}
//               className="w-full text-base p-2 mt-2 rounded-lg border-[1.5px] border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box] focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box] outline-none"
//               placeholder="e.g 123"
//             />
//             <p className="text-error text-sm mb-2">{errors.cvc}</p>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="bg-primary text-white font-medium tracking-wide w-full rounded-md shadow-md py-2 px-4 text-center outline-none hover:opacity-80 mt-8 transition-all duration-300"
//           id="nextBtn"
//         >
//           Confirm
//         </button>
//       </form>
//     </>
//   );
// }

// import { useState, useRef } from "react";
// import dayjs from "dayjs";
// import Disclaimer from "./disclaimer";

// export default function FormInput({
//   setIsSubmited,
//   cardName,
//   setCardName,
//   cardNumber,
//   setCardNumber,
//   expMM,
//   setExpMM,
//   expYY,
//   setExpYY,
//   cvc,
//   setCvc,
//   cardLogos,
//   brand,
//   getCardBrand,
//   addCard,
// }) {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [nameLength, setNameLength] = useState(0);

//   const expYYRef = useRef(null);
//   const cvcRef = useRef(null);

//   const formatCardNumber = (value) =>
//     value
//       .replace(/\D/g, "")
//       .replace(/(.{4})/g, "$1 ")
//       .trim();

//   const handleClose = () => setShowDisclaimer(false);

//   // ✅ Validate expiry month + year together
//   const validateExpiry = (month, year) => {
//     const errs = { expMM: "", expYY: "" };
//     const m = Number(month);
//     // const y = Number(year);

//     if (!month) errs.expMM = "Expiry month is required";
//     else if (month.length !== 2) errs.expMM = "Month must be 2 digits";
//     else if (m < 1 || m > 12) errs.expMM = "Invalid month (01–12)";

//     if (!year) errs.expYY = "Expiry year is required";
//     else if (year.length !== 2) errs.expYY = "Invalid year";

//     if (!errs.expMM && !errs.expYY) {
//       const cardDate = dayjs(`20${year}-${month}-01`);
//       const now = dayjs().startOf("month");
//       if (cardDate.isBefore(now)) {
//         errs.expMM = errs.expYY = "Card has expired";
//       }
//     }

//     return errs;
//   };

//   const validateField = (name, value) => {
//     let msg = "";

//     switch (name) {
//       case "cardName":
//         if (!value.trim()) msg = "Cardholder name is required";
//         break;
//       case "cardNumber":
//         if (value.replace(/\D/g, "").length < 16)
//           msg = "Card number must be 16 digits";
//         break;
//       case "cvc":
//         if (value.length < 3) msg = "CVC must be 3 digits";
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [name]: msg }));
//     return msg;
//   };

//   // Handle expiry input changes
//   const handleExpiryChange = (name, value) => {
//     value = value.replace(/\D/g, "").slice(0, 2);

//     if (name === "expMM") setExpMM(value);
//     if (name === "expYY") setExpYY(value);

//     const newErrors = validateExpiry(
//       name === "expMM" ? value : expMM,
//       name === "expYY" ? value : expYY
//     );
//     setErrors((prev) => ({ ...prev, ...newErrors }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {
//       cardName: validateField("cardName", cardName) || "",
//       cardNumber: validateField("cardNumber", cardNumber) || "",
//       cvc: validateField("cvc", cvc) || "",
//       ...validateExpiry(expMM, expYY),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some((msg) => msg)) return;

//     const newCard = {
//       id: crypto.randomUUID(),
//       cardName,
//       cardNumber,
//       expMM,
//       expYY,
//       brand: getCardBrand(cardNumber),
//     };

//     const existing = JSON.parse(localStorage.getItem("cards")) || [];
//     const updated = [...existing, newCard];
//     localStorage.setItem("cards", JSON.stringify(updated));

//     addCard(newCard);

//     setCardName("");
//     setCardNumber("");
//     setExpMM("");
//     setExpYY("");
//     setCvc("");
//     setErrors({});
//     setIsSubmited(true);
//   };

//   return (
//     <>
//       {showDisclaimer && <Disclaimer onClose={handleClose} />}
//       <form onSubmit={handleSubmit} className="max-w-[90%] pb-12">
//         {/* Cardholder Name */}
//         <label htmlFor="card-holder" className="text-xs font-medium uppercase">
//           Cardholder name
//         </label>
//         <div className="relative">
//           <input
//             id="card-holder"
//             type="text"
//             value={cardName}
//             onChange={(e) => {
//               setCardName(e.target.value);
//               setNameLength(e.target.value.length);
//               validateField("cardName", e.target.value);
//             }}
//             placeholder="Adedamola Maxwell"
//             maxLength={20}
//             className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//             ${
//               errors.cardName
//                 ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                 : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//             }
//             focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//           `}
//           />
//           {nameLength > 0 && (
//             <p className="absolute top-[50%] translate-y-[-50%] right-2 text-sm text-gray-500">
//               {nameLength}/20
//             </p>
//           )}
//         </div>
//         <p className="text-error text-sm">{errors.cardName}</p>

//         {/* Card Number */}
//         <label
//           htmlFor="card-number"
//           className="text-xs font-medium uppercase mt-4 block"
//         >
//           Card number
//         </label>
//         <div className="relative">
//           <input
//             id="card-number"
//             type="text"
//             value={cardNumber}
//             onChange={(e) => {
//               const val = formatCardNumber(e.target.value);
//               setCardNumber(val);
//               validateField("cardNumber", val);
//             }}
//             placeholder="1234 5678 9012 3456"
//             maxLength={19}
//             className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//               ${
//                 errors.cardNumber
//                   ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                   : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//               }
//               focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//             `}
//           />
//           {cardLogos[brand] && (
//             <img
//               src={cardLogos[brand]}
//               alt={brand}
//               className="h-6 w-14 object-contain absolute right-2 top-[50%] translate-y-[-50%]"
//             />
//           )}
//         </div>
//         <p className="text-error text-sm">{errors.cardNumber}</p>

//         {/* Expiry and CVC */}
//         <div className="flex gap-2 mt-4">
//           <div className="flex-1">
//             <label htmlFor="expMM" className="text-xs font-medium uppercase">
//               Exp. (MM)
//             </label>
//             <input
//               id="expMM"
//               type="text"
//               value={expMM}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "").slice(0, 2);
//                 handleExpiryChange("expMM", val);
//                 {
//                   val.length === 2 && expYYRef.current.focus();
//                 }
//               }}
//               maxLength={2}
//               className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//                 ${
//                   errors.expMM
//                     ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                     : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//                 }
//                 focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//               `}
//             />
//             <p className="text-error text-xs">{errors.expMM}</p>
//           </div>

//           <div className="flex-1">
//             <label htmlFor="expYY" className="text-xs font-medium uppercase">
//               Exp. (YY)
//             </label>
//             <input
//               id="expYY"
//               type="text"
//               value={expYY}
//               ref={expYYRef}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "").slice(0, 2);

//                 // Update the field in form state
//                 setExpYY(val);

//                 // Validate the field and set error
//                 const errorMsg = validateField("expYY", val, {
//                   expMM,
//                   expYY: val,
//                 });

//                 // Only focus next input if valid
//                 if (!errorMsg && val.length === 2) {
//                   cvcRef.current.focus();
//                 }

//                 // Update your form object inside handleExpiryChange if needed
//                 handleExpiryChange("expYY", val); // Pass the processed value
//               }}
//               maxLength={2}
//               className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//                 ${
//                   errors.expYY
//                     ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                     : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//                 }
//                 focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//               `}
//             />
//             <p className="text-error text-xs">{errors.expYY}</p>
//           </div>

//           {/* CVC */}
//           <div className="flex-1">
//             <label htmlFor="cvc" className="text-xs font-medium uppercase">
//               CVC
//             </label>
//             <input
//               id="cvc"
//               type="text"
//               value={cvc}
//               ref={cvcRef}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "");
//                 setCvc(val);
//                 validateField("cvc", val);
//               }}
//               maxLength={4}
//               className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
//                 ${
//                   errors.cvc
//                     ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
//                     : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
//                 }
//                 focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
//               `}
//               placeholder="123"
//             />
//             <p className="text-error text-xs">{errors.cvc}</p>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full bg-primary text-white py-2 rounded-md"
//         >
//           Confirm
//         </button>
//       </form>
//     </>
//   );
// }

import { useState, useRef } from "react";
import dayjs from "dayjs";
import Disclaimer from "./disclaimer";

export default function FormInput({
  setIsSubmited,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expMM,
  setExpMM,
  expYY,
  setExpYY,
  cvc,
  setCvc,
  cardLogos,
  brand,
  getCardBrand,
  addCard,
}) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [errors, setErrors] = useState({});
  const [nameLength, setNameLength] = useState(0);

  const expYYRef = useRef(null);
  const cvcRef = useRef(null);

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const handleClose = () => setShowDisclaimer(false);

  // Validate expiry month + year together
  const validateExpiry = (month, year) => {
    const errs = { expMM: "", expYY: "" };
    const m = Number(month);

    if (!month) errs.expMM = "Expiry month is required";
    else if (month.length !== 2) errs.expMM = "Month must be 2 digits";
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
        if (value.replace(/\D/g, "").length < 16)
          msg = "Card number must be 16 digits";
        break;
      case "cvc":
        if (value.length < 3) msg = "CVC must be 3 digits";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg;
  };

  // Handle expiry input changes
  const handleExpiryChange = (name, value) => {
    value = value.replace(/\D/g, "").slice(0, 2);

    if (name === "expMM") setExpMM(value);
    if (name === "expYY") setExpYY(value);

    const newErrors = validateExpiry(
      name === "expMM" ? value : expMM,
      name === "expYY" ? value : expYY
    );
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      cardName: validateField("cardName", cardName) || "",
      cardNumber: validateField("cardNumber", cardNumber) || "",
      cvc: validateField("cvc", cvc) || "",
      ...validateExpiry(expMM, expYY),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg)) return;

    const newCard = {
      id: crypto.randomUUID(),
      cardName,
      cardNumber,
      expMM,
      expYY,
      cvc,
      brand: getCardBrand(cardNumber),
    };

    const existing = JSON.parse(localStorage.getItem("cards")) || [];
    const updated = [newCard, ...existing];
    localStorage.setItem("cards", JSON.stringify(updated));

    addCard(newCard);

    setCardName("");
    setCardNumber("");
    setExpMM("");
    setExpYY("");
    setCvc("");
    setErrors({});
    setIsSubmited(true);
  };

  return (
    <>
      {showDisclaimer && <Disclaimer onClose={handleClose} />}
      <form onSubmit={handleSubmit} className="max-w-[90%] pb-12">
        {/* Cardholder Name */}
        <label htmlFor="card-holder" className="text-xs font-medium uppercase">
          Cardholder name
        </label>
        <div className="relative">
          <input
            id="card-holder"
            type="text"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
              setNameLength(e.target.value.length);
              validateField("cardName", e.target.value);
            }}
            placeholder="Adedamola Maxwell"
            maxLength={20}
            className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
            ${
              errors.cardName
                ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
            }
            focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
          `}
          />
          {nameLength > 0 && (
            <p className="absolute top-[50%] translate-y-[-50%] right-2 text-sm text-gray-500">
              {nameLength}/20
            </p>
          )}
        </div>
        <p className="text-error text-sm">{errors.cardName}</p>

        {/* Card Number */}
        <label
          htmlFor="card-number"
          className="text-xs font-medium uppercase mt-4 block mb-[2px]"
        >
          Card number
        </label>
        <div className="relative">
          <input
            id="card-number"
            type="text"
            value={cardNumber}
            onChange={(e) => {
              const val = formatCardNumber(e.target.value);
              setCardNumber(val);
              validateField("cardNumber", val);
            }}
            placeholder="1234 5678 9000 0000"
            maxLength={19}
            className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
              ${
                errors.cardNumber
                  ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                  : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
              }
              focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
            `}
          />
          {cardLogos[brand] && (
            <img
              src={cardLogos[brand]}
              alt={brand}
              className="h-6 w-14 object-contain absolute right-2 top-[50%] translate-y-[-50%]"
            />
          )}
        </div>
        <p className="text-error text-sm">{errors.cardNumber}</p>

        {/* Expiry and CVC */}
        <div className="flex gap-2 mt-4">
          {/* Expiry Month */}
          <div className="flex-1">
            <label htmlFor="expMM" className="text-xs font-medium uppercase">
              Exp. (MM)
            </label>
            <input
              id="expMM"
              type="text"
              placeholder="01"
              value={expMM}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 2);

                // Update and validate
                handleExpiryChange("expMM", val);

                // Only focus next field if no error
                const errs = validateExpiry(val, expYY);
                if (!errs.expMM && val.length === 2) {
                  expYYRef.current.focus();
                }
              }}
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
            <p className="text-error text-xs">{errors.expMM}</p>
          </div>

          {/* Expiry Year */}
          <div className="flex-1">
            <label htmlFor="expYY" className="text-xs font-medium uppercase">
              Exp. (YY)
            </label>
            <input
              id="expYY"
              type="text"
              placeholder="28"
              value={expYY}
              ref={expYYRef}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 2);

                handleExpiryChange("expYY", val);

                // Only focus CVC if valid
                const errs = validateExpiry(expMM, val);
                if (!errs.expYY && val.length === 2) {
                  cvcRef.current.focus();
                }
              }}
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
            <p className="text-error text-xs">{errors.expYY}</p>
          </div>

          {/* CVC */}
          <div className="flex-1">
            <label htmlFor="cvc" className="text-xs font-medium uppercase">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              value={cvc}
              ref={cvcRef}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setCvc(val);
                validateField("cvc", val);
              }}
              maxLength={4}
              className={`w-full text-base p-2 rounded-lg border-[1.5px] outline-none border-transparent
                ${
                  errors.cvc
                    ? "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,red,red)_border-box]"
                    : "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#d1d5db,#d1d5db)_border-box]"
                }
                focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(249,99%,64%),hsl(278,94%,30%))_border-box]
              `}
              placeholder="123"
            />
            <p className="text-error text-xs">{errors.cvc}</p>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-primary text-white py-2 rounded-md"
        >
          Confirm
        </button>
      </form>
    </>
  );
}
