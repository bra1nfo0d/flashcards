import AppNavbar from "../components/AppNavbar";
import FlashCard from "../components/flashcard";

export default function Home() {
  return (
    <>
      <AppNavbar />
	  <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <FlashCard />
	  </div>
    </>
  );
}
