import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export default function NewsIndex({ allNews }) {
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
          // HTML ট্যাগ রিমুভ করে পিওর টেক্সট থেকে ১৬০ অক্ষর কাটার লজিক
          const pureText = news.description.replace(/<[^>]*>/g, "");
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
              {news.image && (
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
                  dangerouslySetInnerHTML={{ __html: news.title }}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db("news");
  const allNews = await db
    .collection("posts")
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return {
    props: {
      allNews: JSON.parse(JSON.stringify(allNews)),
    },
    revalidate: 10, // 🎯 প্রতি ১০ সেকেন্ড পর পর পেজটি ব্যাকগ্রাউন্ডে অটো আপডেট হবে
  };
}
