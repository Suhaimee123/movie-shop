export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  price: number;
}



export interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  price: number;

  onAddToCart: (movie: Movie) => void;
}

export interface MovieCardCartProps {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  onCardAction: () => void;
}


export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  release_date: string;
  budget: number;
  revenue: number;
  homepage: string;
  backdrop_path: string | null;
  production_countries: Country[];
}
