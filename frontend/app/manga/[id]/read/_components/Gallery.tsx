"use client";

import Image from "next/image";

const Gallery = () => {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Image
          key={index}
          src={`https://placehold.jp/650x900.jpg?text=${index + 1}`}
          alt=""
          width={650}
          height={900}
          className="w-auto max-h-screen"
        />
      ))}
    </div>
  );
};

export default Gallery;