'use client'
import { VideoCardProps } from '@/types/data_types'
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

const VideoCard: React.FC<VideoCardProps> = ({title, thumbnail}) => {
    return (
    <Card
        isHoverable
        isPressable
        isFooterBlurred
        radius="sm"
        className="border-none hover:scale-105"
    >
        <Image
            alt=""
            className=""
            height={400}
            src={thumbnail}
            width={400} />
    </Card>
    )
}

export default VideoCard