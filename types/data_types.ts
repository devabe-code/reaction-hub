import { ObjectId } from "mongodb";
import { Key } from "react";

export interface Video {
  season: any;
  anime: any;
  _id: string;
  title: string;
  episode: string;
  'first-link': string;
  'second-link': string;
  thumbnail: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  genres: { name: string }[];
  type: string;
  episodes?: Episode[]; // Ensure episodes is optional if it is not always provided
  image_url?: string;   // Include image_url if needed
}

export interface AnimeDatabase {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  synopsis: string;
  score: number;
  scored_by: number;
  type: string;
  aired: { string: string };
  broadcast: { string: string };
  status: string;
  genres: { name: string }[];
}


export interface Episode {
  mal_id: number;
  title: string;
  synopsis: string;
}

export interface Series {
  id: string;
  name: string;
  season: string;
}

export interface SearchProps {
  closeModal: () => void;
}

export interface VideoCardProps {
  title: string,
  thumbnail: string,
}

export interface CarouselProps {
  videos: Video[];
  anime: string,
  season: string,
}

export interface HeroCarouselProps {
  videos: Video[];
}

export interface VideoPlayerProps {
  videoId: string;
  anime: string;
  episode: string;
  thumbnail: string;
}

export interface DatabaseInfo {
  name: string;
}

export interface AnimeCardProps {
  _id: Key
  name: string;
  image: string;
  type: string;
  premiered: string;
  status: string;
  genres: string[];
}

export interface LatestVideoProps {
  thumbnail: string;
  title: string;
  anime: string;
  season: string;
  episode: string;
}
