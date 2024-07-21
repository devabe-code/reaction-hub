"use client";
import * as React from 'react';
import { Button, Card, Divider } from '@nextui-org/react';
import { CarouselProps } from '@/types/data_types';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, DividerVerticalIcon, DotFilledIcon, DotIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const VideoCarousel: React.FC<CarouselProps> = ({ videos, anime, season }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(3);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);
  const isDragging = React.useRef(false);

  React.useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 640) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    // Update items to show on initial load
    updateItemsToShow();

    // Update items to show on window resize
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < videos.length - itemsToShow ? prev + 1 : prev));
  };

  const getVisibleDots = (total: number) => {
    if (total <= 10) {
      return Array.from({ length: total }, (_, i) => i);
    }
    const step = Math.floor((total - 1) / 9); // Calculate step size
    const dots = Array.from({ length: 9 }, (_, i) => i * step);
    dots.push(total - 1); // Ensure the last dot points to the last video
    return dots;
  };

  const visibleDots = getVisibleDots(videos.length);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startX.current = 'touches' in e ? e.touches[0].pageX - carouselRef.current!.offsetLeft : e.pageX - carouselRef.current!.offsetLeft;
    scrollLeft.current = carouselRef.current!.scrollLeft;
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  const dragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = 'touches' in e ? e.touches[0].pageX - carouselRef.current!.offsetLeft : e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll-fast
    carouselRef.current!.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div id='video-carousel' className=''>
      <div id='row-title' className='flex flex-col sm:flex-row items-center'>
        <h1 className="font-bold uppercase">{anime.replaceAll('_', ' ')}</h1>
        <DividerVerticalIcon className='hidden sm:flex'/>
        <span className='font-bold uppercase opacity-60'>{season.replaceAll('_', ' ')}</span>
      </div>
      <Divider />
      <div
        id="carousel"
        className="flex flex-col items-center"
        ref={carouselRef}
        onMouseDown={startDrag}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onMouseMove={dragMove}
        onTouchStart={startDrag}
        onTouchEnd={endDrag}
        onTouchMove={dragMove}
      >
        <div className="relative w-full overflow-hidden">
          <div className="flex transition-transform ease-out duration-300" style={{ transform: `translateX(-${currentSlide * (100 / itemsToShow)}%)` }}>
            {videos.map((video, index) => (
              <div key={index} className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 flex justify-center`}>
                <Link href={`/video/${[video.episode + "+" + anime + "+" + season]}`}>
                  <Card className="m-4 mb-12 hover:scale-105" isPressable isHoverable>
                    <Image
                      alt="Card Thumbnail"
                      className="rounded-xl w-full h-auto"
                      width={400}
                      height={100}
                      src={video.thumbnail}
                      priority={true}
                    />
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant='light' isIconOnly isDisabled={currentSlide === 0} onClick={handlePrev}>
            <ArrowLeftIcon />
          </Button>
          <Button variant='light' isIconOnly isDisabled={currentSlide >= videos.length - itemsToShow} onClick={handleNext}>
            <ArrowRightIcon />
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          {visibleDots.map((dotIndex) => (
            <Button
              key={dotIndex}
              variant='light'
              isIconOnly
              onClick={() => setCurrentSlide(dotIndex)}
            >
              {currentSlide === dotIndex ? <DotFilledIcon className='text-primary' /> : <DotIcon />}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
