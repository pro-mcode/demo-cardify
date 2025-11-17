import { useNavigate } from "react-router";
export default function RemoveCard({
  card,
  nickname,
  cardLogos,
  removeCard,
  setRemoveCardModal,
}) {
  const navigate = useNavigate();
  const handleClose = () => {
    setRemoveCardModal(false);
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
      onClick={handleClose} // click outside closes modal
    >
      <div
        id="disclaimer"
        onClick={(e) => e.stopPropagation()}
        className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium z-20 p-8 rounded-md w-[450px] max-w-[95%] md:max-w-[600px] duration-150 transition-all ease-in-out shadow-md"
      >
        {/* <!-- Close icon --> */}
        <div
          onClick={handleClose}
          id="remove-disclaimer"
          className="flex justify-between items-center"
        >
          <span className="text-black text-lg font-medium">
            Remove payment method
          </span>
          <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"></i>
        </div>
        <div className="flex flex-col space-y-8 my-8">
          <p className="text-gray-500 text-sm font-light">
            <span className="text-gray-700 font-medium">Demo notice: </span>
            <span className="text-gray-600 font-normal tracking-wider capitalize">
              {nickname} • • • • {card.cardNumber.slice(-4)}{" "}
            </span>
            will be removed. This action is part of the demo experience only and
            does not impact any real accounts, payment methods, subscriptions,
            or billing services. All information entered or removed here is for
            demonstration purposes and will not be saved or processed in any
            real transaction.
          </p>

          {/* <!-- card logo pay --> */}
          <div className="flex items-center gap-2">
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
            <span className="text-gray-700 text-sm font-medium tracking-wider capitalize">
              {nickname} • • • • {card.cardNumber.slice(-4)}
            </span>
          </div>
        </div>

        {/* <!-- cancel and update buttons --> */}
        <div className="flex justify-end items-center space-x-6">
          <button
            onClick={handleClose}
            id="remove-disclaimer"
            className="text-button text-sm mt-4 md:mx-0 hover:opacity-75 duration-150 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              removeCard(card.id);
              setRemoveCardModal(false);
              navigate("/");
            }}
            id="remove-disclaimer"
            className="text-sm mx-auto mt-4 bg-purple-950 p-2 px-5 rounded-md md:mx-0 hover:opacity-75 duration-150 transition-all"
          >
            Remove and save
          </button>
        </div>
      </div>
    </div>
  );
}
