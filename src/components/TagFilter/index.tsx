import { Dispatch, FC, SetStateAction } from "react";
import Filter from "../Filter";

interface RatingFilterProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const suggestions = ["safe", "suggestive", "borderline", "explicit"];

const RatingFilter: FC<RatingFilterProps> = ({ tags, setTags }) => {
  return (
    <Filter
      title="Tag"
      suggestions={suggestions}
      items={tags}
      setItems={setTags}
    />
  );
};

export default RatingFilter;
