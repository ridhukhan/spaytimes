import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("news");
    const admin = await db.collection("admin").findOne({ email });

    if (!admin) {
      return res.status(400).json({
        success: false, // 🎯 স্ট্রিং "false" কেটে পিওর বুুলিয়ান false করা হলো
        message: "admin not found",
      });
    }

    // 🎯 এখানে বানান 'isMatch' ঠিক করা হলো
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "পাসওয়ার্ড ভুল হয়েছে!",
      });
    }

    return res.status(200).json({
      success: true, // 🎯 পিওর বুুলিয়ান true করা হলো
      message: "login successfully",
    });
  } catch (error) {
    console.error("🔥 DATABASE OR CODE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "login server failed",
      error: error.message,
    });
  }
}
