import { Dispatch, FC, SetStateAction } from "react";
import Filter from "../Filter";

interface RatingFilterProps {
  ratings: string[];
  setRatings: Dispatch<SetStateAction<string[]>>;
}

const suggestions = ["safe", "suggestive", "borderline", "explicit"];

const RatingFilter: FC<RatingFilterProps> = ({ ratings, setRatings }) => {
  return (
    <Filter
      title="Rating"
      suggestions={suggestions}
      items={ratings}
      setItems={setRatings}
    />
  );
};

export default RatingFilter;
