import { Skeleton } from "@/components/ui/skeleton";

const SkeletonImage = () => {
  return (
    <div className="space-y-2 text-center animate-pulse">
      <Skeleton className="min-h-60 w-full rounded-md border-2 bg-gray-300 dark:bg-gray-700" />

      <Skeleton className="h-6 w-3/4 mx-auto rounded-md bg-gray-200 dark:bg-gray-600" />

      <Skeleton className="h-5 w-1/2 mx-auto rounded-md bg-gray-200 dark:bg-gray-600" />

      <div className="flex flex-wrap justify-center gap-1">
        <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-600" />
        <Skeleton className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-600" />
        <Skeleton className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-600" />
      </div>
    </div>
  );
};

export default SkeletonImage;
