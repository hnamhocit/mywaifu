import { Dispatch, FC, SetStateAction } from "react";
import AutocompleteInput from "../AutocompleteInput";
import { X } from "lucide-react";

interface FilterProps {
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
  title: string;
  suggestions: string[];
}

const Filter: FC<FilterProps> = ({ items, setItems, title, suggestions }) => {
  return (
    <div className="space-y-3">
      <div className="text-lg font-semibold">{title}</div>

      <div className="flex items-center gap-3 flex-wrap p-2 rounded-md">
        <AutocompleteInput
          items={items}
          setItems={setItems}
          suggestions={suggestions}
        />

        {items.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 py-1 px-2 rounded-md border shadow text-sm font-medium"
          >
            {s}
            <button
              onClick={() => setItems((prev) => prev.filter((_s) => _s !== s))}
              className="block p-1 cursor-pointer rounded-full bg-red-500 text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
