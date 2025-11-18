// service_7yzc3uh
// export default function Feedback({ setFeedback }) {
//   // Handle close feedback
//   const handleClose = () => {
//     setFeedback(false);
//   };

//   return (
//     <div
//       onClick={handleClose}
//       className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
//     >
//       <div
//         id="disclaimer"
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white fixed right-0 top-0 text-white text-base font-medium z-20 p-6 pb-0 rounded-l-md xs:w-full sm:w-[70%] min-h-screen overflow-y-scroll max-w-fll md:max-w-[420px] duration-150 transition-all ease-in-out shadow-md fle flex-col justify-between"
//       >
//         {/* <!-- close icon --> */}
//         <div
//           onClick={handleClose}
//           id="remove-disclaimer"
//           className="flex justify-between items-center border-b-2 border-gray-200 -mx-6 p-6 pt-0 space-x-8"
//         >
//           <span className="text-black text-lg font-medium">
//             Send feedback to the developer
//           </span>
//           <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105 transition-all duration-150"></i>
//         </div>
//         {/* <!-- textarea and input container --> */}
//         <div
//           id="remove-disclaimer"
//           className="flex flex-col justify-center items-center mt-4"
//         >
//           <label
//             for="feedback"
//             className="text-black text-sm font-light self-start"
//           >
//             Describe your feedback (required)
//           </label>
//           <textarea
//             name=""
//             id="feedback"
//             className="text-black text-base font-normal border border-button rounded-md w-full h-36 mt-3 mb-1 p-2 outline-none"
//           ></textarea>
//           <span className="text-black text-xs font-light self-start mb-8">
//             Please don’t include any sensitive information
//             <i className="fa-regular fa-circle-question text-black text-xs font-light ml-1"></i>
//           </span>
//           <label
//             for="feedback"
//             className="text-black text-sm font-light self-start"
//           >
//             Enter your e-mail (required)
//           </label>
//           <input
//             type="text"
//             className="text-black text-base font-normal border border-button rounded-md w-full h-12 mt-3 mb-1 px-2 outline-none"
//           />
//         </div>
//         {/* <!-- check box & terms/conditions --> */}
//         <div className="flex flex-col justify-center items-center w-full mb-4">
//           <div className="flex justify-start items-center space-x-4 w-full">
//             <input type="checkbox" name="" id="agree" className="w-4 h-4" />
//             <label for="agree" className="text-black text-sm font-light">
//               We may email you for more information or updates
//             </label>
//           </div>
//           <p className="text-black text-xs font-light self-start mt-8">
//             <span className="font-medium">Demo notice:</span> Feedback shared
//             through this demo helps guide improvements in usability, design, and
//             accessibility. Your insights make it possible to build better, more
//             intuitive websites. No real data or personal details are collected —
//             this is for development purposes only.
//           </p>
//         </div>
//         {/* <!--  send feedback button --> */}
//         <div className="flex justify-end items-center border-t-2 border-gray-200 -mx-6">
//           <button
//             disabled
//             id="remove-disclaimer"
//             className="text-white text-sm m-6 p-2 px-6 rounded-md bg-button hover:bg-opacity-75 duration-150 transition-all"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Enhanced Feedback component with validation, loading state, success toast,
// checkbox requirement, error UI, auto-close, and improved styling.

// import { useState } from "react";
// import emailjs from "emailjs-com";

// export default function Feedback({ setFeedback }) {
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [agree, setAgree] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [toast, setToast] = useState(null);

//   const handleClose = () => {
//     setFeedback(false);
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!message.trim()) newErrors.message = "Feedback is required";

//     if (!email.trim()) newErrors.email = "Email is required";
//     else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
//       newErrors.email = "Enter a valid email";

//     if (!agree) newErrors.agree = "You must agree before sending";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     setLoading(true);

//     emailjs
//       .send(
//         "service_7yzc3uh",
//         "YOUR_TEMPLATE_ID",
//         {
//           message,
//           email,
//         },
//         "pmENJmZX7HEqOsVws"
//       )
//       .then(() => {
//         alert("Feedback sent successfully!");
//         setFeedback(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to send feedback. Try again.");
//       });

//     // simulate sending
//     setTimeout(() => {
//       setLoading(false);
//       setToast("Feedback sent! Thank you.");

//       // auto close modal after 2s
//       setTimeout(() => setFeedback(false), 2000);
//     }, 1500);
//   };

//   return (
//     <div
//       onClick={handleClose}
//       className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
//     >
//       {toast && (
//         <div className="fixed top-6 bg-green-600 text-white px-4 py-2 rounded shadow text-sm animate-fadeIn">
//           {toast}
//         </div>
//       )}

//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white fixed right-0 top-0 text-black p-6 pb-0 rounded-l-md xs:w-full sm:w-[70%] min-h-screen overflow-y-scroll max-w-full md:max-w-[420px] duration-150 shadow-md flex flex-col"
//       >
//         {/* Header */}
//         <div
//           onClick={handleClose}
//           className="flex justify-between items-center border-b border-gray-200 -mx-6 p-6 pt-0"
//         >
//           <span className="text-lg font-medium">
//             Send feedback to the developer
//           </span>
//           <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105"></i>
//         </div>

//         {/* Textarea & Input */}
//         <div className="flex flex-col mt-4">
//           {/* Message */}
//           <label className="text-sm font-light">
//             Describe your feedback (required)
//           </label>
//           <textarea
//             id="feedback"
//             className={`text-base border rounded-md w-full h-36 mt-2 p-2 outline-none ${
//               errors.message ? "border-red-500" : "border-button"
//             }`}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//           {errors.message && (
//             <p className="text-xs text-red-500 mt-1">{errors.message}</p>
//           )}

//           <span className="text-xs font-light mt-1 mb-6">
//             Please don’t include any sensitive information
//           </span>

//           {/* Email */}
//           <label className="text-sm font-light">
//             Enter your e-mail (required)
//           </label>
//           <input
//             type="text"
//             className={`text-base border rounded-md w-full h-12 mt-2 p-2 outline-none ${
//               errors.email ? "border-red-500" : "border-button"
//             }`}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {errors.email && (
//             <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Checkbox */}
//         <div className="flex flex-col mt-6">
//           <div className="flex items-center space-x-3">
//             <input
//               type="checkbox"
//               checked={agree}
//               onChange={() => setAgree(!agree)}
//               className={`w-4 h-4 ${errors.agree ? "border-red-500" : ""}`}
//             />
//             <label className="text-sm font-light">
//               We may email you for more information or updates
//             </label>
//           </div>
//           {errors.agree && (
//             <p className="text-xs text-red-500 mt-1">{errors.agree}</p>
//           )}
//         </div>

//         {/* Disclaimer */}
//         <p className="text-xs font-light mt-8">
//           <span className="font-medium">Demo notice:</span> Feedback shared
//           helps improve usability, design, and accessibility. No real data is
//           collected.
//         </p>

//         {/* Submit Button */}
//         <div className="flex justify-end items-center border-t border-gray-200 -mx-6 mt-6">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`text-white text-sm m-6 p-2 px-6 rounded-md bg-button transition-all ${
//               loading ? "opacity-50" : "hover:bg-opacity-80"
//             }`}
//           >
//             {loading ? "Sending..." : "Send"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Feedback({ setFeedback }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [errorToast, setErrorToast] = useState(null);

  const handleClose = () => setFeedback(false);

  const validate = () => {
    let newErrors = {};
    if (!message.trim()) newErrors.message = "Feedback is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!agree) newErrors.agree = "You must agree before sending";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // Send feedback to developer
      await emailjs.send(
        "service_7yzc3uh",
        "template_xwmr74q",
        {
          email: email,
          name: name,
          message: message,
        },
        "Bl_jwJqzUS-s32FRW"
      );

      // Send automatic reply to user
      await emailjs.send(
        "service_7yzc3uh",
        "template_2x75kse",
        {
          email: email,
          name: name,
          message: message,
        },
        "Bl_jwJqzUS-s32FRW"
      );

      setToast("Feedback sent! A confirmation email was sent to you.");
      setTimeout(() => setFeedback(false), 2500);

      // Optional: reset fields
      setMessage("");
      setEmail("");
      setAgree(false);
    } catch (err) {
      console.error(err);
      setErrorToast("Failed to send feedback. Try again.");
      setTimeout(() => setFeedback(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
    >
      {toast && (
        <div className="fixed top-6 bg-green-600 text-white px-4 py-2 rounded shadow text-sm animate-fadeIn z-30">
          {toast}
        </div>
      )}
      {errorToast && (
        <div className="fixed top-6 bg-error text-white px-4 py-2 rounded shadow text-sm animate-fadeIn z-30">
          {errorToast}
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 text-black p-6 pb-0 xs:w-full sm:w-[70%] max-w-full md:max-w-[420px] duration-150 shadow-md flex flex-col justify-between md:rounded-l-md h-screen overflow-auto custom-scroll"
      >
        <div className="">
          {/* Header */}
          <div
            onClick={handleClose}
            className="flex justify-between items-center border-b border-gray-200 -mx-6 p-6 pt-0 gap-2"
          >
            <span className="text-lg font-medium">
              Send feedback to the developer
            </span>
            <i className="fa-solid fa-circle-xmark text-button text-2xl cursor-pointer hover:scale-105"></i>
          </div>

          {/* Textarea & Input */}
          <div className="flex flex-col mt-4">
            <label className="text-sm font-light">
              Describe your feedback (required)
            </label>
            <textarea
              id="feedback"
              className={`text-base border rounded-md w-full h-36 mt-2 p-2 outline-none focus:border-button  ${
                errors.message ? "border-red-500" : "border-button"
              }`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message && e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, message: null }));
                }
              }}
            ></textarea>
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message}</p>
            )}

            <span className="text-xs font-light mt-1 mb-6">
              Please don’t include any sensitive information
            </span>

            {/* Name Input */}
            <label className="text-sm font-light">
              Enter your name (required)
            </label>
            <input
              type="text"
              className={`text-base border rounded-md w-full h-12 mt-2 p-2 outline-none focus:border-button ${
                errors.name ? "border-red-500" : "border-button"
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name && e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: null }));
                }
              }}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}

            {/* Email Input */}
            <label className="text-sm font-light mt-4">
              Enter your e-mail (required)
            </label>
            <input
              type="text"
              className={`text-base border rounded-md w-full h-12 mt-2 p-2 lowercase outline-none focus:border-button ${
                errors.email ? "border-red-500" : "border-button"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (
                  errors.email &&
                  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)
                ) {
                  setErrors((prev) => ({ ...prev, email: null }));
                }
              }}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex flex-col mt-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => {
                  setAgree(!agree);
                  if (errors.agree && !agree) {
                    setErrors((prev) => ({ ...prev, agree: null }));
                  }
                }}
                className={`w-4 h-4 ${errors.agree ? "border-red-500" : ""}`}
              />
              <label className="text-sm font-light">
                We may email you for more information or updates
              </label>
            </div>
            {errors.agree && (
              <p className="text-xs text-red-500 mt-1">{errors.agree}</p>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-xs font-light mt-8">
            <span className="font-medium">Demo notice:</span> Feedback shared
            helps improve usability, design, and accessibility. No real data is
            collected.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center border-t border-gray-200 -mx-6 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`text-white text-sm m-6 p-2 px-6 rounded-md bg-button transition-all ${
              loading ? "opacity-50" : "hover:bg-opacity-80"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
