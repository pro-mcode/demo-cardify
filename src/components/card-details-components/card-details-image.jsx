export default function CardDetailsImage({ card }) {
  function formatCardNumber(number) {
    const cleaned = number.replace(/\D/g, "").slice(0, 16); // only digits
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }
  return (
    <>
      {/* <!-- card container --> */}
      <div className="relative flex-col justify-center items-center h-full md:min-w-[100%] max-w-[20rem] mx-auto mb-6">
        {/* <!-- card logo --> */}
        <img
          srcset="assets/images/card-logo.svg"
          alt=""
          className="absolute flex items-center top-[10%] left-[5%] max-w-12 md:max-w-[4rem]"
        />
        {/* <!-- Front Card Image --> */}
        <img
          src="assets/images/bg-card-front.png"
          alt=""
          className="w-full h-full"
        />
        <img
          srcset="assets/images/bg-card-front.png"
          alt=""
          className="w-full h-full mx-auto"
        />
        {/* <!-- card details --> */}
        <div className="absolute top-[50%] w-full preview">
          <div className="flex justify-center items-center gap-2 mx-auto mb-[5%]">
            <span
              className="text-[#fff] text-sm tracking-widest font-medium font-sans md:text-base text-center"
              id="pv-card"
            >
              {formatCardNumber(card.cardNumber)}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4 text-white px-5 mx-auto">
            <p
              className="text-[#fff] text-[12px] font-medium uppercase lg:text-sm md:tracking-wider"
              id="pv-name"
            >
              {card.cardName}
            </p>
            <p
              className="text-[#fff] text-[12px] tracking-widest font-medium lg:text-sm"
              id="pv-exp"
            >
              {card.expMM}/{card.expYY}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
