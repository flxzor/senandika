"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const images: string[] = [
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

type Dimension = {
  width: number;
  height: number;
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

function Column({ images, y }: ColumnProps) {
  return (
    <motion.div
      style={{ y }}
      className="
        relative flex flex-col gap-[2vw]
        w-[25%] min-w-[250px]
        will-change-transform
      "
    >
      {images.map((img) => (
        <div
          key={img}
          className="
            relative w-full h-[45vh]
            rounded-xl overflow-hidden
          "
        >
          <Image
            src={`/images/${img}`}
            alt={img}
            fill
            className="object-cover"
            sizes="25vw"
            priority={false}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function Home() {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const [dimension, setDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.2, height * 0.9]
  );

  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.6, height * 1.5]
  );

  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.2, height * 0.9]
  );

  const y4 = useTransform(
    scrollYProgress,
    [0, 1],
    [-height * 0.4, height * 1.2]
  );

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const onResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    onResize();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main className="relative">
      {/* Gallery */}
      <section
        ref={galleryRef}
        className="
          relative flex items-start
          h-[220vh]
          bg-senandika
          gap-[2vw] p-[2vw]
          overflow-hidden
        "
      >
        <Column images={images.slice(0, 3)} y={y1} />
        <Column images={images.slice(3, 6)} y={y2} />
        <Column images={images.slice(6, 9)} y={y3} />
        <Column images={images.slice(9, 12)} y={y4} />
      </section>
    </main>
  );
}
