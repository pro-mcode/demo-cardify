import { useNavigate } from "react-router";

export default function Complete() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col space-y-6 max-w-[80%] mx-auto lg:ml-[60%] lg:w-full"
      id="completed"
    >
      <img
        src="assets/images/icon-complete.svg"
        alt="complete-icon"
        className="mx-auto"
      />
      <h3 className="text-3xl text-primary text-center font-medium tracking-widest uppercase">
        Thank You!
      </h3>
      <p className="text-lg text-center text-gray-500 font-medium tracking-wider">
        We've added your card details
      </p>
      <button
        onClick={() => navigate("/")}
        href="index.html"
        className="bg-primary text-white text-lg font-medium text-center w-full py-3 rounded-md shadow-md tracking-wider hover:opacity-70 translate-y-2"
      >
        Continue
      </button>
    </div>
  );
}
