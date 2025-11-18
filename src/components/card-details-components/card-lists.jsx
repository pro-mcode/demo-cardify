import React, { useState } from "react";
import PaymentMethodModal from "./payment-method-modal";
import SavedCards from "./saved-cards";
export default function CardLists({
  cards,
  cardNicknames,
  cardNicknamesDefault,
  cardLogos,
  brand,
}) {
  // Add payment method modal
  const [method, setMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Add payment method modal close
  const handleClose = () => {
    setMethod(false);
    setSelectedMethod(null); // reset selection when modal closes
  };
  return (
    <div className="relative flex flex-col w-[90%] my-12 mx-auto md:my-20 md:max-w-[100%]">
      <title>Payment Methods</title>
      {/* Pass show & onClose */}
      <PaymentMethodModal
        show={method}
        onClose={handleClose}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
      <h3 className="text-black text-2xl font-medium text-left">
        Payment Methods
      </h3>
      <p className="text-black text-base font-light text-left my-4">
        Add, view and manage demo payment methods that can be tested with Demo
        Pay.
      </p>
      <a
        onClick={() => setMethod(true)}
        className="py-2 px-5 rounded-full bg-btton text-white max-w-fit payment-btn cursor-pointer"
      >
        <i className="fa-solid fa-plus mr-2 text-base font-light"></i> Add
        payment method
      </a>
      <SavedCards
        cards={cards}
        cardNicknames={cardNicknames}
        cardNicknamesDefault={cardNicknamesDefault}
        cardLogos={cardLogos}
        brand={brand}
      />
    </div>
  );
}
