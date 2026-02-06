import { useEffect, useState } from "react";
import { apiFetch, getToken } from "../api/api";
import AppNavbar from "../components/common/AppNavbar";
import FlashCard from "../components/flashcards/FlashCard";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      const stackId = localStorage.getItem("learnStackId");

      try {
        if (stackId) {
          const data = await apiFetch(`/api/cards/by-stack?stackId=${stackId}`);
          setCards(data.result ?? data);
        } else {
          const intro = await apiFetch("/api/cards/introduction");
          setCards(intro.result ?? intro);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isLoggedIn]);

  return (
    <>
      <AppNavbar />
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <FlashCard cards={cards} />
      </div>
    </>
  );
}
