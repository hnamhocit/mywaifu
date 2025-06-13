"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IImage, NekosAPIQueryParams } from "@/interfaces";
import MyImage from "../MyImage";
import MyPagination from "./MyPagination";
import { toast } from "sonner";
import SkeletonImage from "../SkeletonImage";
import FilterDialog from "./FilterDialog";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

const ITEMS_PER_PAGE = 32;

const ImageGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<IImage[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState<string[]>(["safe"]);
  const [tags, setTags] = useState<string[]>([]);
  const [isRandom, setIsRandom] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);
  const reloadBtnRef = useRef<HTMLButtonElement>(null);

  const fetchImages = useCallback(
    async (config?: NekosAPIQueryParams) => {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams();
        if (config) {
          for (const key in config) {
            const value = config[key as keyof NekosAPIQueryParams];
            if (value !== undefined && value !== null) {
              queryParams.append(key, value);
            }
          }
        }

        // Construct the URL with query parameters
        const queryString = queryParams.toString();
        const url = isRandom
          ? `/api/images/random?${queryString}`
          : `/api/images?${queryString}`;

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch images from your API route.",
          );
        }

        const data = await response.json();
        setImages(isRandom ? data : data.items);
        setCount(isRandom ? data.length : data.count);
      } catch (e: any) {
        toast.error(e.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    },
    [isRandom],
  );

  const fetchImagesWithFilter = useCallback(async () => {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const config: NekosAPIQueryParams = {
      offset: String(offset),
      limit: String(ITEMS_PER_PAGE),
    };

    if (ratings.length > 0) {
      config.rating = ratings.join(",");
    }

    if (tags.length > 0) {
      config.tags = tags.join(",");
    }

    await fetchImages(config);
  }, [ratings, tags, page, fetchImages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRatings = localStorage.getItem("ratings");
      const storedTags = localStorage.getItem("tags");
      const storedPage = localStorage.getItem("page");

      if (storedRatings) {
        const parsedRatings = JSON.parse(storedRatings);
        setRatings(parsedRatings);
      }

      if (storedTags) {
        const parsedTags = JSON.parse(storedTags);
        setTags(parsedTags);
      }

      if (storedPage) {
        const parsedPage = JSON.parse(storedPage);
        setPage(Number(parsedPage));
      }

      setIsTrigger(true);
    }
  }, []);

  useEffect(() => {
    fetchImagesWithFilter();
  }, [isTrigger]);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  const toggleIsRandom = () => setIsRandom(!isRandom);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setPage(page);
      localStorage.setItem("page", page.toString());
      fetchImagesWithFilter();
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="container mx-auto space-y-7">
      <div className="flex items-center gap-3">
        <FilterDialog
          ratings={ratings}
          tags={tags}
          setTags={setTags}
          setRatings={setRatings}
          isLoading={isLoading}
          fetchImagesWithFilter={fetchImagesWithFilter}
        />

        <Button onClick={toggleIsRandom}>
          {isRandom ? "Random" : "Search"} Mode
        </Button>

        <Button ref={reloadBtnRef} size="icon" onClick={fetchImagesWithFilter}>
          <RefreshCw />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <SkeletonImage key={index} />
            ))
          : images.map((item) => <MyImage key={item.id} {...item} />)}
      </div>

      <MyPagination
        pageNumbers={pageNumbers}
        onChange={handlePageChange}
        page={page}
        isLoading={isLoading}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ImageGallery;
