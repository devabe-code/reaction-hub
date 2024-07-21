'use client';
import { SearchProps } from '@/types/data_types';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const Search: React.FC<SearchProps> = ({ closeModal }) => {
  const [animeSearch, setAnimeSearch] = React.useState<string>('');
  const [seasonSearch, setSeasonSearch] = React.useState<string>('');
  const [episodeSearch, setEpisodeSearch] = React.useState<string>('');
  const [animeOptions, setAnimeOptions] = React.useState<string[]>([]);
  const [seasonOptions, setSeasonOptions] = React.useState<string[]>([]);
  const [episodeOptions, setEpisodeOptions] = React.useState<string[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchAnimeOptions = async () => {
      try {
        const response = await fetch('/api/search?type=anime');
        if (response.ok) {
          const data = await response.json();
          setAnimeOptions(data);
        } else {
          console.error('Failed to fetch anime options');
        }
      } catch (error) {
        console.error('Error fetching anime options', error);
      }
    };

    fetchAnimeOptions();
  }, []);

  React.useEffect(() => {
    if (animeSearch) {
      const fetchSeasonOptions = async () => {
        try {
          const response = await fetch(`/api/search?anime=${encodeURIComponent(animeSearch)}&type=season`);
          if (response.ok) {
            const data = await response.json();
            setSeasonOptions(data);
          } else {
            console.error('Failed to fetch season options');
          }
        } catch (error) {
          console.error('Error fetching season options', error);
        }
      };

      fetchSeasonOptions();
    } else {
      setSeasonOptions([]);
    }
  }, [animeSearch]);

  React.useEffect(() => {
    if (seasonSearch) {
      const fetchEpisodeOptions = async () => {
        try {
          const response = await fetch(`/api/search?anime=${encodeURIComponent(animeSearch)}&season=${encodeURIComponent(seasonSearch.replaceAll(' ', '_'))}&type=episode`);
          if (response.ok) {
            const data = await response.json();
            setEpisodeOptions(data);
          } else {
            console.error('Failed to fetch episode options');
          }
        } catch (error) {
          console.error('Error fetching episode options', error);
        }
      };

      fetchEpisodeOptions();
    } else {
      setEpisodeOptions([]);
    }
  }, [seasonSearch]);

  const handleAnimeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimeSearch(event.target.value);
  };

  const handleSeasonSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeasonSearch(event.target.value);
  };

  const handleEpisodeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEpisodeSearch(event.target.value);
  };

  const handleSearch = async () => {
    if (animeSearch && !seasonSearch && !episodeSearch) {
      router.push(`/anime_search?search=${animeSearch.replaceAll(' ', '_')}`);
    } else if (animeSearch && seasonSearch && !episodeSearch) {
      router.push(`/season_search?anime=${animeSearch.replaceAll(' ', '_')}&season=${seasonSearch.replaceAll(' ', '_')}`);
    } else if (animeSearch && seasonSearch && episodeSearch) {
      router.push(`/video/${[episodeSearch + "+" + animeSearch.replaceAll(' ', '_') + "+" + seasonSearch.replaceAll(' ', '_')]}`);
    }

    closeModal();
  };

  return (
    <div id='site-search' className='flex flex-col items-center p-4 rounded-lg shadow-lg'>
      <div className='w-full max-w-xs mb-4'>
        <label htmlFor='anime-search' className='block text-sm font-medium '>Anime</label>
        <input
          id='anime-search'
          type='search'
          list='anime-options'
          placeholder='Search Anime'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={animeSearch}
          onChange={handleAnimeSearch}
        />
        <datalist id='anime-options'>
          {animeOptions.map((value, index) => (
            <option key={index} value={value.replaceAll('_', ' ')} />
          ))}
        </datalist>
      </div>
      
      <div className='w-full max-w-xs mb-4'>
        <label htmlFor='season-search' className='block text-sm font-medium'>Season</label>
        <input
          id='season-search'
          type='search'
          list='season-options'
          placeholder='Search Season'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={seasonSearch}
          onChange={handleSeasonSearch}
          disabled={!animeSearch}
        />
        <datalist id='season-options'>
          {seasonOptions.map((value, index) => (
            <option key={index} value={value.replaceAll('_', ' ')} />
          ))}
        </datalist>
      </div>

      <div className='w-full max-w-xs mb-4'>
        <label htmlFor='episode-search' className='block text-sm font-medium'>Episode</label>
        <input
          id='episode-search'
          type='search'
          list='episode-options'
          placeholder='Search Episode'
          className='w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={episodeSearch}
          onChange={handleEpisodeSearch}
          disabled={!seasonSearch}
        />
        <datalist id='episode-options'>
          {episodeOptions.map((value, index) => (
            <option key={index} value={value.replaceAll('_', ' ')} />
          ))}
        </datalist>
      </div>

      <Button
        color='primary'
        variant='flat'
        className='m-6'
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
