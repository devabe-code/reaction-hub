import { fetchCollections, fetchData } from '@/utils/fetchData';
import React from 'react';
import VideoCarousel from '../components/video_carousel';
export const revalidate = 10;

interface AnimeSearchProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

const AnimeSearch: React.FC<AnimeSearchProps> = async ({ searchParams }) => {
  const search = searchParams?.search || '';

  // Fetch the seasons
  const seasons = await fetchCollections(search);

  // Fetch videos for each season
  const videosByAnime = await Promise.all(
    seasons.map(async (season) => {
      const videos = await fetchData(search, season);
      return { season, videos };
    })
  );

  return (
    <main className='w-full m-4'>
      <div>
        {videosByAnime.length > 0 ? (
          videosByAnime.map(({ season, videos }) => (
            <VideoCarousel key={season} videos={videos} anime={search} season={season} />
          ))
        ) : (
          <p>No seasons found</p>
        )}
      </div>
    </main>
  );
};

export default AnimeSearch;
