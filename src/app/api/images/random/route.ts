import { api } from "@/config";
import { NekosAPIQueryParams } from "@/interfaces";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rating = searchParams.get("rating"); // e.g., 'explicit'
  const limit = searchParams.get("limit"); // e.g., '100'
  const artist = searchParams.get("artist"); // Array of integers (comma-separated for URL)
  const tags = searchParams.get("tags"); // Array of strings (comma-separated for URL)
  const without_tags = searchParams.get("without_tags"); // Array of strings (comma-separated for URL)
  const offset = searchParams.get("offset"); // Integer

  const params: NekosAPIQueryParams = {};
  if (rating) params.rating = rating;
  if (limit) params.limit = limit;
  if (artist) params.artist = artist;
  if (tags) params.tags = tags;
  if (without_tags) params.without_tags = without_tags;
  if (offset) params.offset = offset;

  try {
    const response = await api.get("images/random", { params });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching from Nekos API:", error.message);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
