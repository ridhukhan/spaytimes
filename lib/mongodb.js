import { MongoClient } from "mongodb";

const uri =
  "mongodb://ridhukhan:011riyad@ac-tem4mqm-shard-00-00.xn8jjrt.mongodb.net:27017,ac-tem4mqm-shard-00-01.xn8jjrt.mongodb.net:27017,ac-tem4mqm-shard-00-02.xn8jjrt.mongodb.net:27017/news?ssl=true&authSource=admin";

const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
  family: 4,
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
