'use client';
import { SearchProps } from '@/types/data_types';
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import * as React from 'react';

const Search: React.FC<SearchProps> = ({closeModal}) => {
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

    const handleAnimeSearch = (value: string) => {
        setAnimeSearch(value);
    };

    const handleSeasonSearch = (value: string) => {
        setSeasonSearch(value);
    };

    const handleEpisodeSearch = (value: string) => {
        setEpisodeSearch(value);
    };

    const handleSearch = async () => {
        if (animeSearch && !seasonSearch && !episodeSearch) {
            router.push(`/anime_search?search=${animeSearch.replaceAll(' ', '_')}`);
        }
            
        else if (animeSearch && seasonSearch && !episodeSearch)
            router.push(`/season_search?anime=${animeSearch.replaceAll(' ', '_')}&season=${seasonSearch.replaceAll(' ', '_')}`);
        
        else if (animeSearch && seasonSearch && episodeSearch)
            router.push(`/video/${[episodeSearch + "+" + animeSearch.replaceAll(' ', '_') + "+" + seasonSearch.replaceAll(' ', '_')]}`);

        closeModal();
    };

    return (
        <div id='site-search' className='flex flex-col items-center'>
            <Autocomplete
                type='search'
                label='Anime'
                variant='underlined'
                className='max-w-xs'
                isClearable={false}
                onInputChange={handleAnimeSearch}
            >
                {animeOptions.map((value, index) => {
                    let anime_name = value;
                    anime_name = anime_name.replaceAll('_', ' ');
                    return (
                        <AutocompleteItem key={index} className='uppercase'>{anime_name}</AutocompleteItem>
                    )
                }
                )}
            </Autocomplete>
            <Autocomplete
                type='search'
                label='Season'
                isDisabled={animeSearch.length === 0}
                variant='underlined'
                isClearable={false}
                onInputChange={handleSeasonSearch}
                className='max-w-xs'
            >
                {seasonOptions.map((value, index) => {
                    let anime_season = value;
                    anime_season = anime_season.replaceAll('_', ' ')
                    return (
                        <AutocompleteItem key={index} className='uppercase'>{anime_season}</AutocompleteItem>
                    )
                })}
            </Autocomplete>
            <Autocomplete
                type='search'
                label='Episode'
                isDisabled={seasonSearch.length === 0}
                variant='underlined'
                isClearable={false}
                onInputChange={handleEpisodeSearch}
                className='max-w-xs'
            >
                {episodeOptions.map((value, index) => {
                    let anime_ep = value;
                    anime_ep = anime_ep.replaceAll('_', ' ')
                    return (
                        <AutocompleteItem key={index} className='uppercase'>{anime_ep}</AutocompleteItem>
                    )
                })}
            </Autocomplete>
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
