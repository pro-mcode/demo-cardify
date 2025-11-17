import cardImage from "../../../public/assets/images/bg-card-front.png";
import cardImageBack from "../../../public/assets/images/bg-card-back.png";
import cardLogo from "../../../public/assets/images/card-logo.svg";

export default function FlipCard({ card, cardLogos }) {
  function formatCardNumber(number) {
    const cleaned = number.replace(/\D/g, "").slice(0, 16); // only digits
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }
  return (
    <>
      <div
        className={`relative flex-col justify-center items-center h-full md:min-w-[100%] max-w-[20rem] mx-auto mb-6 group inline-block 
  hover:shadow-2xl hover:shadow-purple-300/30
  transition-all duration-1000 hover:-translate-y-2`}
        style={{ perspective: 1000 }}
      >
        {/* inner card that will rotate on group hover */}
        <div
          className={
            "relative transition-transform duration-1000 " +
            "[transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)_rotateX(5deg)] duration-1000"
          }
        >
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* card logo  */}
            <img
              src={cardLogo}
              alt=""
              className="absolute top-[10%] left-[5%] max-w-12 md:max-w-[4rem]"
            />

            {/* FRONT face (visible by default) */}
            <img
              src={cardImage}
              alt="front"
              className="w-full h-full md:min-h-[11rem] object-cover rounded-lg"
            />

            {/*  card details */}
            <div className="absolute top-[50%] w-full preview">
              <div className="flex justify-center items-center gap-2 mx-auto mb-[5%]">
                <span
                  className="text-[#fff] text-sm tracking-widest font-medium font-sans md:text-base text-center"
                  id="pv-card"
                >
                  {formatCardNumber(card.cardNumber)}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4 text-white px-5 mx-auto mt-[10%]">
                <p
                  className="text-[#fff] text-[12px] font-medium uppercase xl:text-sm md:tracking-wider"
                  id="pv-name"
                >
                  {card.cardName}
                </p>
                <p
                  className="text-[#fff] text-[12px] tracking-widest font-medium xl:text-sm"
                  id="pv-exp"
                >
                  {card.expMM}/{card.expYY}
                </p>
              </div>
            </div>
          </div>

          {/* BACK face (rotated 180deg so it shows when card is flipped) */}

          {/* BACK face */}
          <div
            className="absolute inset-0 w-full h-full [transform:rotateY(180deg)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={cardImageBack}
              alt="back"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute top-[45%] w-full">
              <div className="flex justify-end items-center gap-2 mx-auto mb-[5%] w-[80%]">
                <span
                  className="text-[#fff] text-xs tracking-widest font-medium pr-3"
                  id="pv-cvc"
                >
                  {card.cvc}
                </span>
              </div>
            </div>
            {/* Card Logos */}
            <div className="absolute left-4 bottom-[15%] ">
              {card.brand && cardLogos[card.brand] ? (
                <img
                  src={cardLogos[card.brand]}
                  alt={card.brand}
                  className="w-16 h-10 object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-950 rounded-full"></span>
                  <span className="w-4 h-4 border-2 border-purple-950 rounded-full"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
