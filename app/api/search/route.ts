import { NextRequest, NextResponse } from 'next/server';
import { get_databases, fetchCollections, fetchData } from '@/utils/fetchData';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const anime = searchParams.get('anime');
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');
    const type = searchParams.get('type');

    if (type === 'anime') {
        const dbArr = await get_databases();
        const animeOptions = dbArr.map(db => db.name);
        return NextResponse.json(animeOptions);
    }

    if (type === 'season' && anime) {
        const animeDbName = anime.replace(/ /g, '_');
        const seasonOptions = await fetchCollections(animeDbName);
        return NextResponse.json(seasonOptions);
    }

    if (type === 'episode' && anime && season) {
        const animeDbName = anime.replace(/ /g, '_');
        const episodeOptions = await fetchData(animeDbName, season);
        const episodes = episodeOptions.map(episode => episode.episode);
        return NextResponse.json(episodes);
    }

    if (anime && season && episode) {
        const animeDbName = anime.replace(/ /g, '_');
        const videos = await fetchData(animeDbName, season);
        const filteredVideos = videos.filter((video: { episode: string; }) => video.episode === episode);
        return NextResponse.json(filteredVideos);
    }

    if (anime && season) {
        const animeDbName = anime.replace(/ /g, '_');
        const videos = await fetchData(animeDbName, season);
        return NextResponse.json(videos);
    }

    if (anime) {
        const animeDbName = anime.replace(/ /g, '_');
        const seasons = await fetchCollections(animeDbName);
        const videoData = [];
        for (const season of seasons) {
            const videos = await fetchData(animeDbName, season);
            videoData.push({ ...videos, anime: animeDbName, season });
        }
        return NextResponse.json(videoData);
    }

    return NextResponse.json({ error: 'Invalid search parameters' }, { status: 400 });
}
