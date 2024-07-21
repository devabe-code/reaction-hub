import React from 'react';
import { fetchData } from '@/utils/fetchData';
import VideoCard from '../components/video_card';
import { Video } from '@/types/data_types';
import { Divider } from '@nextui-org/react';
import { DividerVerticalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface SeasonSearchProps {
  searchParams?: {
    anime?: string;
    season?: string;
  };
}

const SeasonSearch: React.FC<SeasonSearchProps> = async ({ searchParams }) => {
  const anime = searchParams?.anime || '';
  const season = searchParams?.season || '';

  // Fetch video data for the given anime and season
  const videos: Video[] = await fetchData(anime, season);

  return (
    <main className="p-10 w-full mx-auto">
      <div id='row-title' className='flex flex-col sm:flex-row items-center'>
        <h1 className="font-bold text-xl uppercase">{anime.replaceAll('_', ' ')}</h1>
        <DividerVerticalIcon className='hidden sm:flex'/>
        <span className='font-bold uppercase opacity-60'>{season.replaceAll('_', ' ')}</span>
      </div>
      <Divider className='my-4'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map(video => (
            <Link href={`/video/${[video.episode + "+" + anime + "+" + season]}`} key={video._id}>
                <VideoCard title={video.title} thumbnail={video.thumbnail} />
            </Link>
          ))
        ) : (
          <p>No videos found for this season.</p>
        )}
      </div>
    </main>
  );
};

export default SeasonSearch;
