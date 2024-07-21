import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa6';
import { DividerVerticalIcon } from '@radix-ui/react-icons';

interface VideoCardProps {
  thumbnail: string;
  title: string;
  anime: string;
  season: string;
  episode: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, title, anime, season, episode }) => {
  return (
    <Link href={`/video/${[episode + "+" + anime + "+" + season]}`}>
    <div className="relative w-full p-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
        <Image
          src={thumbnail}
          alt={'Video Thumbnail'}
          width={500}
          height={300}
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className='absolute inset-0 bg-black opacity-40 rounded-lg'></div>
        <div className='absolute bottom-0 left-0 p-4'>
          <h3 className='text-lg font-semibold uppercase text-white'>{title}</h3>
          <div className='flex items-center my-2'>
            <h4 className="text-sm font-semibold uppercase text-white">{anime.replaceAll('_', ' ')}</h4>
            <DividerVerticalIcon className='text-white'/>
            <span className='text-sm  ml-2 uppercase text-white'>{season.replaceAll('_', ' ')}</span>
          </div>
          <Link href={`/video/${[episode + "+" + anime + "+" + season]}`}>
            <Button className='bg-primary uppercase font-bold text-white'><FaPlay />Play</Button>
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default VideoCard;
