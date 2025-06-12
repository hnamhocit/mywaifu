import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex animate-spin items-center justify-center">
      <LoaderCircle className="text-orange-500" size={64} />
    </div>
  );
};

export default Loading;
