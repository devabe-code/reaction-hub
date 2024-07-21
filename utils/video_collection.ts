import { fetchCollections, fetchData } from '@/utils/fetchData';
import { Video } from '@/types/data_types';
import clientPromise from '@/lib/mongodb';

export const videos_by_anime = async (anime: string) => {
  const videoData = [];
  const seasons = await fetchCollections(anime);

  for (const season of seasons) {
    const videos = await fetchData(anime, season);
    videoData.push({ ...videos, anime, season });
  }
  return videoData;
}

export const videos_by_season = async (database: string, collection: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  const data = await db.collection(collection).find({}).toArray();

  const plainData = data.map(doc => JSON.parse(JSON.stringify(doc)));
  return plainData;
};

export const videos_by_episode = async (database: string, collection: string, episode: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  console.log(episode);
  const data = await db.collection(collection).findOne({ episode: episode });
  if (!data) return null;

  // Convert the MongoDB document to a plain object
  const plainData = JSON.parse(JSON.stringify(data));
  return plainData;
}

export const latest_videos = async (): Promise<{ anime: string, videos: Video[], season: string }[]> => {
  const latest_reactions = await fetchCollections("latest_reactions");
  const videoData: { videos: Video[], anime: string, season: string }[] = [];

  for (const reaction of latest_reactions) {
    const latest = await fetchData("latest_reactions", reaction);
    const anime = reaction;

    if (latest.length > 0) {
      for (const entry of latest) {
        const { season } = entry;
        const videos = await fetchData(anime, season);

        // Serialize the video data
        const serializedVideos = videos.map(video => JSON.parse(JSON.stringify(video)));
        videoData.push({ videos: serializedVideos, anime: anime, season: season });
      }
    } else {
      const videos = await fetchData(anime, 'one');

      // Serialize the video data
      const serializedVideos = videos.map(video => JSON.parse(JSON.stringify(video)));
      videoData.push({ videos: serializedVideos, anime: anime, season: 'Season One' });
    }
  }

  return videoData;
};

export const current_reactions = async () => {
  const client = await clientPromise;
  const db = client.db('current_videos');
  const data = await db.collection('recent_uploads').find({}).toArray();

  const plainData = data.map(doc => JSON.parse(JSON.stringify(doc)));
  return plainData;
}
