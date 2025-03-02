"use client";

import Image from "next/image";
import { ChapterPhotos } from "../_lib/api";

type Props = {
  photos?: ChapterPhotos;
}

const Gallery = (props: Props) => {
  const { photos } = props;

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      {photos?.map((photo) => {
        const isFirstPhoto = photo.order === 1;
        const loading = isFirstPhoto ? "eager" : "lazy";

        return (
          <Image
            key={photo.order}
            src={photo.url}
            alt=""
            width={650}
            height={900}
            priority={isFirstPhoto}
            loading={loading}
            className="w-full"
          />
        )
      })}
    </div>
  );
};

export default Gallery;