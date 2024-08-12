import React from 'react';
import VideoCarousel from '@/app/components/video_carousel';
import HeroCarousel from '@/app/components/hero_carousel';
import { latest_videos, current_reactions } from '@/utils/video_collection';
import Adsense from './components/adsense';


const Home = async () => {
  const latestVideos = await latest_videos();
  const currVideos = await current_reactions();

  return (
    <main className='flex flex-col items-center justify-center'>
      <head>
        <Adsense />
      </head>
      <div id='hero' className='w-svw hidden sm:block bg-black m-2'>
        {currVideos.length > 0 && <HeroCarousel videos={currVideos} />}
      </div>
      <div id='latest-reactions' className='w-2/3 mt-8'>
        {latestVideos.map((anime, index) => (
          <VideoCarousel key={index} videos={anime.videos} anime={anime.anime} season={anime.season} />
        ))}
      </div>
    </main>
  );
};

export default Home;