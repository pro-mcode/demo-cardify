import { useNavigate, useParams } from "react-router";
// import { useLocation } from "react-router";
import CardDetailsImage from "../components/card-details-components/card-details-image";
import CardDetails from "../components/card-details-components/card-details";
import Footer from "../components/footer";
import notrans from "../../src/assets/images/transactions_empty_2.svg";
import bgDesktop from "../../src/assets/images/bg-main-desktop.png";

export default function CardDashboard({
  // updateCard,
  cards,
  cardLogos,
  cardNicknames,
  cardNicknamesDefault,
  updateNickname,
  removeCard,
  updateCard,
}) {
  const navigate = useNavigate();

  const { cardId } = useParams();

  // Find the latest card from App.js state
  const card = cards.find((c) => c.id === cardId);

  // if (!card) return <p>Card not found</p>;

  // const { state: card } = useLocation(); // ← get card from navigate

  return (
    <div className="flex flex-col lg:flex-row">
      <title>Card Dashboard</title>
      {/* LEFT SIDE BACKGROUND (Desktop Only) */}
      <div className="hidden lg:block absolute left-0 top-0 h-screen lg:w-[20%]">
        <img
          src={bgDesktop}
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex flex-col items-start pt-12 w-[90%] mx-auto md:py-12 md:px-4 lg:ml-[20%]  md:h-screen md:overflow-auto md:scrollbar-none custom-scroll justify-between">
        <div className="w-full">
          {/* payment method details */}
          <button
            onClick={() => navigate("/")}
            className="text-black text-lg font-medium text-left md:text-2xl cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left mr-2 text-lg md:text-2xl"></i>
            Payment method details
          </button>

          <div className="flex flex-col justify-center items-start space-y-2 md:flex-row md:space-y-0 my-8 md:space-x-4 w-full">
            <div className="payment-method-wrapper flex flex-col space-y-4 mb-4 bg-white rounded-3xl px-6 py-6 w-full md:px-6 xl:w-[40%] lg:w-[45%] md:mb-0">
              {/* <!-- card image --> */}
              <CardDetailsImage card={card} cardLogos={cardLogos} />

              {/* Card details info */}
              <CardDetails
                card={card}
                cardLogos={cardLogos}
                cardNicknames={cardNicknames}
                cardNicknamesDefault={cardNicknamesDefault}
                updateNickname={updateNickname}
                removeCard={removeCard}
                updateCard={updateCard}
              />

              {/* <!-- card logo pay --> */}
              <div className="flex items-center gap-2 justify-self-end self-end">
                <span className="w-8 h-8 bg-purple-950 rounded-full"></span>
                <span className="w-4 h-4 bg-transparent rounded-full border-2 border-purple-950"></span>
                <span className="text-black text-2xl font-medium tracking-wide">
                  Pay
                </span>
              </div>
            </div>

            <div className="payment-method-wrapper bg-white rounded-3xl p-4 space-y-4 w-full md:p-6 xl:w-[60%] lg:w-[55%]">
              {/* <!-- card details container --> */}
              <div className="flex flex-col justify-center items-center space-y-4 card-details-container py-10 md:mb-0">
                <img
                  src={notrans}
                  // src="assets/images/transactions_empty_2.svg"
                  alt="transaction-empty"
                />
                <span className="text-black text-lg font-normal text-center">
                  No transactions to show
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
