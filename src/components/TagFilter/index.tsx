import { Dispatch, FC, memo, SetStateAction } from "react";
import Filter from "../Filter";

interface TagFilterProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

const suggestions: string[] = [];

const TagFilter: FC<TagFilterProps> = ({ tags, setTags }) => {
  return (
    <Filter
      title="Tag"
      suggestions={suggestions}
      items={tags}
      setItems={setTags}
    />
  );
};

export default memo(TagFilter);
