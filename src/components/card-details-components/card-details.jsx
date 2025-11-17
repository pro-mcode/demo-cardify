import { useState } from "react";
import NickNameModal from "./nickname-modal";
import Feedback from "./feedback";
import RemoveCard from "./remove-card";
import UpdateCard from "./update-card";

export default function CardDetails({
  card,
  cardLogos,
  cardNicknames,
  cardNicknamesDefault,
  updateNickname,
  removeCard,
  updateCard,
}) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [removeCardModal, setRemoveCardModal] = useState(false);
  const [feedback, setFeedback] = useState(false);

  // Use custom nickname if exists, otherwise default brand nickname
  const [nickname, setNickname] = useState(
    cardNicknames[card.id] || cardNicknamesDefault[card.brand] || "Democard"
  );

  if (!card) return null; // <-- prevents crash

  console.log(card);
  return (
    <div className="card-extra-details pb-20">
      {showNicknameModal && (
        <NickNameModal
          card={card}
          nickname={nickname}
          setNickname={setNickname}
          setShowNicknameModal={setShowNicknameModal}
          saveNickname={() => {
            updateNickname(card.id, nickname);
            setShowNicknameModal(false);
          }}
        />
      )}
      {feedback && <Feedback setFeedback={setFeedback} />}
      {removeCardModal && (
        <RemoveCard
          card={card}
          cardLogos={cardLogos}
          nickname={nickname}
          setRemoveCardModal={setRemoveCardModal}
          removeCard={removeCard}
        />
      )}
      {showUpdateModal && (
        <UpdateCard
          card={card}
          cardLogos={cardLogos}
          nickname={nickname}
          updateCard={updateCard}
          setShowUpdateModal={setShowUpdateModal}
          cardNicknamesDefault={cardNicknamesDefault}
        />
      )}

      <div key={card.id}>
        <h3 className="text-black text-lg font-medium text-left tracking-wider md:text-2xl capitalize">
          {cardNicknames[card.id] || cardNicknamesDefault[card.brand]} • • • •{" "}
          {card.cardNumber.slice(-4)}
        </h3>
        <p className="text-black text-base font-light text-left tracking-wide">
          Expires {card.expMM}/{card.expYY}
        </p>
      </div>
      {/* <!-- Edit & remove card buttons --> */}
      <div className="flex justify-start items-center space-x-4 mt-4">
        <button
          onClick={() => setShowUpdateModal(true)}
          className="border border-black rounded-full bg-transparent px-7 py-2 text-button text-sm hover:bg-button/10 transition-all ease-in-out duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => setRemoveCardModal(true)}
          className="border border-black rounded-full bg-transparent px-7 py-2 text-button text-sm hover:bg-button/10 transition-all ease-in-out duration-150"
        >
          Remove
        </button>
      </div>
      {/* <!-- Add nickname button --> */}
      <div
        onClick={() => setShowNicknameModal(true)}
        className="flex justify-start items-center space-x-4 mt-10 px-6 py-4 -mx-6 hover:bg-gray-200 duration-150 transition-all ease-in-out cursor-pointer"
      >
        <i className="fa-regular fa-pen-to-square"></i>
        <span className="text-black text-base font-medium">Edit nickname</span>
      </div>
      {/* <!-- Share feedback button --> */}
      <div
        onClick={() => setFeedback(true)}
        className="flex justify-start items-center space-x-4 px-6 py-4 -mx-6 hover:bg-gray-200 duration-150 transition-all ease-in-out cursor-pointer"
      >
        <i className="fa-regular fa-message"></i>
        <span className="text-black text-base font-medium">Share feedback</span>
      </div>
    </div>
  );
}
