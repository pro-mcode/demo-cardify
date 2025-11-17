export default function Disclaimer({ onClose }) {
  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center">
      <div
        onClick={(e) => e.stopPropagation()} // Prevent overlay click
        className="text-white text-base font-medium z-20 p-6 rounded-lg w-[400px] max-w-[80%] md:max-w-[400px] duration-150 transition-all ease-in-out disclaimer"
      >
        Demo notice: The card details you enter on this page are not saved or
        processed in any way. This form is for testing or demonstration purposes
        only. Please do not enter real card information.
        <button
          onClick={onClose}
          id="remove-disclaimer"
          className="block text-sm mt-4 bg-purple-950 p-2 px-4 rounded-md hover:opacity-75 duration-150 transition-all"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
