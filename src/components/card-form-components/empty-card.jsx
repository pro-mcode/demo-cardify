import { useNavigate } from "react-router";

export default function EmptyCard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center space-y-4 flex-1 px-6 text-center min-h-screen">
      <img
        src="assets/images/empty-payment-method.svg"
        alt="empty-payment-method"
        className="max-w-[15rem] mb-4"
      />

      <h3 className="text-black text-2xl font-medium">
        You haven’t added any cards yet
      </h3>

      <p className="text-black text-base font-light my-4 max-w-md">
        Add demo card details to explore how payment methods are displayed and
        managed within Demo Pay. No real transactions or data are processed.
      </p>

      <button
        onClick={() => navigate("/CardForm")}
        className="py-2 px-5 rounded-full text-white payment-btn hover:opacity-80 transition duration-150"
      >
        <i className="fa-solid fa-plus mr-2"></i> Add payment method
      </button>
    </div>
  );
}
