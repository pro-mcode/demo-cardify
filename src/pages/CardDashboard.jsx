import { useNavigate, useParams } from "react-router";
// import { useLocation } from "react-router";
import CardDetailsImage from "../components/card-details-components/card-details-image";
import CardDetails from "../components/card-details-components/card-details";

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

  if (!card) return <p>Card not found</p>;

  // const { state: card } = useLocation(); // ← get card from navigate

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* LEFT SIDE BACKGROUND (Desktop Only) */}
      <div className="hidden lg:block fixed left-0 top-0 h-full lg:max-w-[20%]">
        <img
          src="assets/images/bg-main-desktop.png"
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex flex-col justify-center items-start min-h-fit my-12 w-[90%] mx-auto md:max-h-screen md:mt-20 md:mb-10  md:px-4 lg:ml-[20%]">
        {/* <!-- Update payment method pop-up --> */}
        <div
          id="disclaimer"
          className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium z-20 p-8 rounded-md w-[450px] max-w-[95%] md:max-w-[600px] duration-150 transition-all ease-in-out shadow-md hidden"
        >
          {/* <!-- Close icon --> */}
          <div
            id="remove-disclaimer"
            className="flex justify-between items-center"
          >
            <span className="text-black text-lg font-medium">
              Update your payment method
            </span>
            <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"></i>
          </div>
          <div className="flex flex-col space-y-8 my-8">
            {/* <!-- card logo pay --> */}
            <div className="flex items-center gap-2 self-en">
              <span className="w-5 h-5 bg-purple-950 rounded-full"></span>
              <span className="w-3 h-3 bg-transparent rounded-full border-2 border-purple-950"></span>
              <span className="text-black text-base font-normal tracking-wide">
                Democard **** 5678
              </span>
            </div>

            {/* <!-- card details (MM/YY/CVC) --> */}
            <div className="flex justify-start items-center space-x-4 w-full">
              <i className="fa-solid fa-hashtag text-button text-lg"></i>
              <div className="flex justify-start items-center space-x-2">
                <div className="flex flex-col justify-start items-start">
                  <label for="MM" className="text-gray-500 text-sm font-normal">
                    MM
                  </label>
                  <input
                    type="text"
                    id="MM"
                    className="text-black text-base font-normal border-b-2 border-gray-300 outline-none focus:border-b-2 focus:border-b-button max-w-8 h-4"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label
                    for="YY"
                    className="text-gray-500 text-sm font-normal peer-focus:text-button transition-colors"
                  >
                    YY
                  </label>
                  <input
                    type="text"
                    id="YY"
                    maxlength="2"
                    className="peer text-black text-base font-normal border-b-2 border-gray-300 outline-none focus:border-b-button max-w-8 h-4 transition-all"
                  />
                </div>

                <div className="flex flex-col justify-start items-start">
                  <label
                    for="CVC"
                    className="text-gray-500 text-sm font-normal"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="CVC"
                    className="text-black text-base font-normal border-b-2 border-gray-300 outline-none focus:border-b-2 focus:border-b-button max-w-12 h-4"
                  />
                </div>
              </div>
            </div>
            {/* <!-- card name --> */}
            <div className="flex justify-start items-center space-x-4 w-full">
              <i className="fa-solid fa-user text-button text-lg"></i>
              <div className="flex flex-col justify-start items-start w-full">
                <label for="name" className="text-gray-500 text-sm font-normal">
                  Cardholder name
                </label>
                <input
                  type="text"
                  id="name"
                  className="text-black text-base font-normal border-b-2 border-gray-300 outline-none focus:border-b-2 focus:border-b-button w-full h-6"
                />
              </div>
            </div>
            {/* <!-- card number --> */}
            <div className="flex justify-start items-center space-x-4 w-full">
              <i className="fa-solid fa-hashtag text-button text-lg"></i>
              <div className="flex flex-col justify-start items-start w-full">
                <label
                  for="number"
                  className="text-gray-500 text-sm font-normal"
                >
                  Card number
                </label>
                <input
                  type="text"
                  id="number"
                  className="text-black text-base font-normal border-b-2 border-gray-300 outline-none focus:border-b-2 focus:border-b-button w-full h-6"
                />
              </div>
            </div>
          </div>

          {/* <!-- cancel and update buttons --> */}
          <div className="flex justify-end items-center space-x-6">
            <a
              href="#"
              id="remove-disclaimer"
              className="text-button text-sm mt-4 md:mx-0 hover:opacity-75 duration-150 transition-all"
            >
              Cancel
            </a>
            <button
              disabled
              id="remove-disclaimer"
              className="text-sm mx-auto mt-4 bg-purple-950 p-2 px-5 rounded-md md:mx-0 hover:opacity-75 duration-150 transition-all"
            >
              Update
            </button>
          </div>
        </div>

        {/* payment method details */}
        <button
          onClick={() => navigate("/")}
          className="text-black text-lg font-medium text-left md:text-2xl cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left mr-2 font-normal text-lg md:text-2xl"></i>
          Payment method details
        </button>

        <div className="flex flex-col justify-center items-start space-y-2 md:flex-row md:space-y-0 my-8 md:space-x-4 w-full">
          <div className="payment-method-wrapper flex flex-col space-y-4 mb-4 bg-white rounded-3xl px-6 py-6 w-full md:px-6 xl:w-[40%] lg:w-[45%] md:mb-0">
            {/* <!-- card image --> */}
            <CardDetailsImage card={card} />

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
                src="assets/images/transactions_empty_2.svg"
                alt="transaction-empty"
              />
              <span className="text-black text-lg font-normal text-center">
                No transactions to show
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
