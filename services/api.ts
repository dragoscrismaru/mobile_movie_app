export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
  sort_by,
}: {
  query: string;
  sort_by?: string;
}) => {
  let endpoint;
  if (query) {
    endpoint = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}`;
    // Add sort_by if provided with query
    if (sort_by) {
      endpoint += `&sort_by=${encodeURIComponent(sort_by)}`;
    }
  } else {
    // Use discover endpoint with sort_by or default
    endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=${
      sort_by ? encodeURIComponent(sort_by) : "popularity.desc"
    }`;
  }
  console.log(endpoint);

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};
