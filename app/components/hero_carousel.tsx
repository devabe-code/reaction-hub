'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa6';
import { DividerVerticalIcon } from '@radix-ui/react-icons';

interface Video {
  thumbnail: string;
  title: string;
  anime: string;
  season: string;
  episode: string;
}

interface HeroCarouselProps {
  videos: Video[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        setFade(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
      setFade(false);
    }, 500);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setFade(false);
    }, 500);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-lg">
      <div className={`relative flex w-full h-full items-center transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col justify-center p-8 w-1/2 z-10">
          <h1 className='lg:text-4xl text-xl font-bold text-white'>{currentVideo.title}</h1>
          <div className='flex items-center my-4'>
            <h2 className="lg:text-xl text-m font-semibold uppercase text-white">{currentVideo.anime.replaceAll('_', ' ')}</h2>
            <DividerVerticalIcon className='mx-2' />
            <span className='lg:text-lg text-sm uppercase text-white'>{currentVideo.season.replaceAll('_', ' ')}</span>
          </div>
          <Link href={`/video/${[currentVideo.episode + "+" + currentVideo.anime + "+" + currentVideo.season]}`} key={currentIndex}>
            <Button className='bg-primary uppercase font-bold text-white flex items-center'><FaPlay className='mr-2' />Play Now</Button>
          </Link>
        </div>
        <div className="relative w-2/3 h-full overflow-hidden">
          <Link href={`/video/${[currentVideo.episode + "+" + currentVideo.anime + "+" + currentVideo.season]}`} key={currentIndex}>
            <Image
              src={currentVideo.thumbnail}
              alt={'Hero Thumbnail'}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className={`rounded-lg transform transition-transform duration-500 ease-in-out ${!fade ? 'scale-105' : ''}`}
            />
          </Link>
          <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent'></div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-around z-10">
        <Button variant='light' isIconOnly onClick={handlePrev}>
          <FaArrowLeft className='text-primary'/>
        </Button>
        <Button variant='light' isIconOnly onClick={handleNext}>
          <FaArrowRight className='text-primary'/>
        </Button>
      </div>
    </div>
  );
};

export default HeroCarousel;
