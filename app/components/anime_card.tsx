import React from "react";
import Image from "next/image";
import { AnimeCardProps } from "@/types/data_types";

const AnimeCard: React.FC<AnimeCardProps> = ({
  name,
  image,
  type,
  status,
}) => {
  return (
    <div className="relative w-52 h-72 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer">
      <div className="w-full h-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="text-white text-center p-4">
          <h3 className="text-xl font-semibold uppercase">{name.replaceAll('_', ' ')}</h3>
          <p className="text-sm mt-2"><strong>Type:</strong> {type.toUpperCase()}</p>
          <p className="text-sm"><strong>Status:</strong> {status.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
