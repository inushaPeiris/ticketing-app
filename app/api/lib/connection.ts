import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const Client = new MongoClient(uri);

export default Client;
