import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("news");
    const postData = req.body;

    if (!postData || !postData.title || !postData.url) {
      return res
        .status(400)
        .json({
          success: false,
          error: "টাইটেল এবং ইউআরএল অবশ্যই দিতে হবে ভাই!",
        });
    }

    // ইউআরএল পাথ লোয়ারকেস করা
    postData.url = postData.url.toLowerCase().trim();

    // ডাটাবেজে ফ্রেশ বাংলা পোস্ট সেভ
    const result = await db.collection("news1").insertOne(postData);

    return res
      .status(201)
      .json({ success: true, message: "খবরটি লাইভ হয়েছে!", result });
  } catch (error) {
    console.error("API CRASH ERROR ->", error);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || "Internal Server Error",
      });
  }
}
