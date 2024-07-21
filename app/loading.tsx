import React from 'react';
import { Card, Skeleton, Spinner } from '@nextui-org/react';

const SkeletonCarousel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center m-10 space-y-5">
      <Spinner />
      <h1 className='font-bold text-xl'>Reactions Loading!</h1>
    </div>
  );
};

export default SkeletonCarousel;
