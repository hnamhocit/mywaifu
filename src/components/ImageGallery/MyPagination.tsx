import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface MyPaginationProps {
  page: number;
  isLoading: boolean;
  totalPages: number;
  onChange: (value: number) => void;
  pageNumbers: (string | number)[];
}

const MyPagination: FC<MyPaginationProps> = ({
  page,
  isLoading,
  totalPages,
  onChange,
  pageNumbers,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onChange(page - 1)}
            aria-disabled={page === 1 || isLoading} // Disabled khi ở trang 1 hoặc đang loading
            tabIndex={page === 1 || isLoading ? -1 : undefined}
            className={
              page === 1 || isLoading ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((_page, index) => (
          <PaginationItem key={index}>
            {_page === "ellipsis-start" || _page === "ellipsis-end" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onChange(_page as number)}
                isActive={page === _page}
                aria-disabled={isLoading} // Disabled khi đang loading
                tabIndex={isLoading ? -1 : undefined}
                className={isLoading ? "pointer-events-none opacity-50" : ""}
              >
                {_page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onChange(page + 1)}
            aria-disabled={page === totalPages || isLoading} // Disabled khi ở trang cuối hoặc đang loading
            tabIndex={page === totalPages || isLoading ? -1 : undefined}
            className={
              page === totalPages || isLoading
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MyPagination;
