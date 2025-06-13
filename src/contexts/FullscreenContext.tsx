"use client";

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";

interface FullscreenContextType {
  currentImage: string | null;
  isOpen: boolean;
  openFullscreen: (imageUrl: string) => void;
  closeFullscreen: () => void;
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(
  undefined,
);

export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error("useFullscreen must be used within a FullscreenProvider");
  }
  return context;
};

interface FullscreenProviderProps {
  children: ReactNode;
}

export const FullscreenProvider: React.FC<FullscreenProviderProps> = ({
  children,
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openFullscreen = useCallback((imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsOpen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsOpen(false);
    setCurrentImage(null);
  }, []);

  const value = {
    currentImage,
    isOpen,
    openFullscreen,
    closeFullscreen,
  };

  return (
    <FullscreenContext.Provider value={value}>
      {children}
    </FullscreenContext.Provider>
  );
};
