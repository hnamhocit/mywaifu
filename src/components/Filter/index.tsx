import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import AutocompleteInput from "../AutocompleteInput";
import { X } from "lucide-react";

interface FilterProps {
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
  title: string;
  suggestions: string[];
}

const Filter: FC<FilterProps> = ({ items, setItems, title, suggestions }) => {
  const name = title.toLowerCase() + "s";

  const handleRemove = useCallback(
    (s: string) => {
      const newItems = items.filter((i) => i !== s);
      setItems(newItems);
      localStorage.setItem(name, JSON.stringify(newItems));
    },
    [items],
  );

  return (
    <div className="space-y-1">
      <div className="text-gray-700 font-medium">{title}</div>

      <div className="flex items-center flex-wrap gap-3">
        <AutocompleteInput
          items={items}
          setItems={setItems}
          suggestions={suggestions}
          name={title.toLowerCase() + "s"}
        />

        {items.map((s, i) => (
          <div
            key={i}
            className="flex items-center w-fit gap-2 py-1 px-2 rounded-md border shadow text-sm font-medium"
          >
            {s}
            <button
              onClick={() => handleRemove(s)}
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

export default memo(Filter);
