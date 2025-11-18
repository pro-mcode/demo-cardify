// export default function NickNameModal({
//   setNickname,
//   setShowNicknameModal,
//   nickname,
//   cardNicknames,
// }) {
//   return (
//     <div
//       id="disclaimer"
//       className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium z-20 p-8 rounded-3xl w-[480px] max-w-full md:max-w-[600px] duration-150 transition-all ease-in-out shadow-md"
//     >
//       {/* <!-- text and input container --> */}
//       <div
//         id="remove-disclaimer"
//         className="flex flex-col justify-center items-center"
//       >
//         <i className="fa-solid fa-user-pen text-button text-2xl mb-4"></i>
//         <span className="text-black text-lg font-medium tracking-wide md:text-2xl">
//           Create a nickname
//         </span>
//         <p className="text-black opacity-60 text-base font-light">
//           Democard **** 5657
//         </p>
//         <input
//           type="text"
//           maxlength="25"
//           onChange={(e) => setNickname(e.target.value)}
//           className="text-black text-base font-normal border border-button rounded-md w-full h-12 mt-4 mb-1 px-2 outline-none"
//         />
//         <span className="text-black text-sm font-light self-end mb-4">
//           0/25
//         </span>
//       </div>
//       {/* <!-- cancel and save buttons --> */}
//       <div className="flex justify-end items-center space-x-1">
//         <a
//           onClick={() => setShowNicknameModal(false)}
//           id="remove-disclaimer"
//           className="text-button text-sm mt-4 p-2 px-5 rounded-full md:mx-0 hover:bg-button/10 duration-150 transition-all"
//         >
//           Cancel
//         </a>
//         <button
//           disabled
//           onClick={() => {
//             cardNicknames[card.brand] = nickname;
//             setShowNicknameModal(false);
//           }}
//           id="remove-disclaimer"
//           className="text-button text-sm mt-4 p-2 px-5 rounded-full md:mx-0 hover:bg-button/10 duration-150 transition-all"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function NickNameModal({
//   nickname,
//   setNickname,
//   setShowNicknameModal,
//   card,
//   updateNickname,
// }) {
//   return (
//     <div
//       id="disclaimer"
//       className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-medium z-20 p-8 rounded-3xl w-[480px] max-w-full shadow-md"
//     >
//       {/* text + input */}
//       <div className="flex flex-col justify-center items-center">
//         <i className="fa-solid fa-user-pen text-button text-2xl mb-4"></i>

//         <span className="text-black text-lg font-medium tracking-wide md:text-2xl">
//           Create a nickname
//         </span>

//         <p className="text-black opacity-60 text-base font-light">
//           {cardNicknames[card.brand]} **** {card.cardNumber.slice(-4)}
//         </p>

//         <input
//           type="text"
//           maxLength="25"
//           value={nickname}
//           onChange={(e) => setNickname(e.target.value)}
//           className="text-black border border-button rounded-md w-full h-12 mt-4 mb-1 px-2 outline-none"
//         />

//         <span className="text-black text-sm font-light self-end mb-4">
//           {nickname.length}/25
//         </span>
//       </div>

//       {/* cancel + save */}
//       <div className="flex justify-end items-center space-x-1">
//         <a
//           onClick={() => setShowNicknameModal(false)}
//           className="text-button text-sm mt-4 p-2 px-5 rounded-full hover:bg-button/10 cursor-pointer"
//         >
//           Cancel
//         </a>

//         <button
//           disabled={nickname.trim().length === 0}
//           onClick={() => {
//             updateNickname(card.brand, nickname);
//             setShowNicknameModal(false);
//           }}
//           className={`text-button text-sm mt-4 p-2 px-5 rounded-full ${
//             nickname.trim().length === 0
//               ? "opacity-40 cursor-not-allowed"
//               : "hover:bg-button/10"
//           }`}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

export default function NickNameModal({
  card,
  nickname,
  setNickname,
  setShowNicknameModal,
  saveNickname,
}) {
  const handleClose = () => {
    setShowNicknameModal(false);
  };
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-medium z-20 p-8 rounded-3xl w-[480px] max-w-[90%] shadow-md"
      >
        <div className="flex flex-col justify-center items-center">
          <i className="fa-solid fa-user-pen text-button text-2xl mb-4"></i>
          <span className="text-black text-lg font-medium md:text-2xl">
            Edit nickname
          </span>
          <p className="text-black opacity-60 text-base font-light">
            • • • • {card.cardNumber.slice(-4)}
          </p>
          <input
            type="text"
            maxLength={25}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-black text-base font-normal border border-button rounded-md w-full h-12 mt-4 mb-1 px-2 outline-none"
          />
        </div>

        {/* Cancel & Save */}
        <div className="flex justify-end items-center space-x-2 mt-4">
          <button
            onClick={handleClose}
            className="text-button text-sm px-4 py-2 rounded-full hover:bg-button/10 transition"
          >
            Cancel
          </button>
          <button
            disabled={nickname.trim().length === 0}
            onClick={saveNickname}
            className="text-button text-sm px-4 py-2 rounded-full hover:bg-button/10 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
