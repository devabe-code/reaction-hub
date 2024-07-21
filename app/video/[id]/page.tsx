import * as React from 'react';
import { videos_by_episode, videos_by_season } from '@/utils/video_collection';
import VideoCarousel from '@/app/components/video_carousel';
import Loading from '@/app/loading';
import VideoStack from '@/app/components/vid_stack';
import { Button } from '@nextui-org/react';
import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';

const VideoPage = async ({ params }: { params: { id: string } }) => {
  const videoURL = decodeURIComponent(params.id).split('+');
  const videoParams = {
    episode: videoURL[0],
    database: videoURL[1],
    collection: videoURL[2],
  };

  // Fetch video information
  const videoInfo = await videos_by_episode(videoParams.database, videoParams.collection, videoParams.episode);
  if (!videoInfo) return null;

  // Check if first-link exists and split it
  const streamableID = videoInfo['first-link'].split('/').pop();

  // Get related videos information
  const relatedVideosRaw = await videos_by_season(videoParams.database, videoParams.collection);

  // Serialize the relatedVideos data
  const relatedVideos = relatedVideosRaw.map(video => JSON.parse(JSON.stringify(video)));

  return (
    <main className="md:w-3/4 w-full mx-auto">
      <React.Suspense fallback={<Loading />}>
        {/* Video */}
          {/* Video Player */}
          <section className="flex flex-col justify-center items-center md:m-10">
          <div className='m-2'>
            <h1 className='md:text-3xl text-xl uppercase font-bold'>{videoInfo.title}</h1>
          </div>
            <VideoStack
              videoId={streamableID}
              anime={videoParams.database.replace('_', ' ')}
              episode={videoInfo.episode}
              thumbnail={videoInfo.thumbnail}
            />
              <Link target='_blank' href={videoInfo['second-link']}>
                <Button variant='light'>
                  <FaGoogle />
                  <h2 className='text-xl'>Google Drive</h2>
                </Button>
            </Link>
          </section>
        {/* Related Videos */}
        <section className="my-8">
          <VideoCarousel videos={relatedVideos} anime={videoParams.database} season={videoParams.collection} />
        </section>
      </React.Suspense>
    </main>
  );
};

export default VideoPage;
