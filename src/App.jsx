import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import CardForm from "./pages/CardForm";
import CardDashboard from "./pages/CardDashboard";
function App() {
  // All cards
  const [cards, setCards] = useState([]);

  // Remove card
  const removeCard = (id) => {
    const updated = cards.filter((card) => card.id !== id);

    setCards(updated); // update UI
    localStorage.setItem("cards", JSON.stringify(updated)); // save changes
  };

  // Update card
  const updateCard = (id, updatedCard) => {
    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  // Card details holder
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMM, setExpMM] = useState("");
  const [expYY, setExpYY] = useState("");
  const [cvc, setCvc] = useState("");

  // Detects card provider
  const getCardBrand = (number) => {
    const cleaned = number.replace(/\D/g, ""); // Remove non-digits
    if (/^4/.test(cleaned)) return "visa"; // Visa starts with 4
    if (/^5[1-5]/.test(cleaned)) return "mastercard"; // Mastercard 51-55
    if (/^3[47]/.test(cleaned)) return "amex"; // American Express 34 or 37
    if (/^6(?:011|5)/.test(cleaned)) return "discover"; // Discover 6011 or 65
    if (/^5078/.test(cleaned)) return "verve"; // Verve starts with 5078
    return "unknown";
  };
  const brand = getCardBrand(cardNumber || "");

  // Card provider logos
  const cardLogos = {
    visa: "../assets/images/visa.png",
    mastercard: "../assets/images/mastercard.png",
    amex: "../assets/images/amex.svg",
    discover: "../assets/images/discover.png",
    verve: "../assets/images/verve.svg",
  };

  // Card Provider names
  const cardNicknamesDefault = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "Amex",
    discover: "Discover",
    verve: "Verve",
    unknown: "Democard",
  };

  // Create custom name for saved cards
  const [cardNicknames, setCardNicknames] = useState(() => {
    const saved = localStorage.getItem("cardNicknames");
    return saved ? JSON.parse(saved) : {};
  });

  const updateNickname = (cardId, newNickname) => {
    const updated = { ...cardNicknames, [cardId]: newNickname.trim() };
    setCardNicknames(updated);
    localStorage.setItem("cardNicknames", JSON.stringify(updated));
  };

  useEffect(() => {
    const loadCards = () => {
      const stored = JSON.parse(localStorage.getItem("cards")) || [];
      setCards(stored);
    };

    loadCards();
  }, []);

  const addCard = (newCard) => {
    setCards((prev) => [...prev, newCard]);
  };

  return (
    <div className="relative global-container max-w-[1440px]">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              cards={cards}
              cardNicknames={cardNicknames}
              cardNicknamesDefault={cardNicknamesDefault}
              cardLogos={cardLogos}
              brand={brand}
            />
          }
        />
        <Route
          path="/CardForm"
          element={
            <CardForm
              cards={cards}
              cardLogos={cardLogos}
              getCardBrand={getCardBrand}
              cardName={cardName}
              setCardName={setCardName}
              expMM={expMM}
              setExpMM={setExpMM}
              expYY={expYY}
              setExpYY={setExpYY}
              cvc={cvc}
              setCvc={setCvc}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              brand={brand}
              addCard={addCard}
            />
          }
        />
        <Route
          path="/CardDashboard/:cardId"
          element={
            // <CardDashboard
            //   cards={cards}
            //   cardLogos={cardLogos}
            //   cardNicknames={cardNicknames}
            //   cardNicknamesDefault={cardNicknamesDefault}
            //   updateNickname={updateNickname}
            //   removeCard={removeCard}
            //   updateCard={updateCard}
            // />
            <CardDashboard
              cards={cards}
              cardLogos={cardLogos}
              cardNicknames={cardNicknames}
              cardNicknamesDefault={cardNicknamesDefault}
              updateNickname={updateNickname}
              removeCard={removeCard}
              updateCard={updateCard}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
