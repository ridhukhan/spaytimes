import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db("news");

    const postData = req.body;
    // ইউআরএল পাথটিকে সবসময় ছোট হাতের অক্ষরে সেভ করার সেফটি লজিক
    if (postData.url) postData.url = postData.url.toLowerCase().trim();

    const result = await db.collection("news1").insertOne(postData);

    return res
      .status(201)
      .json({ success: true, message: "খবরটি লাইভ হয়েছে!", result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
