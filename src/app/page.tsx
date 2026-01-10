import HomePage from "@/sections/Home";
import Gallery from "@/sections/Gallery";
import Header from "@/sections/Header";
import About from "@/sections/About";

export default function Home() {
  return (
    <div>
      <Header />
      <HomePage />
      <Gallery />
      <About />
    </div>
  );
}
