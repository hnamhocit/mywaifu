import React, {
  FC,
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import clsx from "clsx";

interface AutocompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suggestions: string[];
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
}

const AutocompleteInput: FC<AutocompleteInputProps> = ({
  suggestions,
  items,
  setItems,
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [activeSuggest, setActiveSuggest] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const computedSuggestions = useMemo(() => {
    let newSuggestions = suggestions.filter(
      (s) => !items.includes(s.toLowerCase()),
    );
    if (value.trim() === "") return newSuggestions;

    return newSuggestions.filter((s) =>
      s.toLowerCase().includes(value.trim().toLowerCase()),
    );
  }, [value, suggestions, items]);

  useEffect(() => {
    const handleNext = () => {
      if (activeSuggest === computedSuggestions.length - 1) {
        setActiveSuggest(0);
        return;
      }

      setActiveSuggest((prev) => prev + 1);
    };

    const handlePrev = () => {
      if (activeSuggest === 0) {
        setActiveSuggest(computedSuggestions.length - 1);
        return;
      }

      setActiveSuggest((prev) => prev - 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "Tab") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (computedSuggestions.length > 0 && showSuggestions) {
          handleSelect(computedSuggestions[activeSuggest]);
        } else {
          const value = inputRef.current?.value as string;
          if (value !== "") {
            handleSelect(value);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [computedSuggestions, showSuggestions, activeSuggest]);

  const handleSelect = (selectedS: string) => {
    setItems((prev) => [...prev, selectedS]);
    setValue("");
    setShowSuggestions(false);
    setActiveSuggest(0);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleInputFocus = useCallback(() => {
    if (computedSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [computedSuggestions]);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggest(0);
    }, 150);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        {...rest}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type="text"
        placeholder="Enter to submit"
        className="block rounded-md max-w-40 bg-gray-950 px-3 py-2 text-white focus:outline-none"
      />

      <div
        className={clsx(
          "absolute top-full left-0 z-10 w-full space-y-1 rounded-2xl border bg-white p-2 shadow-md transition-all",
          {
            "opacity-100 visible translate-y-2": showSuggestions,
            "opacity-0 invisible -translate-y-2": !showSuggestions,
          },
        )}
      >
        {computedSuggestions.map((s, i) => (
          <div
            key={s}
            className={clsx(
              "cursor-pointer rounded-2xl px-2 py-1 text-sm font-medium transition-all hover:bg-orange-500 hover:text-white",
              {
                "bg-orange-500 text-white": i === activeSuggest,
              },
            )}
            onClick={() => handleSelect(s)}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(AutocompleteInput);
