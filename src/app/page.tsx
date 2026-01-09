import HomePage from "@/sections/Home";
import NavBar from "@/sections/NavBar";
import Gallery from "@/sections/Gallery";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HomePage />
      <Gallery />
    </div>
  );
}
