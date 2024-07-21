import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';
import { DatabaseInfo } from '@/types/data_types';

export const get_databases = async () => {
  const dbArr: DatabaseInfo[] = [];

  const client = await clientPromise;
  const admin = client.db().admin();
  const dbList = await admin.listDatabases();
  dbList.databases.map((db) => {
    if (db.name != 'admin' && db.name != 'local' &&
        db.name != 'latest_reactions' && db.name != 'current_videos' && db.name != 'anime_info') {
      dbArr.push(db);
    }
  });

  return dbArr;
};

// Function to fetch collections (seasons) in the given database (anime)
const fetchCollections = async (database: string): Promise<string[]> => {
  const client = await clientPromise;
  const db = client.db(database);
  const collections = await db.listCollections().toArray();
  return collections.map(collection => collection.name);
};

// Function to fetch data (videos) from a specific collection (season) in the database (anime)
const fetchData = async (database: string, collection: string): Promise<any[]> => {
  const client = await clientPromise;
  const db = client.db(database);
  const data = await db.collection(collection).find({}).toArray();

  // Convert the MongoDB documents to plain objects
  return data.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));
};

// Function to fetch data by ID
const fetchDataById = async (database: string, collection: string, id: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  const objectID = new ObjectId(id);
  const data = await db.collection(collection).findOne({ _id: objectID });
  if (!data) return null;

  // Convert the MongoDB document to a plain object
  return {
    ...data,
    _id: data._id.toString(),
  };
};

// Function to fetch data by episode
const fetchDataByEpisode = async (database: string, collection: string, episode: string) => {
  const client = await clientPromise;
  const db = client.db(database);
  const data = await db.collection(collection).findOne({ episode: episode });
  if (!data) return null;

  // Convert the MongoDB document to a plain object
  return {
    ...data,
    _id: data._id.toString(),
  };
};

// Function to fetch anime information from the anime_info database
const fetchAnimeInfo = async (): Promise<any[]> => {
  const client = await clientPromise;
  const db = client.db('anime_info');
  const animeInfo = await db.collection('anime').find({}).toArray();

  // Convert the MongoDB documents to plain objects
  return animeInfo.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));
};

export { fetchCollections, fetchData, fetchDataById, fetchDataByEpisode, fetchAnimeInfo };
