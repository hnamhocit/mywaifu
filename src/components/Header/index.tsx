import { Facebook, Github } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 flex h-16 items-center justify-between bg-white px-4">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="/logo.png"
          alt="App Logo"
        />

        <div className="text-xl text-transparent bg-clip-text font-bold bg-linear-65 from-purple-500 to-pink-500">
          MyWaifu
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="https://github.com/hnamhocit">
          <Button size="icon">
            <Github />
          </Button>
        </Link>

        <Link href="https://facebook.com/hnamhocit">
          <Button size="icon">
            <Facebook />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
