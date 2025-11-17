export default function CardFrontSide({ cardNumber, cardName, expMM, expYY }) {
  return (
    <div className="absolute top-[4%] right-[12%] w-72 h-[10rem] max-h-[10rem] max-w-[80%] translate-y-[6rem] md:w-[20rem] md:h-52 md:max-h-[12rem] lg:max-h-[12rem] lg:w-[20rem] lg:max-w-[20rem] lg:top-[50%] lg:left-[3%] lg:translate-y-[-210px] z-10 hover:scale-105 transition-all duration-300">
      <div className="relative flex justify-center items-center h-full">
        {/* Democard logo */}
        <img
          src="assets/images/card-logo.svg"
          alt="democard-logo"
          className="absolute top-[5%] left-[5%] w-16 h-16 object-contain"
        />

        {/* <!-- <div className="absolute flex items-center top-[10%] left-[5%] gap-2">
            <span className="w-8 h-8 bg-white rounded-full"></span>
            <span
              className="w-4 h-4 bg-transparent rounded-full border-2 border-white"
            ></span>
          </div> --> */}
        {/* <!-- Front Card Image --> */}
        <img
          src="assets/images/bg-card-front.png"
          alt=""
          className="w-full h-full"
        />
        <div className="absolute top-[50%] w-full preview">
          <div className="flex justify-center items-center gap-2 mx-auto mb-[5%]">
            <span
              className="text-[#fff] text-sm tracking-widest font-medium font-sans md:text-base text-left"
              id="pv-card"
            >
              {cardNumber || "1234 5678 9000 0000"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-4 text-white px-5 mx-auto lg:mt-5">
            <p
              className="text-[#fff] text-[12px] font-normal uppercase md:text-sm md:tracking-wider"
              id="pv-name"
            >
              {cardName || "cardholder name"}
            </p>
            <p
              className="text-[#fff] text-[12px] tracking-widest font-normal md:text-sm"
              id="pv-exp"
            >
              {expMM || "00"}/{expYY || "00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
