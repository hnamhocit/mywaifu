import { Input } from "../ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 flex h-16 items-center justify-between bg-white px-4">
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="/logo.png"
          alt="App Logo"
        />
        <div className="text-xl font-bold">MyWaifu</div>
      </div>

      <div>
        <Input />
      </div>
    </header>
  );
};

export default Header;
