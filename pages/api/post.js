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
      return res.status(400).json({
        success: false,
        error: "টাইটেল এবং ইউআরএল অবশ্যই দিতে হবে ভাই!",
      });
    }

    // ইউআরএল পাথ লোয়ারকেস করা
    postData.url = postData.url.toLowerCase().trim();

    // 🎯 ড্যাশবোর্ড থেকে আসা ক্যাটাগরি অনুযায়ী কালেকশনের নাম ডাইনামিক করা হলো
    // ড্যাশবোর্ডে এন্টারটেইমেন্টের ভ্যালু যদি 'entertainment' পাঠানো হয়, তবে কালেকশন হবে 'entertainment1', নাহলে ডিফল্ট 'news1'
    const collectionName =
      postData.category === "entertainment" ? "entertainment1" : "news1";

    // 🚀 ডাইনামিক কালেকশনে ফ্রেশ পোস্ট সেভ
    const result = await db.collection(collectionName).insertOne({
      ...postData,
      createdAt: new Date(), // পোস্টের তারিখ ও সময় ট্র্যাক করার জন্য
    });

    return res
      .status(201)
      .json({ success: true, message: "খবরটি লাইভ হয়েছে!", result });
  } catch (error) {
    console.error("API CRASH ERROR ->", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}
