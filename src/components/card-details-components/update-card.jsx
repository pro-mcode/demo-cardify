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

  // Detects card provider
  const detectBrand = (number) => {
    const n = number.replace(/\D/g, "");
    if (/^4/.test(n)) return "visa"; // Visa starts with 4
    if (/^5[1-5]/.test(n)) return "mastercard"; // Mastercard 51-55
    if (/^3[47]/.test(n)) return "amex"; // American Express 34 or 37
    if (/^6(?:011|5)/.test(n)) return "discover"; // Discover 6011 or 65
    if (/^5078/.test(n)) return "verve"; // Verve starts with 5078
    return "unknown";
  };
  const brand = detectBrand(form.cardNumber);

  // VALIDATION FUNCTIONS
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

  // HANDLE EXPIRY CHANGE
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

  // SUBMIT
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
