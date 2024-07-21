import React from 'react';
import AnimeCard from "@/app/components/anime_card";
import { fetchAnimeInfo, get_databases } from "@/utils/fetchData";
import { AnimeCardProps } from "@/types/data_types";
import Link from 'next/link';

const AllAnime = async () => {
  const animeList: AnimeCardProps[] = await fetchAnimeInfo();

  return (
    <main className='flex flex-col m-10 items-center justify-center gap-4'>
      <h1 className="text-4xl font-bold my-8 uppercase">All Reactions</h1>
      <div className='flex flex-wrap justify-center gap-6'>
        {animeList.map((anime, index) => (
          <Link key={index} href={`/anime_search?search=${anime.name.replaceAll(' ', '_')}`}>
            <AnimeCard
              key={anime._id}
              name={anime.name}
              image={anime.image}
              type={anime.type}
              status={anime.status} _id={''} premiered={''} genres={[]}        
              />
            </Link>
        ))}
      </div>
    </main>
  );
};

export default AllAnime;

