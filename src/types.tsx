interface genres {
  id: number;
  name: string;
}

interface Episode {
  id: string;
  name: string;
  season_number: string;
  air_date: string;
  episode_number: string;
  overview: string;
  still_path: string;
  vote_average: string;
  vote_count: string;
}

export interface MultimediaData {
  id: number;
  name: string;
  title: string;
  original_name: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Array<genres>;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  homepage: string;
  last_episode_to_air: Episode;
  episode_run_time: Array<number>;
  number_of_seasons: number;
}
