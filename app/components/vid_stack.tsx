'use client'
import * as React from 'react'
import axios from 'axios';
import { VideoPlayerProps } from '@/types/data_types'
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, isGoogleCastProvider, GoogleCastProvider, MediaProviderAdapter, MediaProviderSetupEvent } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { DownloadIcon } from '@vidstack/react/icons'
import Loading from '@/app/loading';
import { Button } from '@nextui-org/react';

function DownloadButton(videoUrl: string) {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'video.mp4'; // You can specify the default download filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button isIconOnly variant='light' onClick={handleDownload}>
      <DownloadIcon size={30} color='white' />
    </Button>
  )
}

const VideoStack: React.FC<VideoPlayerProps> = ({ videoId, anime, episode, thumbnail }) => {
  const [videoUrl, setVideoUrl] = React.useState<string>("");

  React.useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(`https://api.streamable.com/videos/${videoId}`);
        setVideoUrl(response.data.files.mp4.url);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchVideoUrl();
  }, [videoId]);

  return (
    <div>
      {videoUrl ? (
        <MediaPlayer
          className='capitalize'
          title={`${anime} ${episode}`}
          src={videoUrl}
          viewType='video'
          streamType='on-demand'
          crossOrigin
          playsInline
        >
          <MediaProvider>
            <Poster
              src={thumbnail}
              alt=''
              className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
            />
          </MediaProvider>
          <DefaultVideoLayout
            thumbnails={thumbnail}
            icons={defaultLayoutIcons}
            slots={{
              googleCastButton: DownloadButton(videoUrl),
            }}
            colorScheme='default' />
        </MediaPlayer>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default VideoStack