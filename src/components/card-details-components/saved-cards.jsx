import { useNavigate } from "react-router";
export default function SavedCards({
  cards,
  cardNicknames,
  cardNicknamesDefault,
  cardLogos,
}) {
  const navigate = useNavigate();

  return (
    <div className="payment-method-wrapper bg-white rounded-3xl p-4 my-8 md:p-6">
      {/* <!-- card details container --> */}
      <div className="max-h-[30rem] overflow-y-scroll">
        {cards.map((card) => (
          <a
            key={card.id}
            onClick={() => navigate(`/CardDashboard/${card.id}`)}
            // onClick={() => navigate("/CardDashboard", { state: card })}
            // key={card.id}
            className="bg-gray-200 flex items-center rounded-3xl p-4 space-x-4 max-h-[20rem] mb-4 hover:shadow-md transition-shadow duration-150 cursor-pointer"
          >
            {/* Card Logos */}
            {card.brand && cardLogos[card.brand] ? (
              <img
                src={cardLogos[card.brand]}
                alt={card.brand}
                className="w-16 h-10 object-contain"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 bg-purple-950 rounded-full"></span>
                <span className="w-5 h-5 border-2 border-purple-950 rounded-full"></span>
              </div>
            )}

            {/* Card details */}
            <div>
              <span className="block text-black text-base font-normal tracking-wide capitalize">
                <span className="font-medium">
                  {cardNicknames[card.id] || cardNicknamesDefault[card.brand]}{" "}
                </span>
                • • • • {card.cardNumber.slice(-4)}
              </span>
              <p className="text-black text-base font-light tracking-wide">
                {card.expMM}/{card.expYY}
              </p>
            </div>
          </a>
        ))}
      </div>
      {/* <!-- card logo --> */}
      <div className="flex items-center gap-2 justify-self-end mt-16">
        <span className="w-8 h-8 bg-purple-950 rounded-full"></span>
        <span className="w-4 h-4 bg-transparent rounded-full border-2 border-purple-950"></span>
        <span className="text-black text-2xl font-medium tracking-wide">
          Pay
        </span>
      </div>
    </div>
  );
}
