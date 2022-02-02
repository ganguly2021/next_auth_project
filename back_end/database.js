import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  // connect with database
  const client = await MongoClient.connect(process.env.db_url);

 return client;
}
