import EmptyCard from "../components/card-form-components/empty-card";
import Footer from "../components/footer";
import CardLists from "../components/card-details-components/card-lists";
export default function LandingPage({
  cards,
  cardNicknames,
  cardNicknamesDefault,
  cardLogos,
  brand,
}) {
  return (
    <div className="landing-page-component">
      {/* LEFT SIDE BACKGROUND (Desktop Only) */}
      <div className="hidden md:block absolute left-0 top-0 h-screen  w-[30%] max-w-[20rem]">
        <img
          src="assets/images/bg-main-desktop.png"
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="landing-page-right-container md:h-screen md:overflow-auto md:scrollbar-none custom-scroll">
        {/* CARD DASHBOARD OR EMPTY CARD */}
        <div className="landing-page-dashboard-wrapper">
          {cards.length === 0 ? (
            <EmptyCard />
          ) : (
            <CardLists
              cards={cards}
              cardNicknames={cardNicknames}
              cardNicknamesDefault={cardNicknamesDefault}
              cardLogos={cardLogos}
              brand={brand}
            />
          )}
        </div>
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
