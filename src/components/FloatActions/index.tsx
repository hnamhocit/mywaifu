"use client";

import { MoveDown, MoveUp, Plus } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

const FloatActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log({ isOpen });

  const goToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="block p-2 md:p-3 bg-gray-900 cursor-pointer transition-all hover:bg-gray-950 rounded-full text-white shadow-lg">
            <Plus className={clsx("transition-all", isOpen && "rotate-45")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={goToTop}>
            <MoveUp />
            Go to top
          </DropdownMenuItem>

          <DropdownMenuItem onClick={goToBottom}>
            <MoveDown />
            Go to bottom
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FloatActions;
