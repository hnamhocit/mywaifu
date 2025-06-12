"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IImage, NekosAPIQueryParams } from "@/interfaces";
import MyImage from "../MyImage";
import MyPagination from "./MyPagination";
import { toast } from "sonner";
import SkeletonImage from "../SkeletonImage";
import FilterDialog from "./FilterDialog";

const ITEMS_PER_PAGE = 32;

const ImageGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<IImage[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const fetchImages = async (config?: NekosAPIQueryParams) => {
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
      const url = `/api/images?${queryParams.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch images from your API route.",
        );
      }

      const data = await response.json();
      setImages(data.items); // Assuming data.items holds the array of images
      setCount(data.count); // Assuming data.count holds the total count
    } catch (e: any) {
      toast.error(e.message || "An unknown error occurred."); // More user-friendly error
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [ratings, tags, page]);

  useEffect(() => {
    fetchImagesWithFilter();
  }, []);

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setPage(page);
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
      <FilterDialog
        ratings={ratings}
        tags={tags}
        setTags={setTags}
        setRatings={setRatings}
        isLoading={isLoading}
        fetchImagesWithFilter={fetchImagesWithFilter}
      />

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
