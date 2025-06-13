"use client";

import { useFullscreen } from "@/contexts/FullscreenContext";
import { IImage } from "@/interfaces";
import Image from "next/image";
import { FC, memo, useState } from "react";

const MyImage: FC<IImage> = ({ url, id, tags, rating }) => {
  const { openFullscreen } = useFullscreen();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <div className="space-y-3 text-center">
      <Image
        width={300}
        height={300}
        src={url}
        alt={url}
        onClick={() => openFullscreen(url)}
        className="min-h-60 w-full rounded-md cursor-pointer bg-gray-200 object-contain"
      />

      <div className="text-lg font-bold">{id}</div>

      <div className="font-medium  text-transparent bg-clip-text bg-linear-65 from-purple-500 to-pink-500">
        {rating}
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        {tags.slice(0, showMore ? tags.length : 2).map((tag, i) => (
          <div
            key={i}
            className="rounded-full bg-gray-900 px-2 py-1 text-sm text-gray-200"
          >
            {tag}
          </div>
        ))}

        {tags.length > 2 && (
          <button
            onClick={toggleShowMore}
            className="rounded-full bg-gray-900 cursor-pointer px-2 py-1 text-sm text-gray-200"
          >
            {showMore ? "-" : "+"}
            {tags.length - 2} {showMore ? "less" : "more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(MyImage);
