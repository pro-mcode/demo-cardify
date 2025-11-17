export default function Feedback({ setFeedback }) {
  // Handle close feedback
  const handleClose = () => {
    setFeedback(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
    >
      <div
        id="disclaimer"
        onClick={(e) => e.stopPropagation()}
        className="bg-white fixed right-0 top-0 text-white text-base font-medium z-20 p-6 pb-0 rounded-l-md xs:w-full sm:w-[70%] min-h-screen overflow-y-scroll max-w-fll md:max-w-[420px] duration-150 transition-all ease-in-out shadow-md fle flex-col justify-between"
      >
        {/* <!-- close icon --> */}
        <div
          onClick={handleClose}
          id="remove-disclaimer"
          className="flex justify-between items-center border-b-2 border-gray-200 -mx-6 p-6 pt-0 space-x-8"
        >
          <span className="text-black text-lg font-medium">
            Send feedback to the developer
          </span>
          <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"></i>
        </div>
        {/* <!-- textarea and input container --> */}
        <div
          id="remove-disclaimer"
          className="flex flex-col justify-center items-center mt-4"
        >
          <label
            for="feedback"
            className="text-black text-sm font-light self-start"
          >
            Describe your feedback (required)
          </label>
          <textarea
            name=""
            id="feedback"
            className="text-black text-base font-normal border border-button rounded-md w-full h-36 mt-3 mb-1 p-2 outline-none"
          ></textarea>
          <span className="text-black text-xs font-light self-start mb-8">
            Please don’t include any sensitive information
            <i className="fa-regular fa-circle-question text-black text-xs font-light ml-1"></i>
          </span>
          <label
            for="feedback"
            className="text-black text-sm font-light self-start"
          >
            Enter your e-mail (required)
          </label>
          <input
            type="text"
            className="text-black text-base font-normal border border-button rounded-md w-full h-12 mt-3 mb-1 px-2 outline-none"
          />
        </div>
        {/* <!-- check box & terms/conditions --> */}
        <div className="flex flex-col justify-center items-center w-full mb-4">
          <div className="flex justify-start items-center space-x-4 w-full">
            <input type="checkbox" name="" id="agree" className="w-4 h-4" />
            <label for="agree" className="text-black text-sm font-light">
              We may email you for more information or updates
            </label>
          </div>
          <p className="text-black text-xs font-light self-start mt-8">
            <span className="font-medium">Demo notice:</span> Feedback shared
            through this demo helps guide improvements in usability, design, and
            accessibility. Your insights make it possible to build better, more
            intuitive websites. No real data or personal details are collected —
            this is for development purposes only.
          </p>
        </div>
        {/* <!--  send feedback button --> */}
        <div className="flex justify-end items-center border-t-2 border-gray-200 -mx-6">
          <button
            disabled
            id="remove-disclaimer"
            className="text-white text-sm m-6 p-2 px-6 rounded-md bg-button hover:bg-opacity-75 duration-150 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
