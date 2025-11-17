export default function CardBackSide({ cvc }) {
  return (
    <div className="absolute top-[4%] right-[4%] w-72 h-[10rem] max-h-[10rem] max-w-[80%] md:h-52 md:max-h-[12rem] md:w-[20rem] lg:max-w-[20rem] lg:top-[50%] lg:left-[5%] z-10 hover:scale-105 transition-all duration-300">
      <div className="relative flex justify-center items-center h-full">
        {/* <!-- Back Card Image --> */}
        <img
          src="assets/images/bg-card-back.png"
          alt=""
          className="w-full h-full"
        />
        <div className="absolute top-[45%] w-full">
          <div className="flex justify-end items-center gap-2 mx-auto mb-[5%] w-[80%]">
            <span
              className="text-[#fff] text-xs tracking-widest font-medium pr-3"
              id="pv-cvc"
            >
              {cvc || "123"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
