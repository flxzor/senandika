import HomePage from "@/sections/Home";
import Gallery from "@/sections/Gallery";
import Header from "@/sections/Header";
import About from "@/sections/About";

export default function Home() {
  return (
    <div>
      <Header />
      <section id="home">
        <HomePage />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
}
