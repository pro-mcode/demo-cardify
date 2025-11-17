import React from "react";
import { useNavigate } from "react-router";
import CustomRadio from "./custom-radio.jsx";
export default function PaymentMethodModal({
  show,
  onClose,
  setSelectedMethod,
  selectedMethod,
}) {
  const navigate = useNavigate();

  if (!show) return null;
  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-10 flex justify-center items-center"
      onClick={onClose} // click outside closes modal
    >
      {/* Modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        id="disclaimer"
        className="bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-medium z-20 p-8 rounded-3xl w-[480px] max-w-[90%] md:max-w-[600px] duration-150 transition-all ease-in-out shadow-md"
      >
        <div
          id="remove-disclaimer"
          className="flex justify-between items-center"
        >
          <span className="text-black text-lg font-medium">
            Add a payment method
          </span>
          <i
            onClick={onClose}
            className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"
          ></i>
        </div>
        <div className="flex flex-col space-y-8 my-8">
          {/* <div className="flex justify-start items-center space-x-6 w-full border-b-2 border-gray-200 pb-2">
            <input
              type="radio"
              name=""
              id="card"
              className="w-5 h-5"
              checked={selectedMethod === "card"}
              onChange={() => setSelectedMethod("card")}
            />
            <label for="card">
              <span className="text-black text-base font-light tracking-wide">
                Add credit or debit card
              </span>
            </label>
          </div>
          <div className="flex justify-start items-center space-x-6 w-full border-b-2 border-gray-200 pb-2">
            <input
              type="radio"
              name=""
              id="bank"
              className="w-5 h-5"
              disabled
              checked={selectedMethod === "bank"}
              onChange={() => setSelectedMethod("bank")}
            />
            <label for="bank">
              <span className="text-black text-base font-light tracking-wide">
                Add a bank account (coming soon)
              </span>
            </label>
          </div> */}
          <CustomRadio
            id="card"
            label="Add credit or debit card"
            value="card"
            selectedValue={selectedMethod}
            setSelectedValue={setSelectedMethod}
          />
          <CustomRadio
            id="bank"
            label="Add a bank account (coming soon)"
            value="bank"
            selectedValue={selectedMethod}
            setSelectedValue={setSelectedMethod}
            disabled
          />
        </div>

        {/* <!-- cancel and next buttons --> */}
        <div className="flex justify-end items-center space-x-4">
          <button
            onClick={onClose}
            id="remove-disclaimer"
            className="text-button text-sm mt-4 md:mx-0 hover:opacity-75 duration-150 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/CardForm")}
            disabled={!selectedMethod}
            id="remove-disclaimer"
            className={`text-sm text-white mx-auto mt-4 p-2 px-5 rounded-full md:mx-0 duration-150 transition-all ${
              selectedMethod
                ? "bg-purple-950 hover:opacity-75 "
                : "bg-purple-950 opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
