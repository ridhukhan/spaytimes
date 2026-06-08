import { MongoClient } from "mongodb";

// ১. আপনার সেই আসল এবং মেইন ইউআরএল (যা প্রথমে ছিল)
const uri =
  "mongodb://ridhukhan:<db_password>@ac-tem4mqm-shard-00-00.xn8jjrt.mongodb.net:27017,ac-tem4mqm-shard-00-01.xn8jjrt.mongodb.net:27017,ac-tem4mqm-shard-00-02.xn8jjrt.mongodb.net:27017/news";

// ২. এখানে আমরা মঙ্গো ড্রাইভারকে গুগলের পাবলিক ডিএনএস (8.8.8.8) ব্যবহার করতে বাধ্য করছি
const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
  family: 4, // IPv4 force করো
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
