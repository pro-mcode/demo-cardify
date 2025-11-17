export default function Footer() {
  return (
    <div className="mt-10 px-4 w-full">
      <div className=" border-t-2 border-gray-200 "></div>

      <div className="pt-4 space-y-4 flex flex-col md:inline-block md:space-y-0">
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          Terms
        </span>
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          Demo Pay terms
        </span>
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          Privacy
        </span>
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          Payments privacy
        </span>
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          State licences
        </span>
        <span className="text-black text-sm text-light inline-block mr-12 hover:opacity-50 duration-75 transition cursor-pointer md:py-3">
          Electronic communications policy
        </span>
      </div>
      <div className="w-full flex flex-col justify-start pt-6 pb-8 space-y-4 md:flex-row md:justify-between md:space-y-0">
        <span className="text-black text-sm font-normal opacity-60">
          © 2025 Demo Pay. All rights reserved.
        </span>
        <div className="text-black text-sm font-normal opacity-60">
          <a href="#">
            <i className="fas fa-code"></i> by
            <strong className="uppercase text-[12px]"> AD-M INNOVATIONS</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
