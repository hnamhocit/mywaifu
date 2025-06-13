"use client";

import React from "react";
import { useFullscreen } from "@/contexts/FullscreenContext";
import { X } from "lucide-react";
import clsx from "clsx";

const FullscreenImageOverlay: React.FC = () => {
  const { currentImage, isOpen, closeFullscreen } = useFullscreen();

  if (!isOpen || !currentImage) {
    return null;
  }

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,.7)] backdrop-blur-md transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={closeFullscreen}
    >
      <button
        onClick={closeFullscreen}
        className="absolute top-4 right-4 text-white text-3xl z-50 p-2 rounded-full hover:bg-gray-700 transition-colors"
        aria-label="Close fullscreen"
      >
        <X size={32} />
      </button>

      <img
        src={currentImage}
        alt="Fullscreen"
        className="max-w-[90vw] h-full object-contain cursor-zoom-out"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default FullscreenImageOverlay;
