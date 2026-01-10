"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";

// Data
const allImages: string[] = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

// Helpers
function chunkArray<T>(arr: T[], columnCount: number): T[][] {
  const result: T[][] = Array.from({ length: columnCount }, () => []);
  arr.forEach((item, index) => {
    result[index % columnCount].push(item);
  });
  return result;
}

// Types
type Dimension = {
  width: number;
  height: number;
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

// Column
function Column({ images, y }: ColumnProps) {
  return (
    <motion.div
      style={{ y }}
      className="relative flex flex-col gap-4 w-full md:w-[25%]"
    >
      {images.map((img) => (
        <div
          key={img}
          className="relative w-full h-[30vh] md:h-[45vh] rounded-xl overflow-hidden"
        >
          <Image
            src={`/images/${img}`}
            alt={img}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </motion.div>
  );
}

// Page
export default function Home() {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const [dimension, setDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && dimension.width < 768;
  const columnCount = isMobile ? 2 : 4;

  // Image selection
  const activeImages = mounted
    ? isMobile
      ? allImages.slice(0, 8)
      : allImages
    : allImages;

  const columns = chunkArray(activeImages, columnCount);
  const { height } = dimension;

  // Scroll
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  // Parallax (static hooks)
  const mobileFactor = 0.18;

  const y1 = useTransform(scrollYProgress, [0, 1], [
    isMobile ? -height * mobileFactor : -height * 0.2,
    isMobile ? height * mobileFactor : height * 0.9,
  ]);

  const y2 = useTransform(scrollYProgress, [0, 1], [
    isMobile ? height * mobileFactor : -height * 0.6,
    isMobile ? -height * mobileFactor : height * 1.5,
  ]);

  const y3 = useTransform(scrollYProgress, [0, 1], [
    -height * 0.2,
    height * 0.9,
  ]);

  const y4 = useTransform(scrollYProgress, [0, 1], [
    -height * 0.4,
    height * 1.2,
  ]);

  const parallax = isMobile ? [y1, y2] : [y1, y2, y3, y4];

  // Effects
  useEffect(() => {
    const onResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    onResize();
    window.addEventListener("resize", onResize);

    const lenis = new Lenis({
      lerp: isMobile ? 0.2 : 0.08,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  // Render
  return (
    <main className="relative">
      <section
        ref={galleryRef}
        className="
          relative bg-[#ffb7d3]
          p-4 md:p-[2vw]
          min-h-screen md:h-[220vh]
          overflow-hidden
          grid grid-cols-2 gap-4
          md:flex md:gap-[2vw]
        "
      >
        {columns.map((imgs, i) => (
          <Column key={i} images={imgs} y={parallax[i]} />
        ))}
      </section>
    </main>
  );
}
