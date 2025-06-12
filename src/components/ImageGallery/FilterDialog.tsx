import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Funnel } from "lucide-react";
import RatingFilter from "../RatingFilter";
import TagFilter from "../TagFilter";
import { Dispatch, FC, memo, SetStateAction } from "react";

interface FilterDialogProps {
  ratings: string[];
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  setRatings: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  fetchImagesWithFilter: () => Promise<void>;
}

const FilterDialog: FC<FilterDialogProps> = ({
  ratings,
  tags,
  isLoading,
  fetchImagesWithFilter,
  setTags,
  setRatings,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Funnel />
          Filter ({ratings.length + tags.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        <RatingFilter ratings={ratings} setRatings={setRatings} />

        <TagFilter tags={tags} setTags={setTags} />

        <div className="flex items-center justify-end gap-3">
          <Button
            variant="destructive"
            onClick={() => {
              setTags([]);
              setRatings([]);
            }}
          >
            Reset
          </Button>

          <Button disabled={isLoading} onClick={fetchImagesWithFilter}>
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(FilterDialog);
