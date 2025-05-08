import { Movie } from "./Movie";

export interface ApiResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
