"use client";
import * as React from 'react';
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { CarouselProps } from '@/types/data_types';
import Image from 'next/image';
import Carousel, { ButtonGroupProps, DotProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ArrowLeftIcon, ArrowRightIcon, DividerVerticalIcon, DotFilledIcon, DotIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Loading from '@/app/loading';

const ButtonGroup: React.FC<ButtonGroupProps> = ({ next, previous, carouselState }) => {
  const { currentSlide, slidesToShow, totalItems } = carouselState!;

  return (
    <div className="flex justify-between">
      <Button variant='light' isIconOnly isDisabled={currentSlide === 0} onClick={previous}>
        <ArrowLeftIcon />
      </Button>
      <Button variant='light' isIconOnly isDisabled={currentSlide >= totalItems - slidesToShow} onClick={next}>
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

const CustomDot: React.FC<DotProps> = ({ onClick, ...rest }) => {
  const { active } = rest;

  return (
    <Button
      variant='light'
      isIconOnly
      className=''
      onClick={onClick}
    >
      {active ? <DotFilledIcon className='text-primary' /> : <DotIcon />}
    </Button>
  );
};

const VideoCarousel: React.FC<CarouselProps> = ({ videos, anime, season }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2560 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 615, min: 0 },
      items: 1
    }
  };

  return (
    <div id='video-carousel' className=''>
      <div id='row-title' className='flex flex-col sm:flex-row items-center'>
        <h1 className="font-bold uppercase">{anime.replaceAll('_', ' ')}</h1>
        <DividerVerticalIcon className='hidden sm:flex'/>
        <span className='font-bold uppercase opacity-60'>{season.replaceAll('_', ' ')}</span>
      </div>
      <Divider />
      <div id="carousel" className="flex flex-col items-center">
        <Carousel
          containerClass="container"
          draggable
          focusOnSelect={true}
          infinite={false}
          keyBoardControl
          minimumTouchDrag={100}
          responsive={responsive}
          slidesToSlide={1}
          swipeable={true}
          arrows={false}
          customButtonGroup={<ButtonGroup />}
          renderButtonGroupOutside={true}
          showDots={true}
          customDot={<CustomDot />}
        >
          {videos.map((video, index) => {
            const episode_numbers = video.episode.replace('.mp4', '');
            return (
              <React.Suspense key={index} fallback={<div>Loading...</div>}>
                <Link href={`/video/${[video.episode + "+" + anime + "+" + season]}`} key={index}>
                  <Card className="m-4 mb-12 hover:scale-105" isPressable isHoverable>
                      <Image
                        alt="Card Thumbnail"
                        className="rounded-xl w-auto h-auto"
                        width={400}
                        height={100}
                        src={video.thumbnail}
                        priority={true}
                      />
                  </Card>
                </Link>
              </React.Suspense>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default VideoCarousel;
