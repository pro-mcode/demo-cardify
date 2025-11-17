import { useState } from "react";
import FormInput from "../components/card-form-components/form-input";
import Complete from "../components/card-form-components/complete";
import DesktopBackground from "../components/card-form-components/desktop-background";
import MobileBackground from "../components/card-form-components/mobile-background";
import CardBackSide from "../components/card-form-components/card-back-side";
import CardFrontSide from "../components/card-form-components/card-front-side";

export default function CardForm({
  cards,
  cardLogos,
  getCardBrand,
  cardNumber,
  setCardNumber,
  brand,
  addCard,
  cardName,
  setCardName,
  expMM,
  setExpMM,
  expYY,
  setExpYY,
  cvc,
  setCvc,
}) {
  const [isSubmited, setIsSubmited] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row max-h-fit">
      {/* LEFT SIDE BACKGROUND (Desktop Only) */}
      <DesktopBackground />

      {/* TOP SIDE BACKGROUND (Mobile Only) */}
      <MobileBackground />

      {/* <!-- Card Back-side Container --> */}
      <CardBackSide cvc={cvc} />
      {/* <!-- Card Front-side Container --> */}
      <CardFrontSide
        cardName={cardName}
        cardNumber={cardNumber}
        expMM={expMM}
        expYY={expYY}
      />

      {/* RIGHT SIDE CONTENT */}
      <div className="payment-method-right-container">
        {/* <!-- Form Container --> */}
        <div className="payment-method-form-container">
          {/* <!-- Form --> */}
          {!isSubmited ? (
            <FormInput
              cardName={cardName}
              setCardName={setCardName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expMM={expMM}
              setExpMM={setExpMM}
              expYY={expYY}
              setExpYY={setExpYY}
              cvc={cvc}
              setCvc={setCvc}
              setIsSubmited={setIsSubmited}
              cards={cards}
              cardLogos={cardLogos}
              brand={brand}
              getCardBrand={getCardBrand}
              addCard={addCard}
              //   setCardBrand={setCardBrand}
            />
          ) : (
            <Complete />
          )}
        </div>
      </div>
    </div>
  );
}
