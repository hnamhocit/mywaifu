import { IImage } from "@/interfaces";
import Image from "next/image";
import { FC, memo } from "react";

const MyImage: FC<IImage> = ({ url, id, tags, rating }) => {
  return (
    <div className="space-y-2 text-center">
      <Image
        width={300}
        height={300}
        src={url}
        alt={url}
        className="min-h-60 w-full rounded-md border-2 object-contain"
      />

      <div className="text-lg font-semibold">{id}</div>

      <div className="font-medium">{rating}</div>

      <div className="flex flex-wrap justify-center gap-1">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="rounded-full bg-gray-900 px-2 py-1 text-sm text-gray-200"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(MyImage);
