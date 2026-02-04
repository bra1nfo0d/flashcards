import { useEffect, useState } from "react";
import { apiFetch, getToken } from "../api";
import AppNavbar from "../components/AppNavbar";
import FlashCard from "../components/FlashCard";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        if (!isLoggedIn) {
          const intro = await apiFetch("/api/cards/introduction");
          setCards(intro);
        } else {
          const intro = await apiFetch("/api/cards/introduction");
          setCards(intro);
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
