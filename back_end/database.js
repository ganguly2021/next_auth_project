import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const username = process.env.mongodb_username;
  const password = process.env.mongodb_password;
  const clustername = process.env.mongodb_clustername;
  const database = process.env.mongodb_database;

  // connect with database
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@${clustername}.cjnr0.mongodb.net/${database}?retryWrites=true&w=majority`
  );

  return client;
}
