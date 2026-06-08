import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default function NewsIndex({ allNews }) {
  // 🎯 সেফটি চেক: যদি ডাটাবেজ থেকে কোনো কারণে অ্যারে না আসে
  if (!allNews || allNews.length === 0) {
    return (
      <h2 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
        কোনো খবর পাওয়া যায়নি!
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        color: "#fff",
        backgroundColor: "#111",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "30px 0", color: "#ff4d4d" }}>
        সর্বশেষ খবর
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {allNews.map((news) => {
          // 🎯 সেফটি: ডেসক্রিপশন খালি থাকলে ক্র্যাশ ঠেকানোর লজিক
          const descriptionText = news.description || "";
          const pureText = descriptionText.replace(/<[^>]*>/g, "");
          const shortDescription =
            pureText.length > 160
              ? pureText.substring(0, 160) + "..."
              : pureText;

          return (
            <div
              key={news._id}
              style={{
                display: "flex",
                gap: "20px",
                background: "#1a1a1a",
                padding: "15px",
                borderRadius: "8px",
                alignItems: "center",
              }}
            >
              {/* 🎯 ইমেজ ফিল্ড ফাঁকা স্ট্রিং ("") হলে যেন এরর না দেয় */}
              {news.image && news.image.trim() !== "" && (
                <img
                  src={news.image}
                  alt="news"
                  style={{
                    width: "220px",
                    height: "130px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: news.title || "শিরোনামহীন",
                  }}
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                />
                <p
                  style={{
                    color: "#ccc",
                    fontSize: "15px",
                    margin: "0 0 12px 0",
                  }}
                >
                  {shortDescription}
                </p>
                {news.url && (
                  <Link
                    href={`/news/${news.url}`}
                    style={{
                      color: "#ff4d4d",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    আরও পড়ুন ➔
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("news");

    // 🎯 আপনার দেওয়া কালেকশন নেম 'news1' নিশ্চিত করা হলো
    const allNews = await db
      .collection("news1")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return {
      props: {
        allNews: JSON.parse(JSON.stringify(allNews)),
      },
      revalidate: 10,
    };
  } catch (error) {
    // 🎯 যদি ডাটাবেজ কানেকশনে কোনো ঝামেলা হয়, তবে ফাঁকা অ্যারে পাস করবে যাতে সাইট ক্র্যাশ না করে
    return {
      props: { allNews: [] },
      revalidate: 10,
    };
  }
}
