import Image from "next/image";
import Herobanner from "./components/Herobanner";
import Bookslist from "./components/Bookslist";
export default function Home() {
  return (
    <div>
      <Herobanner />
      <Bookslist />
    </div>
  );
}
