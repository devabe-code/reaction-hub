import React from 'react';
import VideoCard from '@/app/components/latest_video';
import { current_reactions } from '@/utils/video_collection';

const LatestReactions = async () => {
  const currVideos = await current_reactions();

  return (
    <main className='flex flex-col items-center justify-center'>
      <h1 className="text-4xl font-bold my-8 uppercase">Latest Reactions</h1>
      <div className='flex flex-col items-center'>
        {currVideos.map((video, index) => (
          <VideoCard
            key={index}
            thumbnail={video.thumbnail}
            title={video.title}
            anime={video.anime}
            season={video.season}
            episode={video.episode}
          />
        ))}
      </div>
    </main>
  );
};

export default LatestReactions;
