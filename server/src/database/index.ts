import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Database } from "../lib/types";

dotenv.config();

const user = "user_001";
const urlPassword = process.env.MONGO_PASS;
const cluster = `cluster0.ghulu`;

const url = `mongodb+srv://${user}:${urlPassword}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
