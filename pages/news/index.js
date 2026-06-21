import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import Head from "head";

export default function NewsIndex({ allNews }) {
  if (!allNews || allNews.length === 0) {
    return (
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: "50px",
          fontFamily: "sans-serif",
        }}
      >
        কোনো খবর পাওয়া যায়নি!
      </h2>
    );
  }

  const metaTitle = "SPayTimes News - সর্বশেষ বিশ্ব সংবাদ";
  const metaDesc =
    "সারা পৃথিবীর রাজনীতি, প্রযুক্তি এবং ব্রেকিং নিউজ সবার আগে পড়ুন।";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
      </Head>

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
            const displayTitle = news.title || "শিরোনামহীন";
            const displayDescription = news.description || "";

            const pureText = displayDescription.replace(/<[^>]*>/g, "");
            const shortDescription =
              pureText.length > 160
                ? pureText.substring(0, 160) + "..."
                : pureText;
            const pureTitleForAlt = displayTitle.replace(/<[^>]*>/g, "");

            return (
              <div
                key={news._id}
                style={{
                  marginBottom: "30px",
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
              >
                <Link
                  href={`/news/${news.url}`}
                  style={{ textDecoration: "none" }}
                >
                  {news.image && news.image.trim() !== "" && (
                    <img
                      src={news.image}
                      alt={news.imageAlt || pureTitleForAlt}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "15px",
                      }}
                    />
                  )}
                </Link>

                <div>
                  <Link
                    href={`/news/${news.url}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: displayTitle }}
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    />
                  </Link>
                  <p
                    style={{
                      color: "#ccc",
                      fontSize: "15px",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("news");
    const allNews = await db
      .collection("news1")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return {
      props: { allNews: JSON.parse(JSON.stringify(allNews)) },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: { allNews: [] },
      revalidate: 10,
    };
  }
}
